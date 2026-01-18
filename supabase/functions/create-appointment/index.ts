import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AppointmentRequest {
  calendarId: string;
  selectedSlot: {
    startTime: string;
    endTime: string;
  };
  contact: {
    name: string;
    email: string;
    phone?: string;
  };
  notes?: string;
  timezone?: string;
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

    const appointmentData: AppointmentRequest = await req.json();
    console.log('Creating appointment:', { 
      ...appointmentData, 
      contact: { ...appointmentData.contact, email: '***' } 
    });

    const LOCATION_ID = '5sL2raf5msYtM8H3iNLb';
    const { calendarId, selectedSlot, contact, notes, timezone = 'America/Denver' } = appointmentData;

    // Parse contact name
    const nameParts = contact.name?.trim().split(' ') || [''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Step 1: Create or update contact in GHL
    console.log('Creating/updating contact...');
    const contactPayload = {
      firstName,
      lastName,
      email: contact.email,
      phone: contact.phone || undefined,
      tags: ['Stoneworks Website', 'Showroom Appointment'],
      source: 'Website Booking',
      locationId: LOCATION_ID,
    };

    const contactResponse = await fetch(
      `https://services.leadconnectorhq.com/contacts/upsert`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
        body: JSON.stringify(contactPayload),
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

    if (!contactId) {
      console.error('No contact ID returned from GHL');
      return new Response(
        JSON.stringify({ error: 'Failed to get contact ID' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 2: Create the appointment
    console.log('Creating appointment...');
    const appointmentPayload = {
      calendarId,
      locationId: LOCATION_ID,
      contactId,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      title: `Showroom Visit - ${firstName} ${lastName}`,
      appointmentStatus: 'confirmed',
      notes: notes || undefined,
      timezone,
    };

    const appointmentResponse = await fetch(
      `https://services.leadconnectorhq.com/calendars/events/appointments`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': '2021-04-15',
        },
        body: JSON.stringify(appointmentPayload),
      }
    );

    if (!appointmentResponse.ok) {
      const errorText = await appointmentResponse.text();
      console.error('GHL appointment creation failed:', appointmentResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to create appointment', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const appointmentResult = await appointmentResponse.json();
    console.log('Appointment created:', appointmentResult);

    // Format confirmation details
    const startDate = new Date(selectedSlot.startTime);
    const formattedDate = startDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timezone,
    });
    const formattedTime = startDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        appointment: {
          id: appointmentResult.id || appointmentResult.event?.id,
          date: formattedDate,
          time: formattedTime,
          timezone,
        },
        contact: {
          id: contactId,
          name: `${firstName} ${lastName}`.trim(),
          email: contact.email,
        },
        message: 'Your showroom appointment has been confirmed!',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error creating appointment:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
