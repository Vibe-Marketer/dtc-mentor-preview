/* ============================================
   DTC Mentor AI — OpenAI-Powered Chat Engine
   ============================================
   
   CONFIGURATION:
   Set your OpenAI API key in one of these ways:
   1. Click the ⚙️ settings icon in the chat header
   2. Set window.DTC_MENTOR_CONFIG before this script loads
   3. Set via URL parameter: ?apiKey=sk-...
   
   The API key is stored in localStorage for persistence.
   For production, consider using a proxy server to avoid
   exposing API keys client-side.
   ============================================ */

// ── Configuration ──
const DTC_CONFIG = {
    model: 'gpt-4o-mini',
    maxTokens: 2000,
    temperature: 0.7,
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    // Override with your proxy URL if you have one:
    // apiEndpoint: 'https://your-proxy.com/v1/chat/completions',
};

// ── State ──
let messageCount = 0;
let emailCaptured = false;
let userEmail = '';
let isTyping = false;
let conversationHistory = [];
let systemPrompt = '';
let apiKey = '';

// ── Knowledge Base Loading ──
async function loadKnowledgeBase() {
    try {
        const resp = await fetch('knowledge-base.md');
        if (!resp.ok) throw new Error('Failed to load knowledge base');
        const text = await resp.text();
        systemPrompt = buildSystemPrompt(text);
    } catch (e) {
        console.warn('Could not load knowledge-base.md, using fallback system prompt');
        systemPrompt = buildSystemPrompt('');
    }
}

function buildSystemPrompt(knowledgeBase) {
    return `You are DTC Mentor AI — an elite direct-to-consumer ecommerce consultant who charges $500/hr. You have deep expertise across every aspect of building and scaling DTC brands.

## Your Personality & Style
- You're direct, tactical, and data-driven. No fluff, no generic advice.
- You give SPECIFIC numbers, benchmarks, and frameworks — not vague suggestions.
- You think in systems and frameworks, not one-off tactics.
- You ask smart follow-up questions to give better advice.
- You reference real tools, platforms, and strategies by name.
- You're encouraging but honest — you'll tell someone if their approach won't work.
- Use formatting: bold for emphasis, bullet points for lists, headers for sections.
- Keep responses comprehensive but scannable — use structure.

## Your Knowledge
You have deep expertise in:
- Customer acquisition (Meta/Facebook ads, TikTok ads, Google ads, YouTube, influencer marketing)
- Email & SMS marketing (Klaviyo flows, campaign strategy, segmentation)
- Conversion rate optimization (product pages, checkout, A/B testing)
- Retention & LTV (loyalty programs, subscriptions, win-back campaigns, community building)
- Unit economics (CAC, LTV, ROAS, contribution margin, P&L analysis)
- Scaling operations (hiring, 3PL, inventory management, tech stack)
- Brand building (content marketing, PR, community, organic social)
- Product research & validation
- Shopify optimization
- Supply chain & sourcing
- Subscription & membership models

## Response Guidelines
1. Always lead with the most actionable insight
2. Include specific benchmarks and numbers where relevant
3. Structure advice in frameworks when possible (numbered steps, phases, etc.)
4. Ask 1-2 follow-up questions to personalize advice further
5. Reference specific tools and platforms by name (Klaviyo, Triple Whale, etc.)
6. When giving benchmarks, contextualize by industry/stage when you can
7. If the user shares their numbers, do the math for them
8. Don't just list options — recommend the BEST option and explain why
9. Use emoji sparingly for section headers (📊, 🎯, 📧, etc.)

## Important Rules
- Never make up statistics. If you're not sure of an exact number, give a reasonable range and say it's an estimate.
- Always consider the user's likely stage/size when giving advice. A $10K/mo brand needs different advice than a $1M/mo brand.
- Don't recommend tactics that require enterprise-level budgets to someone just starting out.
- Be specific about costs, timelines, and expected results.

${knowledgeBase ? `## Reference Knowledge Base\nThe following is your core reference data with sourced benchmarks and frameworks. Use this as your primary data source, supplemented by your training knowledge:\n\n${knowledgeBase}` : ''}`;
}

// ── API Key Management ──
function getApiKey() {
    // Priority: 1) Runtime config, 2) URL param, 3) localStorage
    if (window.DTC_MENTOR_CONFIG?.apiKey) return window.DTC_MENTOR_CONFIG.apiKey;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('apiKey')) {
        localStorage.setItem('dtc_api_key', urlParams.get('apiKey'));
        return urlParams.get('apiKey');
    }
    return localStorage.getItem('dtc_api_key') || '';
}

function setApiKey(key) {
    apiKey = key.trim();
    localStorage.setItem('dtc_api_key', apiKey);
    updateSettingsUI();
}

function hasApiKey() {
    return apiKey && apiKey.length > 10;
}

// ── Initialization ──
document.addEventListener('DOMContentLoaded', async () => {
    apiKey = getApiKey();
    await loadKnowledgeBase();
    
    const saved = sessionStorage.getItem('dtc_email');
    if (saved) {
        emailCaptured = true;
        userEmail = saved;
        showChat();
        loadChatHistory();
    }
    
    updateSettingsUI();
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
    const msg = `**Welcome to DTC Mentor AI! 👋**

I'm your AI-powered ecommerce growth partner — think of me as a $500/hr DTC consultant in your pocket. I'm trained on real benchmarks, proven frameworks, and tactical playbooks from 8-figure brands.

**I can help you with:**
- 📉 Reducing CAC & optimizing ad spend across Meta, TikTok, Google
- 📧 Building email/SMS flows that drive 30%+ of revenue  
- 🔄 Retention strategies, subscriptions & LTV maximization
- 🚀 Scaling from $10K to $1M+/month with a clear roadmap
- 📊 Unit economics, ROAS benchmarks & P&L analysis
- 🛍️ Shopify optimization, CRO & checkout improvements

What's your biggest challenge right now?`;
    appendMessage('ai', renderMarkdown(msg));
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
    autoResizeInput();
}

function sendSuggested(el) {
    if (isTyping) return;
    sendMessage(el.textContent);
}

async function sendMessage(text) {
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

    // Add to conversation history
    conversationHistory.push({ role: 'user', content: text });

    // Keep conversation history manageable (last 20 messages)
    if (conversationHistory.length > 20) {
        conversationHistory = conversationHistory.slice(-20);
    }

    if (hasApiKey()) {
        await streamAIResponse();
    } else {
        // Show settings prompt
        showTyping();
        setTimeout(() => {
            hideTyping();
            const msg = `⚙️ **API Key Required**

To get AI-powered responses, an OpenAI API key needs to be configured. Click the **⚙️ icon** in the chat header to set it up.

Once configured, I'll be able to give you expert, personalized DTC advice powered by real-time AI.`;
            appendMessage('ai', renderMarkdown(msg));
            conversationHistory.push({ role: 'assistant', content: msg });
            saveChatHistory();
        }, 800);
    }
}

// ── OpenAI Streaming ──
async function streamAIResponse() {
    showTyping();
    
    const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory
    ];

    try {
        const response = await fetch(DTC_CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: DTC_CONFIG.model,
                messages: messages,
                max_tokens: DTC_CONFIG.maxTokens,
                temperature: DTC_CONFIG.temperature,
                stream: true
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error?.message || `API error: ${response.status}`);
        }

        hideTyping();

        // Create message element for streaming
        const { bubble, wrapper } = createMessageElement('ai');
        let fullText = '';

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices?.[0]?.delta?.content;
                    if (delta) {
                        fullText += delta;
                        bubble.innerHTML = renderMarkdown(fullText);
                        scrollToBottom();
                    }
                } catch (e) {
                    // Skip malformed chunks
                }
            }
        }

        // Final render
        bubble.innerHTML = renderMarkdown(fullText);
        conversationHistory.push({ role: 'assistant', content: fullText });
        saveChatHistory();
        enableInput();

    } catch (error) {
        hideTyping();
        const errorMsg = `⚠️ **Error:** ${error.message}\n\nPlease check your API key in settings (⚙️) and try again.`;
        appendMessage('ai', renderMarkdown(errorMsg));
        enableInput();
    }
}

// ── Markdown Renderer (lightweight) ──
function renderMarkdown(text) {
    if (!text) return '';
    let html = text
        // Escape HTML first
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // Headers
        .replace(/^### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^## (.+)$/gm, '<h3>$1</h3>')
        .replace(/^# (.+)$/gm, '<h3>$1</h3>')
        // Bold and italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Code blocks
        .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        // Horizontal rules
        .replace(/^---$/gm, '<hr>')
        // Links
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Process lists and paragraphs
    const lines = html.split('\n');
    let result = '';
    let inList = false;
    let listType = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const bulletMatch = line.match(/^(\s*)[-*•]\s+(.+)/);
        const numberMatch = line.match(/^(\s*)\d+[.)]\s+(.+)/);

        if (bulletMatch) {
            if (!inList || listType !== 'ul') {
                if (inList) result += `</${listType}>`;
                result += '<ul>';
                inList = true;
                listType = 'ul';
            }
            result += `<li>${bulletMatch[2]}</li>`;
        } else if (numberMatch) {
            if (!inList || listType !== 'ol') {
                if (inList) result += `</${listType}>`;
                result += '<ol>';
                inList = true;
                listType = 'ol';
            }
            result += `<li>${numberMatch[2]}</li>`;
        } else {
            if (inList) {
                result += `</${listType}>`;
                inList = false;
            }
            if (line.startsWith('<h') || line.startsWith('<pre') || line.startsWith('<hr')) {
                result += line;
            } else if (line.trim() === '') {
                result += '';
            } else {
                result += `<p>${line}</p>`;
            }
        }
    }
    if (inList) result += `</${listType}>`;

    return result;
}

// ── UI Helpers ──
function createMessageElement(type) {
    const messages = document.getElementById('chat-messages');
    const wrapper = document.createElement('div');
    wrapper.className = `message ${type}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = type === 'ai' ? '◆' : '→';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);
    scrollToBottom();

    return { bubble, wrapper };
}

function appendMessage(type, html) {
    const { bubble } = createMessageElement(type);
    bubble.innerHTML = html;
    scrollToBottom();
}

function scrollToBottom() {
    const messages = document.getElementById('chat-messages');
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
    scrollToBottom();
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

// ── Auto-resize textarea ──
function autoResizeInput() {
    const input = document.getElementById('chat-input');
    if (input.tagName === 'TEXTAREA') {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    }
}

// ── Session History ──
function saveChatHistory() {
    const messages = document.getElementById('chat-messages');
    sessionStorage.setItem('dtc_chat', messages.innerHTML);
    sessionStorage.setItem('dtc_conversation', JSON.stringify(conversationHistory));
}

function loadChatHistory() {
    const saved = sessionStorage.getItem('dtc_chat');
    const savedConversation = sessionStorage.getItem('dtc_conversation');
    if (saved) {
        document.getElementById('chat-messages').innerHTML = saved;
        const msgs = document.querySelectorAll('.message.user');
        messageCount = msgs.length;
        if (savedConversation) {
            try { conversationHistory = JSON.parse(savedConversation); } catch(e) {}
        }
    } else {
        addWelcomeMessage();
    }
}

// ── Settings Modal ──
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
        document.getElementById('api-key-input').value = apiKey || '';
    }
}

function saveSettings() {
    const key = document.getElementById('api-key-input').value;
    const model = document.getElementById('model-select').value;
    setApiKey(key);
    DTC_CONFIG.model = model;
    localStorage.setItem('dtc_model', model);
    toggleSettings();
}

function updateSettingsUI() {
    const indicator = document.getElementById('api-status');
    if (indicator) {
        indicator.textContent = hasApiKey() ? 'AI Connected' : 'Setup Required';
        indicator.className = hasApiKey() ? 'api-status connected' : 'api-status disconnected';
    }
    const savedModel = localStorage.getItem('dtc_model');
    if (savedModel) DTC_CONFIG.model = savedModel;
    const modelSelect = document.getElementById('model-select');
    if (modelSelect) modelSelect.value = DTC_CONFIG.model;
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
    sessionStorage.removeItem('dtc_conversation');
    conversationHistory = [];
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

// ── Keyboard shortcut: Enter to send, Shift+Enter for newline ──
document.addEventListener('keydown', (e) => {
    if (e.target.id === 'chat-input' && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('chat-form').dispatchEvent(new Event('submit'));
    }
});
