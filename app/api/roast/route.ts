import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import * as cheerio from 'cheerio';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const ROAST_PROMPT = `You are a brutally honest DTC landing page critic. You've reviewed thousands of Shopify stores and know what converts and what doesn't.

Your job is to analyze the extracted data from a landing page and provide:
1. **Score out of 10** - Be harsh but fair
2. **What's Actually Good** - 2-3 things they did right (be specific)
3. **What's Broken** - All the problems you see (be ruthless)
4. **Fix These 3 Things First** - Prioritized, actionable fixes with specific examples

**Your voice:**
- Direct and cutting, like a friend who tells you the truth
- Specific, not vague ("Your headline is weak" ❌ → "Your headline 'Welcome to our store' says nothing. Try: 'Clear skin in 14 days or your money back'" ✅)
- Compare to what winners do
- No sugarcoating, but constructive

**Common DTC sins to call out:**
- Generic headlines that could be any brand
- No clear value prop above the fold
- Weak or missing social proof
- Multiple CTAs competing for attention
- No email capture (leaving money on the table)
- Slow load times
- Missing trust badges
- Prices hidden (if they're good, show them!)
- Product photos that look like stock images
- No reviews visible

**Be specific with fixes:**
❌ "Improve your headline"
✅ "Your headline 'Premium skincare' is forgettable. Test: 'The serum dermatologists don't want you to know about' or '10,000+ women cleared their acne with this'"

Format your response as:

## Score: X/10

## What's Actually Good
- [Specific thing with why it works]
- [Another specific thing]

## What's Broken
- [Problem with impact]
- [Another problem]
- [Keep going until you've covered everything]

## Fix These 3 Things First

### 1. [Most critical fix]
**Problem:** [What's wrong]
**Fix:** [Exactly what to do]
**Example:** [Show them what good looks like]

### 2. [Second priority]
**Problem:** [What's wrong]
**Fix:** [Exactly what to do]
**Example:** [Show them what good looks like]

### 3. [Third priority]
**Problem:** [What's wrong]
**Fix:** [Exactly what to do]
**Example:** [Show them what good looks like]

Remember: These are real businesses. Be harsh on the work, not the person. Every critique should come with a specific fix.`;

interface PageAnalysis {
  url: string;
  title?: string;
  metaDescription?: string;
  h1?: string;
  h2?: string;
  heroText?: string;
  pricing?: string[];
  imageCount: number;
  hasReviews: boolean;
  hasEmailCapture: boolean;
  hasTrustBadges: boolean;
  ctaButtons: string[];
  loadTime?: number;
}

async function analyzePage(url: string): Promise<PageAnalysis> {
  const startTime = Date.now();
  
  // Fetch the page
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status} ${response.statusText}`);
  }
  
  const html = await response.text();
  const loadTime = Date.now() - startTime;
  const $ = cheerio.load(html);
  
  // Extract page elements
  const analysis: PageAnalysis = {
    url,
    title: $('title').first().text().trim() || undefined,
    metaDescription: $('meta[name="description"]').attr('content')?.trim() || undefined,
    h1: $('h1').first().text().trim() || undefined,
    h2: $('h2').first().text().trim() || undefined,
    heroText: $('section, div, header').first().find('h1, h2, p').first().text().trim().slice(0, 200) || undefined,
    pricing: [],
    imageCount: $('img').length,
    hasReviews: false,
    hasEmailCapture: false,
    hasTrustBadges: false,
    ctaButtons: [],
    loadTime
  };
  
  // Look for pricing
  $('*').each((_, el) => {
    const text = $(el).text();
    const priceMatch = text.match(/\$[\d,]+(?:\.\d{2})?/g);
    if (priceMatch && analysis.pricing!.length < 5) {
      const currentPricing = analysis.pricing!;
      analysis.pricing!.push(...priceMatch.filter(p => !currentPricing.includes(p)));
    }
  });
  
  // Check for reviews/social proof
  const pageText = $('body').text().toLowerCase();
  analysis.hasReviews = 
    pageText.includes('review') || 
    pageText.includes('rating') || 
    pageText.includes('stars') ||
    pageText.includes('testimonial') ||
    $('.yotpo, .stamped, .loox, .judge-me, [class*="review"], [class*="rating"]').length > 0;
  
  // Check for email capture
  analysis.hasEmailCapture = 
    $('input[type="email"]').length > 0 || 
    pageText.includes('subscribe') || 
    pageText.includes('join our list') ||
    $('.klaviyo, [class*="popup"], [class*="newsletter"]').length > 0;
  
  // Check for trust badges
  analysis.hasTrustBadges = 
    pageText.includes('guarantee') || 
    pageText.includes('secure checkout') || 
    pageText.includes('free shipping') ||
    pageText.includes('money back') ||
    $('img[alt*="trust"], img[alt*="secure"], img[alt*="guarantee"], img[alt*="badge"]').length > 0;
  
  // Extract CTA buttons
  $('button, a.button, a.btn, [class*="cta"]').each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length < 50 && analysis.ctaButtons.length < 10) {
      analysis.ctaButtons.push(text);
    }
  });
  
  return analysis;
}

function buildAnalysisPrompt(analysis: PageAnalysis): string {
  return `Analyze this Shopify/DTC store landing page and roast it:

**URL:** ${analysis.url}

**Page Title:** ${analysis.title || 'Missing'}
**Meta Description:** ${analysis.metaDescription || 'Missing'}

**Headlines:**
- H1: ${analysis.h1 || 'Missing'}
- H2: ${analysis.h2 || 'Missing'}

**Hero Section Text:** ${analysis.heroText || 'Could not extract'}

**Pricing Visible:** ${analysis.pricing && analysis.pricing.length > 0 ? analysis.pricing.join(', ') : 'No prices found on page'}

**Images:** ${analysis.imageCount} total images found

**Reviews/Social Proof:** ${analysis.hasReviews ? 'Yes - reviews or testimonials detected' : 'No - no reviews visible'}

**Email Capture:** ${analysis.hasEmailCapture ? 'Yes - email signup detected' : 'No - no email capture found'}

**Trust Badges:** ${analysis.hasTrustBadges ? 'Yes - trust signals detected' : 'No - no trust badges found'}

**CTA Buttons Found:** ${analysis.ctaButtons.length > 0 ? analysis.ctaButtons.join(', ') : 'No clear CTAs found'}

**Load Time:** ${analysis.loadTime}ms ${analysis.loadTime && analysis.loadTime > 3000 ? '⚠️ SLOW' : ''}

Now tear this apart and tell them exactly how to fix it.`;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }
    
    // Validate URL
    let validUrl: URL;
    try {
      validUrl = new URL(url);
      if (!validUrl.protocol.match(/^https?:$/)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL. Please enter a valid http or https URL.' },
        { status: 400 }
      );
    }
    
    // Analyze the page
    let analysis: PageAnalysis;
    try {
      analysis = await analyzePage(validUrl.toString());
    } catch (error: any) {
      console.error('Page analysis error:', error);
      return NextResponse.json(
        { error: `Could not analyze page: ${error.message}. The site may be blocking automated requests or unreachable.` },
        { status: 500 }
      );
    }
    
    // Generate roast with Claude
    const prompt = buildAnalysisPrompt(analysis);
    
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: ROAST_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
    });
    
    const roast = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');
    
    return NextResponse.json({
      analysis,
      roast
    });
    
  } catch (error: any) {
    console.error('Roast API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
