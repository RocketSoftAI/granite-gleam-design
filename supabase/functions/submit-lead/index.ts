import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// =========================================
// INPUT VALIDATION SCHEMAS
// =========================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-\(\)\+]+$/;

const VALID_SOURCES = ['quote_form', 'exit_popup', 'stoneworks-website-contact'] as const;
const VALID_PROJECT_AREAS = ['kitchen_only', 'master_bathroom', 'guest_bathroom', 'multiple_bathrooms', 'kitchen_bathrooms', 'outdoor_kitchen', 'other'];
const VALID_PROPERTY_TYPES = ['primary_residence', 'second_home', 'rental_property', 'commercial_property', 'other_property'];
const VALID_TIMELINES = ['this_month', '1_3_months', '3_6_months', '6_plus_months', 'just_exploring'];
const VALID_DECISION_STAGES = ['just_starting_research', 'comparing_materials', 'getting_quotes', 'ready_to_schedule', 'emergency_replacement'];
const VALID_BUDGET_RANGES = ['under_3000', '3000_6000', '6000_10000', '10000_15000', '15000_plus', 'not_sure'];

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  projectAreas?: string;
  propertyType?: string;
  projectTimeline?: string;
  decisionStage?: string;
  budgetRange?: string;
  message?: string;
  source: 'quote_form' | 'exit_popup' | 'stoneworks-website-contact';
  tags?: string[];
  projectType?: string;
  smsConsent?: boolean;
  smsConsentDate?: string;
}

function sanitizeString(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return '';
  // Remove HTML tags, trim whitespace, limit length
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

function validateLeadData(data: unknown): ValidationResult {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid request body'] };
  }

  const lead = data as Record<string, unknown>;

  // Required fields
  if (!lead.name || typeof lead.name !== 'string' || lead.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }
  if (typeof lead.name === 'string' && lead.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (!lead.email || typeof lead.email !== 'string' || !EMAIL_REGEX.test(lead.email)) {
    errors.push('Valid email is required');
  }
  if (typeof lead.email === 'string' && lead.email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }

  if (!lead.source || !VALID_SOURCES.includes(lead.source as typeof VALID_SOURCES[number])) {
    errors.push('Valid source is required');
  }

  // Optional fields validation
  if (lead.phone && typeof lead.phone === 'string') {
    if (!PHONE_REGEX.test(lead.phone)) {
      errors.push('Phone must contain only digits, spaces, hyphens, and parentheses');
    }
    if (lead.phone.length > 20) {
      errors.push('Phone must be less than 20 characters');
    }
  }

  if (lead.message && typeof lead.message === 'string' && lead.message.length > 1000) {
    errors.push('Message must be less than 1000 characters');
  }

  // Enum validations
  if (lead.projectAreas && !VALID_PROJECT_AREAS.includes(lead.projectAreas as string)) {
    errors.push('Invalid project area value');
  }
  if (lead.propertyType && !VALID_PROPERTY_TYPES.includes(lead.propertyType as string)) {
    errors.push('Invalid property type value');
  }
  if (lead.projectTimeline && !VALID_TIMELINES.includes(lead.projectTimeline as string)) {
    errors.push('Invalid project timeline value');
  }
  if (lead.decisionStage && !VALID_DECISION_STAGES.includes(lead.decisionStage as string)) {
    errors.push('Invalid decision stage value');
  }
  if (lead.budgetRange && !VALID_BUDGET_RANGES.includes(lead.budgetRange as string)) {
    errors.push('Invalid budget range value');
  }

  return { valid: errors.length === 0, errors };
}

// Map form values to GHL-friendly display labels
const PROJECT_AREAS_MAP: Record<string, string> = {
  'kitchen_only': 'Kitchen only',
  'master_bathroom': 'Master bathroom',
  'guest_bathroom': 'Guest bathroom',
  'multiple_bathrooms': 'Multiple bathrooms',
  'kitchen_bathrooms': 'Kitchen + bathrooms',
  'outdoor_kitchen': 'Outdoor kitchen',
  'other': 'Other',
};

const PROPERTY_TYPE_MAP: Record<string, string> = {
  'primary_residence': 'Primary residence',
  'second_home': 'Second home',
  'rental_property': 'Rental property',
  'commercial_property': 'Commercial property',
  'other_property': 'Other property',
};

const PROJECT_TIMELINE_MAP: Record<string, string> = {
  'this_month': 'This month',
  '1_3_months': '1-3 months',
  '3_6_months': '3-6 months',
  '6_plus_months': '6+ months',
  'just_exploring': 'Just exploring',
};

const DECISION_STAGE_MAP: Record<string, string> = {
  'just_starting_research': 'Just starting research',
  'comparing_materials': 'Comparing materials',
  'getting_quotes': 'Getting quotes',
  'ready_to_schedule': 'Ready to schedule',
  'emergency_replacement': 'Emergency replacement',
};

const BUDGET_RANGE_MAP: Record<string, string> = {
  'under_3000': 'Under $3,000',
  '3000_6000': '$3,000 - $6,000',
  '6000_10000': '$6,000 - $10,000',
  '10000_15000': '$10,000 - $15,000',
  '15000_plus': '$15,000+',
  'not_sure': 'Not sure yet',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GHL_API_KEY = Deno.env.get('GHL_API_KEY');
    if (!GHL_API_KEY) {
      console.error('GHL_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate request body
    let rawData: unknown;
    try {
      rawData = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validation = validateLeadData(rawData);
    if (!validation.valid) {
      console.warn('Validation failed:', validation.errors);
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: validation.errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize and type the validated data
    const rawLead = rawData as Record<string, unknown>;
    const leadData: LeadData = {
      name: sanitizeString(rawLead.name, 100),
      email: sanitizeString(rawLead.email, 255).toLowerCase(),
      phone: rawLead.phone ? sanitizeString(rawLead.phone, 20) : undefined,
      projectAreas: rawLead.projectAreas as string | undefined,
      propertyType: rawLead.propertyType as string | undefined,
      projectTimeline: rawLead.projectTimeline as string | undefined,
      decisionStage: rawLead.decisionStage as string | undefined,
      budgetRange: rawLead.budgetRange as string | undefined,
      message: rawLead.message ? sanitizeString(rawLead.message, 1000) : undefined,
      source: rawLead.source as LeadData['source'],
      tags: Array.isArray(rawLead.tags) ? rawLead.tags.filter((t): t is string => typeof t === 'string').map(t => sanitizeString(t, 50)) : undefined,
      projectType: rawLead.projectType ? sanitizeString(rawLead.projectType, 100) : undefined,
      smsConsent: Boolean(rawLead.smsConsent),
      smsConsentDate: rawLead.smsConsentDate ? sanitizeString(rawLead.smsConsentDate, 50) : undefined,
    };

    console.log('Processing validated lead:', { source: leadData.source });

    // GHL Location and Pipeline IDs
    const LOCATION_ID = '5sL2raf5msYtM8H3iNLb';
    const PIPELINE_ID = 'X2Uvernsc6HxJ9uGEaSD';

    // Prepare tags based on source
    const tags: string[] = ['Stoneworks Website'];
    if (leadData.source === 'quote_form') {
      tags.push('Quote Request');
    } else if (leadData.source === 'exit_popup') {
      tags.push('Exit Popup Lead');
      tags.push('$200 Discount');
    } else if (leadData.source === 'stoneworks-website-contact') {
      tags.push('Contact Form');
    }
    if (leadData.tags) {
      tags.push(...leadData.tags);
    }

    // Parse name into first and last
    const nameParts = leadData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Build custom fields array for GHL
    const customFields: Array<{ key: string; field_value: string }> = [];

    // Add GHL Prospect Qualifications custom fields
    if (leadData.projectTimeline) {
      customFields.push({
        key: 'project_timeline',
        field_value: PROJECT_TIMELINE_MAP[leadData.projectTimeline] || leadData.projectTimeline
      });
    }
    if (leadData.decisionStage) {
      customFields.push({
        key: 'decision_stage',
        field_value: DECISION_STAGE_MAP[leadData.decisionStage] || leadData.decisionStage
      });
    }
    if (leadData.projectAreas) {
      customFields.push({
        key: 'project_areas',
        field_value: PROJECT_AREAS_MAP[leadData.projectAreas] || leadData.projectAreas
      });
    }
    if (leadData.propertyType) {
      customFields.push({
        key: 'property_type',
        field_value: PROPERTY_TYPE_MAP[leadData.propertyType] || leadData.propertyType
      });
    }
    if (leadData.budgetRange) {
      customFields.push({
        key: 'budget_range',
        field_value: BUDGET_RANGE_MAP[leadData.budgetRange] || leadData.budgetRange
      });
    }
    // Add project notes from message field
    if (leadData.message) {
      customFields.push({
        key: 'project_notes',
        field_value: leadData.message
      });
    }
    
    // Add A2P SMS Consent fields
    if (leadData.smsConsent) {
      customFields.push({
        key: 'a2p_checkbox',
        field_value: 'true'
      });
      
      if (leadData.smsConsentDate) {
        customFields.push({
          key: 'a2p_sms_optin_date',
          field_value: leadData.smsConsentDate
        });
      }
    }

    // Step 1: Create or update contact in GHL
    const contactPayload = {
      firstName,
      lastName,
      email: leadData.email,
      phone: leadData.phone || undefined,
      tags,
      source: 'Website',
      customFields: customFields.length > 0 ? customFields : undefined
    };

    console.log('Creating contact in GHL...');
    const contactResponse = await fetch(
      `https://services.leadconnectorhq.com/contacts/upsert`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
        body: JSON.stringify({
          ...contactPayload,
          locationId: LOCATION_ID,
        }),
      }
    );

    if (!contactResponse.ok) {
      const errorText = await contactResponse.text();
      console.error('External API error:', contactResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Unable to process your request. Please try again later.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const contactResult = await contactResponse.json();
    const contactId = contactResult.contact?.id;
    console.log('Contact processed successfully');

    // Step 2: Create opportunity in pipeline (for quote requests)
    if (leadData.source === 'quote_form' && contactId) {
      console.log('Creating opportunity in pipeline...');
      
      const projectAreaLabel = leadData.projectAreas 
        ? PROJECT_AREAS_MAP[leadData.projectAreas] || leadData.projectAreas
        : 'Quote Request';
      
      const opportunityPayload = {
        pipelineId: PIPELINE_ID,
        locationId: LOCATION_ID,
        name: `${firstName} ${lastName} - ${projectAreaLabel}`,
        status: 'open',
        contactId,
        monetaryValue: 0,
        pipelineStageId: undefined,
      };

      const oppResponse = await fetch(
        `https://services.leadconnectorhq.com/opportunities/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28',
          },
          body: JSON.stringify(opportunityPayload),
        }
      );

      if (!oppResponse.ok) {
        const errorText = await oppResponse.text();
        console.error('Opportunity creation error:', oppResponse.status, errorText);
        // Don't fail the whole request - contact was still created
      } else {
        console.log('Opportunity created successfully');
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your information has been submitted successfully' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
