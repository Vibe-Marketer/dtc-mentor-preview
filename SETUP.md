# DTC Mentor - Setup Guide

## What's Built

✅ Chat interface with Claude 3.5 Sonnet
✅ Knowledge base RAG for DTC expertise
✅ 5-question business profile onboarding
✅ Free tier (5 questions) with upgrade prompt
✅ Pricing page ($97/mo, $970/yr)
✅ Stripe checkout integration (API + webhooks)
✅ Email capture to Beehiiv
✅ Success page with paid user tracking
✅ Lead magnet playbook page

## To Go Live

### 1. Stripe Setup (Required)

1. Go to dashboard.stripe.com
2. Create two Products:
   - "DTC Mentor Monthly" → $97/month recurring
   - "DTC Mentor Annual" → $970/year recurring
3. Copy the Price IDs (price_xxx)
4. Create Webhook endpoint:
   - URL: `https://dtcmentor.ai/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_failed`
5. Copy webhook secret

### 2. Environment Variables (Vercel)

Add to Vercel project settings:

```
ANTHROPIC_API_KEY=<your key>
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_ANNUAL_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=https://dtcmentor.ai
BEEHIIV_API_KEY=<optional>
BEEHIIV_PUBLICATION_ID=<optional>
```

### 3. Domain Setup

1. Go to Vercel project → Settings → Domains
2. Add `dtcmentor.ai`
3. Update DNS at registrar:
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

### 4. Deploy

```bash
cd dtc-mentor
npm install
vercel --prod
```

## Revenue Flow

1. User lands on dtcmentor.ai
2. Takes onboarding quiz
3. Gets 5 free questions
4. Hits paywall → Goes to /pricing
5. Enters email + clicks plan
6. Email captured to Beehiiv
7. Redirected to Stripe checkout
8. Pays → Webhook fires → Success page
9. localStorage marks as paid
10. Unlimited access unlocked

## Files Changed

- `app/page.tsx` - Added isPaidUser state, updated limits
- `app/pricing/page.tsx` - Connected to checkout API + email capture
- `app/success/page.tsx` - NEW: Post-payment success page
- `app/api/subscribe/route.ts` - NEW: Beehiiv email capture
- `app/api/checkout/create/route.ts` - NEW: Stripe checkout session
- `app/api/webhooks/stripe/route.ts` - NEW: Stripe webhook handler

## Known Limitations

- Paid status stored in localStorage (resets if user clears browser)
- No user accounts yet (would need auth for proper tracking)
- Webhook doesn't persist to DB (add Supabase/Postgres for production)

## Quick Test

1. Set STRIPE_SECRET_KEY to test key (sk_test_...)
2. Use Stripe test card: 4242 4242 4242 4242
3. Any future expiry, any CVC
