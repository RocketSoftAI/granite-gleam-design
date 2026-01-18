import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  // GHL Custom Fields
  projectAreas?: string;
  propertyType?: string;
  projectTimeline?: string;
  decisionStage?: string;
  budgetRange?: string;
  message?: string;
  source: 'quote_form' | 'exit_popup' | 'stoneworks-website-contact';
  tags?: string[];
  // Legacy field for exit popup
  projectType?: string;
  // A2P SMS Consent fields
  smsConsent?: boolean;
  smsConsentDate?: string;
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
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const leadData: LeadData = await req.json();
    console.log('Received lead data:', { ...leadData, email: '***' });

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
    const nameParts = leadData.name?.trim().split(' ') || [''];
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
      // a2p_checkbox - set to true/checked
      customFields.push({
        key: 'a2p_checkbox',
        field_value: 'true'
      });
      
      // a2p_sms_optin_date - set to the consent date
      if (leadData.smsConsentDate) {
        customFields.push({
          key: 'a2p_sms_optin_date',
          field_value: leadData.smsConsentDate
        });
      }
    }

    console.log('Custom fields to send:', customFields);

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
      console.error('GHL contact creation failed:', contactResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to create contact', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const contactResult = await contactResponse.json();
    const contactId = contactResult.contact?.id;
    console.log('Contact created/updated:', contactId);

    // Step 2: Create opportunity in pipeline (for quote requests)
    if (leadData.source === 'quote_form' && contactId) {
      console.log('Creating opportunity in pipeline...');
      
      // Build opportunity name with project area
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
        pipelineStageId: undefined, // Will use first stage
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
        console.error('GHL opportunity creation failed:', oppResponse.status, errorText);
        // Don't fail the whole request - contact was still created
      } else {
        const oppResult = await oppResponse.json();
        console.log('Opportunity created:', oppResult.opportunity?.id);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        contactId,
        message: 'Lead submitted successfully' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing lead:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
