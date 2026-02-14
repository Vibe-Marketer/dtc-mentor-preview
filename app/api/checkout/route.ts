import { NextRequest, NextResponse } from 'next/server';

// Stripe Checkout Session creation
// Los: Add your Stripe secret key to .env.local as STRIPE_SECRET_KEY

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  
  if (!stripeKey) {
    // Fallback: redirect to a payment link
    // Los can create this at https://dashboard.stripe.com/payment-links
    const paymentLink = process.env.STRIPE_PAYMENT_LINK || 'https://buy.stripe.com/test';
    return NextResponse.json({ url: paymentLink });
  }

  try {
    const { priceId, email } = await req.json();
    
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'subscription',
        'success_url': `${process.env.NEXT_PUBLIC_URL || 'https://dtcmentor.ai'}/welcome?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${process.env.NEXT_PUBLIC_URL || 'https://dtcmentor.ai'}/?canceled=true`,
        'line_items[0][price]': priceId || process.env.STRIPE_PRICE_ID || '',
        'line_items[0][quantity]': '1',
        ...(email && { 'customer_email': email }),
      }),
    });

    const session = await response.json();
    
    if (session.error) {
      return NextResponse.json({ error: session.error.message }, { status: 400 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
