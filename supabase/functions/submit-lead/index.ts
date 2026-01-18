import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  message?: string;
  source: 'quote_form' | 'exit_popup';
  tags?: string[];
}

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

    // Prepare tags based on source and project type
    const tags: string[] = ['Stoneworks Website'];
    if (leadData.source === 'quote_form') {
      tags.push('Quote Request');
    } else if (leadData.source === 'exit_popup') {
      tags.push('Exit Popup Lead');
      tags.push('$200 Discount');
    }
    if (leadData.projectType) {
      tags.push(leadData.projectType);
    }
    if (leadData.tags) {
      tags.push(...leadData.tags);
    }

    // Parse name into first and last
    const nameParts = leadData.name?.trim().split(' ') || [''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Step 1: Create or update contact in GHL
    const contactPayload = {
      firstName,
      lastName,
      email: leadData.email,
      phone: leadData.phone || undefined,
      tags,
      source: 'Website',
      customFields: leadData.message ? [
        {
          key: 'project_notes',
          field_value: leadData.message
        }
      ] : undefined
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
      
      const opportunityPayload = {
        pipelineId: PIPELINE_ID,
        locationId: LOCATION_ID,
        name: `${firstName} ${lastName} - ${leadData.projectType || 'Quote Request'}`,
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
