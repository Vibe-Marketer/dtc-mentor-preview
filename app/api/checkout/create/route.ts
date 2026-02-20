import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const PRICES = {
  monthly: process.env.STRIPE_MONTHLY_PRICE_ID,
  annual: process.env.STRIPE_ANNUAL_PRICE_ID,
};

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json();

    if (!plan || !PRICES[plan as keyof typeof PRICES]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const priceId = PRICES[plan as keyof typeof PRICES];
    
    if (!priceId) {
      return NextResponse.json({ error: 'Price not configured' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        plan,
      },
      subscription_data: {
        metadata: {
          plan,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Checkout failed' },
      { status: 500 }
    );
  }
}
