import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// =========================================
// INPUT VALIDATION
// =========================================

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIMEZONE_REGEX = /^[A-Za-z_\/]+$/;

interface ValidationResult {
  valid: boolean;
  error?: string;
}

interface SlotRequest {
  startDate: string;
  endDate: string;
  timezone?: string;
}

function validateSlotRequest(data: unknown): ValidationResult {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const req = data as Record<string, unknown>;

  // Validate startDate
  if (!req.startDate || typeof req.startDate !== 'string') {
    return { valid: false, error: 'Start date is required' };
  }
  if (!DATE_REGEX.test(req.startDate)) {
    return { valid: false, error: 'Start date must be in YYYY-MM-DD format' };
  }

  // Validate endDate
  if (!req.endDate || typeof req.endDate !== 'string') {
    return { valid: false, error: 'End date is required' };
  }
  if (!DATE_REGEX.test(req.endDate)) {
    return { valid: false, error: 'End date must be in YYYY-MM-DD format' };
  }

  // Validate date range
  const start = new Date(req.startDate);
  const end = new Date(req.endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { valid: false, error: 'Invalid date values' };
  }
  if (end < start) {
    return { valid: false, error: 'End date must be after start date' };
  }
  
  // Limit date range to 60 days to prevent abuse
  const daysDiff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  if (daysDiff > 60) {
    return { valid: false, error: 'Date range cannot exceed 60 days' };
  }

  // Validate timezone (optional)
  if (req.timezone !== undefined) {
    if (typeof req.timezone !== 'string') {
      return { valid: false, error: 'Timezone must be a string' };
    }
    if (req.timezone.length > 50 || !TIMEZONE_REGEX.test(req.timezone)) {
      return { valid: false, error: 'Invalid timezone format' };
    }
  }

  return { valid: true };
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  displayTime: string;
}

interface DaySlots {
  date: string;
  slots: TimeSlot[];
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

    const validation = validateSlotRequest(rawData);
    if (!validation.valid) {
      console.warn('Validation failed:', validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { startDate, endDate, timezone = 'America/Denver' } = rawData as SlotRequest;
    console.log('Fetching slots for:', { startDate, endDate, timezone });

    const LOCATION_ID = '5sL2raf5msYtM8H3iNLb';

    // First, get all calendars to find the booking calendar
    console.log('Fetching calendars for location...');
    const calendarsResponse = await fetch(
      `https://services.leadconnectorhq.com/calendars/?locationId=${LOCATION_ID}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Version': '2021-04-15',
          'Accept': 'application/json',
        },
      }
    );

    if (!calendarsResponse.ok) {
      console.error('Failed to fetch calendars:', calendarsResponse.status);
      return new Response(
        JSON.stringify({ error: 'Unable to retrieve calendar. Please try again later.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const calendarsData = await calendarsResponse.json();

    // Find the first active calendar
    const calendars = calendarsData.calendars || [];
    if (calendars.length === 0) {
      console.error('No calendars found for location');
      return new Response(
        JSON.stringify({ error: 'No booking calendar is currently available.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const calendarId = calendars[0].id;
    console.log('Using calendar:', calendarId);

    // Convert dates to timestamps for the API
    const startTimestamp = new Date(`${startDate}T00:00:00`).getTime();
    const endTimestamp = new Date(`${endDate}T23:59:59`).getTime();

    // Fetch available slots from GHL
    console.log('Fetching free slots...');
    const slotsUrl = `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots?startDate=${startTimestamp}&endDate=${endTimestamp}&timezone=${encodeURIComponent(timezone)}`;
    
    const slotsResponse = await fetch(slotsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-04-15',
        'Accept': 'application/json',
      },
    });

    if (!slotsResponse.ok) {
      console.error('Failed to fetch slots:', slotsResponse.status);
      return new Response(
        JSON.stringify({ error: 'Unable to retrieve available times. Please try again later.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const slotsData = await slotsResponse.json();

    // Transform the slots into a more usable format
    const formattedSlots: DaySlots[] = [];
    const rawSlots = slotsData || {};
    
    const dateKeys = Object.keys(rawSlots).filter(key => /^\d{4}-\d{2}-\d{2}$/.test(key));
    console.log('Date keys found:', dateKeys.length);
    
    for (const [date, dayData] of Object.entries(rawSlots)) {
      // Skip non-date keys
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
      
      const daySlots = (dayData as Record<string, unknown>)?.slots;
      if (!Array.isArray(daySlots)) continue;
      
      const slots: TimeSlot[] = daySlots.map((slot: unknown, index: number) => {
        if (typeof slot !== 'string') return null;
        
        // Parse the time from the ISO string
        const timePart = slot.split('T')[1];
        if (!timePart) return null;
        
        const [hourStr, minuteStr] = timePart.split(':');
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        
        if (isNaN(hour) || isNaN(minute)) return null;
        
        // Format display time
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        const displayMinutes = minute.toString().padStart(2, '0');
        const displayTime = `${displayHour}:${displayMinutes} ${ampm}`;
        
        const startDateTime = new Date(slot);
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
        
        return {
          id: `${date}-${index}`,
          startTime: slot,
          endTime: endDateTime.toISOString(),
          displayTime,
        };
      }).filter((slot): slot is TimeSlot => slot !== null);

      if (slots.length > 0) {
        formattedSlots.push({ date, slots });
      }
    }

    // Sort by date
    formattedSlots.sort((a, b) => a.date.localeCompare(b.date));

    console.log('Returning', formattedSlots.length, 'days with availability');

    return new Response(
      JSON.stringify({ 
        success: true,
        calendarId,
        calendarName: calendars[0].name,
        timezone,
        availability: formattedSlots,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching calendar slots:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
