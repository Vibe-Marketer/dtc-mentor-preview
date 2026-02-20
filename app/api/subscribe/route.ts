import { NextRequest, NextResponse } from 'next/server';

// Beehiiv API integration for email capture
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

export async function POST(req: NextRequest) {
  try {
    const { email, source = 'dtc-mentor' } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // If Beehiiv is configured, add to list
    if (BEEHIIV_API_KEY && BEEHIIV_PUBLICATION_ID) {
      const response = await fetch(
        `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          },
          body: JSON.stringify({
            email,
            reactivate_existing: true,
            send_welcome_email: true,
            utm_source: source,
            utm_medium: 'app',
            utm_campaign: 'dtc-mentor-signup',
            custom_fields: [
              { name: 'source', value: source }
            ]
          }),
        }
      );

      if (!response.ok) {
        console.error('Beehiiv error:', await response.text());
        // Don't fail the request, just log it
      }
    }

    // Store locally as backup (or primary if no Beehiiv)
    // In production, you'd want a database here
    console.log(`New subscriber: ${email} from ${source}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Subscribed successfully' 
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
