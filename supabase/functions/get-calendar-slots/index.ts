import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SlotRequest {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  timezone?: string;
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
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { startDate, endDate, timezone = 'America/Denver' }: SlotRequest = await req.json();
    console.log('Fetching slots for:', { startDate, endDate, timezone });

    // GHL Calendar ID - this is the actual calendar, not the widget
    // We need to fetch calendars first to get the right one
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
      const errorText = await calendarsResponse.text();
      console.error('Failed to fetch calendars:', calendarsResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch calendars', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const calendarsData = await calendarsResponse.json();
    console.log('Available calendars:', JSON.stringify(calendarsData));

    // Find the first active calendar or use the first one available
    const calendars = calendarsData.calendars || [];
    if (calendars.length === 0) {
      console.error('No calendars found for location');
      return new Response(
        JSON.stringify({ error: 'No calendars configured' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const calendarId = calendars[0].id;
    console.log('Using calendar:', calendarId, calendars[0].name);

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
      const errorText = await slotsResponse.text();
      console.error('Failed to fetch slots:', slotsResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch available slots', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const slotsData = await slotsResponse.json();
    console.log('Raw slots data:', JSON.stringify(slotsData));

    // Transform the slots into a more usable format
    // GHL returns slots grouped by date like { "2024-01-15": { slots: [...] } }
    const formattedSlots: DaySlots[] = [];
    
    // Handle the GHL response format
    const rawSlots = slotsData || {};
    
    for (const [date, dayData] of Object.entries(rawSlots)) {
      // Skip non-date keys
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
      
      const daySlots = (dayData as any)?.slots || [];
      const slots: TimeSlot[] = daySlots.map((slot: any, index: number) => {
        const startDateTime = new Date(slot.startTime || slot);
        const endDateTime = slot.endTime ? new Date(slot.endTime) : new Date(startDateTime.getTime() + 60 * 60 * 1000);
        
        return {
          id: `${date}-${index}`,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          displayTime: startDateTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: timezone,
          }),
        };
      });

      if (slots.length > 0) {
        formattedSlots.push({ date, slots });
      }
    }

    // Sort by date
    formattedSlots.sort((a, b) => a.date.localeCompare(b.date));

    console.log('Formatted slots:', formattedSlots.length, 'days with availability');

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
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
