import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// =========================================
// INPUT VALIDATION
// =========================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-\(\)\+]+$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
const TIMEZONE_REGEX = /^[A-Za-z_\/]+$/;

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

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

function sanitizeString(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

function validateAppointmentRequest(data: unknown): ValidationResult {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid request body'] };
  }

  const req = data as Record<string, unknown>;

  // Validate calendarId
  if (!req.calendarId || typeof req.calendarId !== 'string' || req.calendarId.length > 50) {
    errors.push('Valid calendar ID is required');
  }

  // Validate selectedSlot
  if (!req.selectedSlot || typeof req.selectedSlot !== 'object') {
    errors.push('Selected time slot is required');
  } else {
    const slot = req.selectedSlot as Record<string, unknown>;
    if (!slot.startTime || typeof slot.startTime !== 'string' || !ISO_DATE_REGEX.test(slot.startTime)) {
      errors.push('Valid start time is required');
    }
    if (!slot.endTime || typeof slot.endTime !== 'string' || !ISO_DATE_REGEX.test(slot.endTime)) {
      errors.push('Valid end time is required');
    }
  }

  // Validate contact
  if (!req.contact || typeof req.contact !== 'object') {
    errors.push('Contact information is required');
  } else {
    const contact = req.contact as Record<string, unknown>;
    
    if (!contact.name || typeof contact.name !== 'string' || contact.name.trim().length < 2) {
      errors.push('Name is required and must be at least 2 characters');
    }
    if (typeof contact.name === 'string' && contact.name.length > 100) {
      errors.push('Name must be less than 100 characters');
    }

    if (!contact.email || typeof contact.email !== 'string' || !EMAIL_REGEX.test(contact.email)) {
      errors.push('Valid email is required');
    }
    if (typeof contact.email === 'string' && contact.email.length > 255) {
      errors.push('Email must be less than 255 characters');
    }

    if (contact.phone !== undefined && contact.phone !== null && contact.phone !== '') {
      if (typeof contact.phone !== 'string' || !PHONE_REGEX.test(contact.phone)) {
        errors.push('Phone must contain only digits, spaces, hyphens, and parentheses');
      }
      if (typeof contact.phone === 'string' && contact.phone.length > 20) {
        errors.push('Phone must be less than 20 characters');
      }
    }
  }

  // Validate notes (optional)
  if (req.notes !== undefined && typeof req.notes === 'string' && req.notes.length > 500) {
    errors.push('Notes must be less than 500 characters');
  }

  // Validate timezone (optional)
  if (req.timezone !== undefined) {
    if (typeof req.timezone !== 'string' || req.timezone.length > 50 || !TIMEZONE_REGEX.test(req.timezone)) {
      errors.push('Invalid timezone format');
    }
  }

  return { valid: errors.length === 0, errors };
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

    const validation = validateAppointmentRequest(rawData);
    if (!validation.valid) {
      console.warn('Validation failed:', validation.errors);
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: validation.errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize and type the validated data
    const rawReq = rawData as Record<string, unknown>;
    const rawSlot = rawReq.selectedSlot as Record<string, unknown>;
    const rawContact = rawReq.contact as Record<string, unknown>;

    const appointmentData: AppointmentRequest = {
      calendarId: sanitizeString(rawReq.calendarId, 50),
      selectedSlot: {
        startTime: String(rawSlot.startTime),
        endTime: String(rawSlot.endTime),
      },
      contact: {
        name: sanitizeString(rawContact.name, 100),
        email: sanitizeString(rawContact.email, 255).toLowerCase(),
        phone: rawContact.phone ? sanitizeString(rawContact.phone, 20) : undefined,
      },
      notes: rawReq.notes ? sanitizeString(rawReq.notes, 500) : undefined,
      timezone: rawReq.timezone ? sanitizeString(rawReq.timezone, 50) : 'America/Denver',
    };

    console.log('Creating appointment for:', appointmentData.contact.email ? '***' : 'unknown');

    const LOCATION_ID = '5sL2raf5msYtM8H3iNLb';
    const { calendarId, selectedSlot, contact, notes, timezone } = appointmentData;

    // Parse contact name
    const nameParts = contact.name.trim().split(' ');
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
      console.error('Contact creation failed:', contactResponse.status);
      return new Response(
        JSON.stringify({ error: 'Unable to process your booking. Please try again later.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const contactResult = await contactResponse.json();
    const contactId = contactResult.contact?.id;
    console.log('Contact processed successfully');

    if (!contactId) {
      console.error('No contact ID returned');
      return new Response(
        JSON.stringify({ error: 'Unable to complete your booking. Please try again later.' }),
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
      console.error('Appointment creation failed:', appointmentResponse.status);
      return new Response(
        JSON.stringify({ error: 'Unable to book your appointment. Please try again or call us directly.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const appointmentResult = await appointmentResponse.json();
    console.log('Appointment created successfully');

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
          name: `${firstName} ${lastName}`.trim(),
        },
        message: 'Your showroom appointment has been confirmed!',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error creating appointment:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
