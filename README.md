# DTC Mentor AI

AI-powered ecommerce mentor chatbot for direct-to-consumer brand owners. Powered by OpenAI with a comprehensive 70KB+ knowledge base of sourced DTC benchmarks and frameworks.

**Domain:** dtcmentor.ai

## Quick Start

1. Open `index.html` in a browser (or deploy to GitHub Pages / any CDN)
2. Click the ⚙️ settings icon in the chat header
3. Enter your OpenAI API key
4. Start chatting — the AI uses the full knowledge base as context

## Setup Options

### Option 1: Settings UI (Recommended)
Click the ⚙️ icon in the chat header and paste your OpenAI API key. It's stored in localStorage.

### Option 2: URL Parameter
```
https://your-domain.com/?apiKey=sk-your-key-here
```

### Option 3: JavaScript Config
Add before the script tag in `index.html`:
```html
<script>
  window.DTC_MENTOR_CONFIG = { apiKey: 'sk-your-key-here' };
</script>
```

### Option 4: Proxy Server (Production)
For production use, set up a proxy to avoid exposing API keys client-side. Update `DTC_CONFIG.apiEndpoint` in `script.js` to point to your proxy.

## Architecture

- **index.html** — Single page app with chat interface and landing page
- **styles.css** — Premium dark mode design system (Inter font, purple accent)
- **script.js** — OpenAI streaming chat engine with markdown rendering
- **knowledge-base.md** — 70KB+ knowledge base loaded as system prompt context

## Features

- **Real AI responses** — OpenAI GPT-4o/4o-mini with streaming output
- **70KB+ knowledge base** — Sourced benchmarks, frameworks, and tactical playbooks loaded as system context
- **Streaming responses** — Token-by-token rendering for a premium feel
- **Markdown rendering** — Headers, bold, lists, code blocks all rendered properly
- **Conversation memory** — Full conversation history maintained per session
- **Settings panel** — Configure API key and model without touching code
- **Email capture gate** — Initial + after 3 messages for anonymous users
- **Mobile-responsive** — Works on all devices
- **Session persistence** — Chat history preserved in sessionStorage

## Knowledge Base Topics

- Customer Acquisition (Meta, TikTok, Google, YouTube ads)
- Email Marketing (Klaviyo flows, segmentation, subject lines)
- SMS Marketing (flows, campaigns, list building)
- Retention & LTV (loyalty, referrals, win-back, subscriptions)
- Conversion Rate Optimization (product pages, checkout, A/B testing)
- Unit Economics (CAC, LTV, ROAS, contribution margin)
- Scaling Operations (hiring, 3PL, inventory, tech stack)
- Shopify Optimization (speed, themes, apps)
- Supply Chain & Sourcing (domestic vs overseas, packaging, financing)
- Influencer & Creator Strategy (whitelisting, UGC, ROI measurement)
- Subscription & Membership Models
- Brand Building (content, community, PR)

## Deployment

Static files — deploy to any CDN, GitHub Pages, Vercel, Netlify, or Cloudflare Pages. No build step required.

## Models

- **GPT-4o Mini** — Fast, affordable, great for most queries (~$0.001-0.003 per response)
- **GPT-4o** — Best quality, deeper reasoning (~$0.01-0.03 per response)
- **GPT-4.1 / 4.1 Mini** — Latest models with improved instruction following
