/* ============================================
   DTC Mentor AI — Chat Engine & Knowledge Base
   ============================================ */

// ── State ──
let messageCount = 0;
let emailCaptured = false;
let userEmail = '';
let isTyping = false;
let chatHistory = [];

// ── Knowledge Base ──
const knowledgeBase = {
    cac: {
        keywords: ['cac', 'customer acquisition cost', 'acquisition cost', 'cost per acquisition', 'cpa', 'cost to acquire'],
        response: `<p><strong>📉 Reducing Your Customer Acquisition Cost (CAC)</strong></p>
<p>Great question — CAC optimization is the #1 lever for DTC profitability. Here's a tactical breakdown:</p>
<p><strong>Quick Wins (This Week):</strong></p>
<ul>
<li><strong>Audit your ad creative</strong> — Top DTC brands refresh creatives every 7-10 days. Stale ads = rising CPMs. Aim for 3-5 active variations per ad set.</li>
<li><strong>Tighten your targeting</strong> — Broad audiences work at scale, but if you're under $10K/mo in spend, use lookalikes based on purchasers (not just add-to-carts).</li>
<li><strong>Fix your landing page</strong> — Average DTC conversion rate is 2.5-3.5%. If you're below that, your page is leaking money. Add social proof above the fold.</li>
</ul>
<p><strong>Benchmarks to Know:</strong></p>
<ul>
<li>Beauty/Skincare: $25-45 CAC (healthy)</li>
<li>Fashion/Apparel: $30-55 CAC</li>
<li>Food & Bev: $20-40 CAC</li>
<li>Supplements: $35-60 CAC</li>
</ul>
<p><strong>Advanced Moves:</strong></p>
<ul>
<li>Build a <strong>UGC pipeline</strong> — Brands using UGC see 30-50% lower CAC on Meta</li>
<li>Test <strong>Advantage+ campaigns</strong> — Meta's AI bidding often beats manual for spend over $5K/mo</li>
<li>Layer in <strong>organic + influencer</strong> to reduce paid dependency</li>
</ul>
<p>What's your current CAC and monthly ad spend? I can get more specific.</p>`
    },

    facebook: {
        keywords: ['facebook', 'fb ads', 'meta ads', 'facebook ads', 'instagram ads', 'meta'],
        response: `<p><strong>📱 Facebook/Meta Ads Strategy for DTC</strong></p>
<p>Meta is still the #1 paid channel for most DTC brands. Here's what's working right now:</p>
<p><strong>Campaign Structure (2024/2025):</strong></p>
<ul>
<li><strong>Advantage+ Shopping Campaigns (ASC)</strong> — Best for brands spending $5K+/mo. Let Meta's AI optimize.</li>
<li><strong>1 ASC + 1 Testing Campaign</strong> — The winning structure. ASC for scaling, testing for new creatives.</li>
<li><strong>Budget split:</strong> 70% to winners, 30% to testing</li>
</ul>
<p><strong>Creative That Converts:</strong></p>
<ul>
<li><strong>UGC testimonials</strong> — 2-3x better CTR than polished brand content</li>
<li><strong>Problem → Solution hooks</strong> — "I tried everything for [problem]..."</li>
<li><strong>Static images aren't dead</strong> — Carousel ads with lifestyle shots still crush for fashion/beauty</li>
<li><strong>Hook rate benchmark:</strong> Aim for 25%+ 3-second video view rate</li>
</ul>
<p><strong>Key Metrics to Track:</strong></p>
<ul>
<li>ROAS target: 3-4x for most DTC (higher for high-margin products)</li>
<li>CPM benchmark: $8-18 (varies by niche and season)</li>
<li>CTR: 1.5%+ is good, 2.5%+ is excellent</li>
<li>Frequency: Keep under 3.0 for prospecting</li>
</ul>
<p>What's your current setup? I can audit your structure.</p>`
    },

    email: {
        keywords: ['email', 'klaviyo', 'email sequence', 'email marketing', 'post-purchase', 'welcome series', 'abandoned cart', 'email flow', 'newsletter', 'post purchase'],
        response: `<p><strong>📧 DTC Email Strategy & Sequences</strong></p>
<p>Email should drive 25-40% of your total revenue. If it's less, you're leaving serious money on the table.</p>
<p><strong>The 5 Must-Have Flows:</strong></p>
<ul>
<li><strong>Welcome Series (5-7 emails)</strong> — Brand story → Social proof → Offer. Expected revenue: 3-5% of total.</li>
<li><strong>Abandoned Cart (3 emails)</strong> — Send at 1hr, 24hr, 48hr. Recovery rate target: 5-10%.</li>
<li><strong>Post-Purchase (4-5 emails)</strong> — Thank you → How to use → Review ask → Cross-sell → Replenishment</li>
<li><strong>Browse Abandonment (2 emails)</strong> — Often overlooked, drives 2-3% of email revenue</li>
<li><strong>Win-Back (3 emails)</strong> — Trigger at 60/90/120 days. Offer escalation strategy.</li>
</ul>
<p><strong>Post-Purchase Sequence (Your Money Maker):</strong></p>
<ul>
<li><strong>Email 1 (Day 0):</strong> Thank you + set expectations — open rate 65%+</li>
<li><strong>Email 2 (Day 3):</strong> Product tips / how-to-use guide</li>
<li><strong>Email 3 (Day 7):</strong> Ask for review (SMS + email combo)</li>
<li><strong>Email 4 (Day 14):</strong> Cross-sell complementary product</li>
<li><strong>Email 5 (Day 25-30):</strong> Replenishment reminder (if applicable)</li>
</ul>
<p><strong>Benchmarks:</strong></p>
<ul>
<li>Open rates: 40-60% for flows, 20-30% for campaigns</li>
<li>Click rates: 3-6% for flows</li>
<li>Revenue per recipient: $1.50-4.00 for flows</li>
</ul>
<p>Want me to build out any specific sequence in detail?</p>`
    },

    retention: {
        keywords: ['retention', 'repeat purchase', 'ltv', 'lifetime value', 'customer lifetime', 'churn', 'loyalty', 'repeat rate', 'subscriber'],
        response: `<p><strong>🔄 DTC Retention & LTV Maximization</strong></p>
<p>Retention is where DTC brands become profitable. Acquiring a customer costs 5-7x more than retaining one.</p>
<p><strong>Key Retention Metrics:</strong></p>
<ul>
<li><strong>60-day repeat purchase rate:</strong> 20-30% is good, 30%+ is excellent</li>
<li><strong>Average order frequency:</strong> 2.5-3.5x/year for most DTC</li>
<li><strong>LTV:CAC ratio:</strong> Aim for 3:1 minimum, 4:1+ for healthy growth</li>
</ul>
<p><strong>Tactical Retention Playbook:</strong></p>
<ul>
<li><strong>Subscription model</strong> — Even if your product isn't "subscription-native," offer subscribe & save. Brands see 15-25% subscription uptake.</li>
<li><strong>Post-purchase experience</strong> — Unboxing, handwritten notes, surprise gifts. Costs $2-3/order but increases repeat rate 20-40%.</li>
<li><strong>SMS + Email combo</strong> — SMS for urgency (flash sales, restock), email for education. SMS drives 15-20% of retention revenue.</li>
<li><strong>Loyalty program</strong> — Points-based programs increase AOV 12-18%. Use Smile.io or Yotpo.</li>
<li><strong>Community building</strong> — Private FB group or Discord for top customers. These customers spend 2-3x more.</li>
</ul>
<p><strong>The Retention Flywheel:</strong></p>
<ul>
<li>Great product → Review request → Social proof → Lower CAC → More budget for retention → Higher LTV</li>
</ul>
<p>What's your current repeat purchase rate? I can identify the biggest opportunity.</p>`
    },

    roas: {
        keywords: ['roas', 'return on ad spend', 'ad performance', 'ad roi', 'good roas', 'target roas'],
        response: `<p><strong>📊 ROAS Benchmarks & Optimization</strong></p>
<p>ROAS varies dramatically by vertical, price point, and business model. Here's the real data:</p>
<p><strong>ROAS Benchmarks by Vertical:</strong></p>
<ul>
<li><strong>Beauty/Skincare:</strong> 3.5-5x (high margins, high repeat)</li>
<li><strong>Fashion/Apparel:</strong> 2.5-4x (lower margins, seasonal)</li>
<li><strong>Food & Beverage:</strong> 2-3x (low AOV, high repeat)</li>
<li><strong>Supplements/Health:</strong> 3-5x (subscription potential)</li>
<li><strong>Home/Lifestyle:</strong> 2.5-3.5x (higher AOV, lower frequency)</li>
</ul>
<p><strong>Why "Good ROAS" Is the Wrong Question:</strong></p>
<ul>
<li>A 2x ROAS can be incredibly profitable if your margins are 80% and LTV is high</li>
<li>A 5x ROAS can be unprofitable if margins are thin and no repeat purchases</li>
<li><strong>The real metric:</strong> MER (Marketing Efficiency Ratio) = Total Revenue / Total Marketing Spend</li>
</ul>
<p><strong>How to Actually Think About It:</strong></p>
<ul>
<li>Calculate your <strong>break-even ROAS</strong>: 1 / profit margin. If margin is 70%, break-even = 1.43x</li>
<li>Factor in <strong>LTV</strong>: If customers buy 3x/year, you can afford lower first-purchase ROAS</li>
<li><strong>Blended ROAS</strong> across all channels matters more than per-campaign ROAS</li>
</ul>
<p>Tell me your product category and margins — I'll calculate your specific targets.</p>`
    },

    scaling: {
        keywords: ['scale', 'scaling', 'grow', 'growth', '10k', '50k', '100k', 'revenue', 'first million', 'million dollar'],
        response: `<p><strong>🚀 Scaling Your DTC Brand</strong></p>
<p>Scaling isn't just "spend more on ads." Here's the proven framework:</p>
<p><strong>Stage 1: $0-$10K/mo (Product-Market Fit)</strong></p>
<ul>
<li>Focus: Validate offer, find winning creative, identify best channel</li>
<li>Ad spend: $50-100/day on ONE channel (usually Meta)</li>
<li>Goal: Find a campaign that does 2.5x+ ROAS consistently for 2 weeks</li>
</ul>
<p><strong>Stage 2: $10K-$50K/mo (Channel Mastery)</strong></p>
<ul>
<li>Scale winning ads by 20% every 3-4 days (not overnight)</li>
<li>Build out email flows (should be driving 25%+ of revenue)</li>
<li>Test 5-10 new creatives per week</li>
<li>Hire a media buyer or agency at this stage</li>
</ul>
<p><strong>Stage 3: $50K-$200K/mo (Diversification)</strong></p>
<ul>
<li>Add second paid channel (Google, TikTok, or YouTube)</li>
<li>Launch subscription or bundle offers to boost LTV</li>
<li>Invest in organic content & influencer partnerships</li>
<li>Optimize operations: 3PL, inventory forecasting</li>
</ul>
<p><strong>Stage 4: $200K+/mo (Systems & Team)</strong></p>
<ul>
<li>Build the team: media buyer, email manager, creative strategist</li>
<li>Expand to retail or wholesale</li>
<li>International expansion</li>
<li>Focus on brand building, not just performance marketing</li>
</ul>
<p>What stage are you at? I'll give you the specific next 3 moves.</p>`
    },

    blackfriday: {
        keywords: ['black friday', 'bfcm', 'cyber monday', 'holiday', 'q4', 'prime day', 'sale', 'discount strategy'],
        response: `<p><strong>🛒 Black Friday / BFCM Campaign Playbook</strong></p>
<p>BFCM can drive 20-35% of annual revenue for DTC brands. Here's how to maximize it:</p>
<p><strong>Timeline:</strong></p>
<ul>
<li><strong>8 weeks out:</strong> Plan offers, build creative assets, grow your email list</li>
<li><strong>4 weeks out:</strong> Warm up audiences, tease the sale, launch VIP early access signup</li>
<li><strong>1 week out:</strong> Final email/SMS push, load ad campaigns (don't launch cold)</li>
<li><strong>BFCM week:</strong> Execute the sequence below</li>
</ul>
<p><strong>The Winning Offer Structure:</strong></p>
<ul>
<li><strong>VIP Early Access (Wednesday):</strong> Email/SMS list gets 24hr head start. Creates urgency + rewards loyalty.</li>
<li><strong>Black Friday (Friday):</strong> Best offer of the year. Be bold — 25-40% off or high-value bundle.</li>
<li><strong>Saturday-Sunday:</strong> "Still going" messaging + gift guide angle</li>
<li><strong>Cyber Monday:</strong> Different offer or bonus (free gift, exclusive bundle)</li>
<li><strong>Extended (Tuesday):</strong> "Final hours" — last chance messaging drives 15-20% of total BFCM revenue</li>
</ul>
<p><strong>Revenue Benchmarks:</strong></p>
<ul>
<li>Email should drive 40-60% of BFCM revenue</li>
<li>Plan for 2-3x normal daily revenue on peak days</li>
<li>SMS sends during BFCM see 25-35% CTR</li>
</ul>
<p><strong>Pro Tip:</strong> Don't discount your hero product if margins are tight. Instead, create an exclusive BFCM bundle that increases AOV while protecting brand value.</p>
<p>When is your BFCM? I'll build you a week-by-week action plan.</p>`
    },

    product: {
        keywords: ['product research', 'product', 'what to sell', 'niche', 'product idea', 'market research', 'validate', 'product market fit'],
        response: `<p><strong>🔍 DTC Product Research & Validation</strong></p>
<p>Finding the right product is 80% of the game. Here's the framework top DTC operators use:</p>
<p><strong>The Ideal DTC Product Checklist:</strong></p>
<ul>
<li>✅ <strong>65%+ gross margins</strong> (after COGS, shipping, packaging)</li>
<li>✅ <strong>$30-100 price point</strong> (sweet spot for impulse + perceived value)</li>
<li>✅ <strong>Consumable or replenishable</strong> (built-in repeat purchases)</li>
<li>✅ <strong>Lightweight & small</strong> (shipping costs kill margin on heavy items)</li>
<li>✅ <strong>Instagram/TikTok-friendly</strong> (visual, demonstrable, shareable)</li>
<li>✅ <strong>Passionate community exists</strong> (subreddits, FB groups, hashtags)</li>
</ul>
<p><strong>Validation Framework (Before You Invest):</strong></p>
<ul>
<li><strong>Step 1:</strong> Run a smoke test — landing page + $200 in ads. Goal: measure CPL and intent.</li>
<li><strong>Step 2:</strong> Pre-sell 50-100 units. If you can't sell to early adopters, you can't scale.</li>
<li><strong>Step 3:</strong> Check Amazon reviews for competitor products — 3-star reviews reveal what's missing.</li>
<li><strong>Step 4:</strong> Google Trends + Exploding Topics to validate demand trajectory.</li>
</ul>
<p><strong>Red Flags to Avoid:</strong></p>
<ul>
<li>🚩 Commodity products with no differentiation angle</li>
<li>🚩 Products that require extensive education to sell</li>
<li>🚩 Categories dominated by Amazon private label</li>
<li>🚩 Seasonal-only demand (unless you have off-season products)</li>
</ul>
<p>What category are you exploring? I can help validate the opportunity.</p>`
    },

    ads: {
        keywords: ['ads', 'advertising', 'paid media', 'google ads', 'tiktok ads', 'youtube ads', 'ad creative', 'creative strategy', 'media buying'],
        response: `<p><strong>🎯 Paid Media Strategy for DTC Brands</strong></p>
<p>Here's the multi-channel playbook that 8-figure DTC brands use:</p>
<p><strong>Channel Priority (Based on Revenue Stage):</strong></p>
<ul>
<li><strong>Under $50K/mo:</strong> Meta only. Master one channel before adding more.</li>
<li><strong>$50K-$200K/mo:</strong> Meta + Google (Search + Shopping). Google captures high-intent demand.</li>
<li><strong>$200K+/mo:</strong> Add TikTok or YouTube for top-of-funnel + brand awareness.</li>
</ul>
<p><strong>Budget Allocation Framework:</strong></p>
<ul>
<li>60-70% → Meta (primary growth engine)</li>
<li>20-25% → Google (capture intent)</li>
<li>10-15% → Testing (TikTok, influencer, etc.)</li>
</ul>
<p><strong>Creative Strategy That Scales:</strong></p>
<ul>
<li>Produce <strong>10-15 new creatives per month</strong> minimum</li>
<li><strong>3 types:</strong> UGC testimonials, founder story, product demos</li>
<li><strong>Hook testing:</strong> Same body, different first 3 seconds. Test 5 hooks per concept.</li>
<li><strong>Static vs Video:</strong> Test both. Static carousels often outperform video for fashion/beauty.</li>
</ul>
<p><strong>The Numbers That Matter:</strong></p>
<ul>
<li>CPC: $0.80-2.50 (Meta), $1-4 (Google Search)</li>
<li>CVR: 2.5-4% from paid traffic (landing page)</li>
<li>Thumb-stop rate: 25%+ for video ads</li>
</ul>
<p>What channels are you running now? I'll optimize your mix.</p>`
    },

    aov: {
        keywords: ['aov', 'average order value', 'order value', 'bundle', 'upsell', 'cross-sell', 'cross sell', 'up sell'],
        response: `<p><strong>💎 Increasing Average Order Value (AOV)</strong></p>
<p>Raising AOV is the fastest way to improve profitability without spending more on ads.</p>
<p><strong>Proven AOV Tactics (Ranked by Impact):</strong></p>
<ul>
<li><strong>Product Bundles</strong> — Create "starter kits" or "complete sets." Bundles typically increase AOV 25-40%. Price at 15-20% less than buying individually.</li>
<li><strong>Free Shipping Threshold</strong> — Set it 20-30% above your current AOV. "Free shipping over $75" when AOV is $55. Simple but effective — lifts AOV 10-15%.</li>
<li><strong>Post-Purchase Upsell</strong> — One-click upsell after checkout (use ReConvert or CartHook). Acceptance rate: 8-15%. Revenue lift: 5-10%.</li>
<li><strong>Volume Discounts</strong> — "Buy 2, Get 15% Off" or "Buy 3, Get 20% Off." Works incredibly well for consumables.</li>
<li><strong>Gift with Purchase</strong> — "Add $X to get a free [item]." Low-cost item with high perceived value.</li>
</ul>
<p><strong>AOV Benchmarks by Category:</strong></p>
<ul>
<li>Beauty: $55-85</li>
<li>Fashion: $70-120</li>
<li>Supplements: $45-75</li>
<li>Food & Bev: $35-55</li>
</ul>
<p>What's your current AOV and product lineup? I'll suggest specific bundle strategies.</p>`
    }
};

// Fallback response for unmatched topics
const fallbackResponses = [
    `<p><strong>Great question!</strong></p>
<p>That's an important area for DTC brands. Let me share some key principles:</p>
<ul>
<li><strong>Data-driven decisions</strong> — Always test before scaling. Run small experiments ($200-500) before committing budget.</li>
<li><strong>Focus on unit economics</strong> — Know your CAC, LTV, AOV, and margins cold. These numbers drive every decision.</li>
<li><strong>Customer experience wins</strong> — In DTC, your brand IS the experience. Every touchpoint matters.</li>
</ul>
<p>Could you give me more specifics about your situation? I can provide much more tactical advice if I know:</p>
<ul>
<li>Your product category</li>
<li>Current monthly revenue</li>
<li>Main challenge right now</li>
</ul>
<p>The more context you share, the more specific I can get! 🎯</p>`,

    `<p><strong>I'd love to help with that.</strong></p>
<p>To give you the most actionable advice, here's what I recommend:</p>
<ul>
<li><strong>Start with your numbers</strong> — What does your P&L look like? Revenue, COGS, ad spend, and net margin are the foundation.</li>
<li><strong>Identify the bottleneck</strong> — Most DTC brands have ONE constraint holding them back. Is it traffic, conversion, AOV, or retention?</li>
<li><strong>Build systems, not hacks</strong> — Sustainable growth comes from repeatable processes.</li>
</ul>
<p>Try asking me about a specific topic like:</p>
<ul>
<li>📉 Reducing CAC</li>
<li>📧 Email marketing strategy</li>
<li>🚀 Scaling your ad spend</li>
<li>🔄 Improving retention</li>
<li>📊 ROAS benchmarks</li>
</ul>
<p>I'll give you specific numbers, frameworks, and action steps!</p>`
];

// ── Initialization ──
document.addEventListener('DOMContentLoaded', () => {
    const saved = sessionStorage.getItem('dtc_email');
    if (saved) {
        emailCaptured = true;
        userEmail = saved;
        showChat();
        loadChatHistory();
    }
});

// ── Email Handling ──
function handleEmailSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('email-input');
    userEmail = input.value.trim();
    if (!userEmail) return;
    emailCaptured = true;
    sessionStorage.setItem('dtc_email', userEmail);
    showChat();
    addWelcomeMessage();
}

function handleEmailMidSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('email-input-mid');
    userEmail = input.value.trim();
    if (!userEmail) return;
    emailCaptured = true;
    sessionStorage.setItem('dtc_email', userEmail);
    document.getElementById('email-gate-mid').style.display = 'none';
    document.getElementById('chat-body').style.display = 'flex';
    enableInput();
}

function showChat() {
    document.getElementById('email-gate').style.display = 'none';
    document.getElementById('chat-body').style.display = 'flex';
}

function addWelcomeMessage() {
    const msg = `<p><strong>Welcome to DTC Mentor AI! 👋</strong></p>
<p>I'm your AI-powered ecommerce growth partner. I'm trained on proven DTC frameworks, real benchmarks from 8-figure brands, and tactical playbooks that actually work.</p>
<p><strong>I can help you with:</strong></p>
<ul>
<li>📉 Reducing your CAC & optimizing ad spend</li>
<li>📧 Building email sequences that convert</li>
<li>🔄 Retention & LTV strategies</li>
<li>🚀 Scaling from $10K to $1M+/month</li>
<li>📊 Benchmarks for your specific vertical</li>
</ul>
<p>What's your biggest challenge right now?</p>`;
    appendMessage('ai', msg);
    saveChatHistory();
}

// ── Chat Logic ──
function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || isTyping) return;
    sendMessage(text);
    input.value = '';
}

function sendSuggested(el) {
    if (isTyping) return;
    sendMessage(el.textContent);
}

function sendMessage(text) {
    appendMessage('user', escapeHtml(text));
    messageCount++;

    // Hide suggested prompts after first message
    const prompts = document.getElementById('suggested-prompts');
    if (prompts) prompts.style.display = 'none';

    // Check if email gate needed (after 3 messages, if not captured)
    if (messageCount >= 3 && !emailCaptured) {
        disableInput();
        setTimeout(() => {
            document.getElementById('chat-body').style.display = 'none';
            document.getElementById('email-gate-mid').style.display = 'flex';
        }, 500);
        return;
    }

    // Show typing then respond
    showTyping();
    const response = findResponse(text);
    const delay = 1200 + Math.random() * 1200;
    setTimeout(() => {
        hideTyping();
        appendMessage('ai', response);
        saveChatHistory();
    }, delay);
}

function findResponse(input) {
    const lower = input.toLowerCase();

    // Score each topic
    let bestMatch = null;
    let bestScore = 0;

    for (const [topic, data] of Object.entries(knowledgeBase)) {
        let score = 0;
        for (const kw of data.keywords) {
            if (lower.includes(kw)) {
                score += kw.split(' ').length; // Multi-word matches score higher
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = data;
        }
    }

    if (bestMatch && bestScore > 0) return bestMatch.response;
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

// ── UI Helpers ──
function appendMessage(type, html) {
    const messages = document.getElementById('chat-messages');
    const wrapper = document.createElement('div');
    wrapper.className = `message ${type}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = type === 'ai' ? '◆' : '→';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = html;

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);

    // Scroll to bottom
    requestAnimationFrame(() => {
        messages.scrollTop = messages.scrollHeight;
    });
}

function showTyping() {
    isTyping = true;
    disableInput();
    const messages = document.getElementById('chat-messages');
    const wrapper = document.createElement('div');
    wrapper.className = 'message ai';
    wrapper.id = 'typing-msg';

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = '◆';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
    isTyping = false;
    enableInput();
    const el = document.getElementById('typing-msg');
    if (el) el.remove();
}

function disableInput() {
    document.getElementById('chat-input').disabled = true;
    document.getElementById('send-btn').disabled = true;
}

function enableInput() {
    const input = document.getElementById('chat-input');
    input.disabled = false;
    document.getElementById('send-btn').disabled = false;
    input.focus();
}

function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
}

// ── Session History ──
function saveChatHistory() {
    const messages = document.getElementById('chat-messages');
    sessionStorage.setItem('dtc_chat', messages.innerHTML);
}

function loadChatHistory() {
    const saved = sessionStorage.getItem('dtc_chat');
    if (saved) {
        document.getElementById('chat-messages').innerHTML = saved;
        const msgs = document.querySelectorAll('.message');
        messageCount = Math.floor(msgs.length / 2); // rough count of user messages
    } else {
        addWelcomeMessage();
    }
}

// ── Navigation ──
function scrollToChat() {
    const chat = document.getElementById('chat-container');
    chat.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (emailCaptured) {
        setTimeout(() => document.getElementById('chat-input').focus(), 500);
    } else {
        setTimeout(() => document.getElementById('email-input').focus(), 500);
    }
}

function useExample(el) {
    scrollToChat();
    const text = el.querySelector('.example-text').textContent.replace(/"/g, '');
    if (emailCaptured) {
        setTimeout(() => {
            document.getElementById('chat-input').value = text;
            document.getElementById('chat-input').focus();
        }, 600);
    }
}

function resetChat() {
    sessionStorage.removeItem('dtc_chat');
    messageCount = 0;
    document.getElementById('chat-messages').innerHTML = '';
    document.getElementById('suggested-prompts').style.display = 'flex';
    addWelcomeMessage();
}

// ── Smooth Reveal Animations ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.trust-item, .feature-card, .example-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
