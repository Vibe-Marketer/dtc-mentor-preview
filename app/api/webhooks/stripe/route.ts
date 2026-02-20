import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_email;
  const plan = session.metadata?.plan;
  
  console.log(`New subscription: ${customerEmail} - ${plan}`);
  
  // TODO: Store in database
  // For now, we'll use localStorage on the client side
  // In production, you'd want:
  // 1. Create user in database
  // 2. Store subscription status
  // 3. Send welcome email via Beehiiv/Loops
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const plan = subscription.metadata?.plan;
  
  console.log(`Subscription updated: ${customerId} - ${status} - ${plan}`);
  
  // TODO: Update user subscription status in database
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  console.log(`Subscription canceled: ${customerId}`);
  
  // TODO: Update user to free tier in database
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerEmail = invoice.customer_email;
  
  console.log(`Payment failed: ${customerEmail}`);
  
  // TODO: Send dunning email, update subscription status
}
