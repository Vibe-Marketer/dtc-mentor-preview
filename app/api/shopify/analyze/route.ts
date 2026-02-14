import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface StoreMetrics {
  totalRevenue30d: number;
  totalRevenue90d: number;
  totalOrders30d: number;
  totalOrders90d: number;
  aov: number;
  totalCustomers: number;
  newCustomers30d: number;
  repeatCustomerRate: number;
  totalProducts: number;
  estimatedMonthlyRevenue: number;
  revenueGrowth: number;
}

const ANALYSIS_PROMPT = `You are DTC Mentor analyzing real Shopify store data. Based on these metrics, provide a strategic health check.

Be direct and specific. Identify the biggest opportunities and problems. Give actionable recommendations with specific numbers.

Format your response as:
1. STORE HEALTH SCORE (1-100) with brief justification
2. TOP 3 STRENGTHS (what's working)
3. TOP 3 PROBLEMS (what needs fixing, in priority order)
4. IMMEDIATE ACTIONS (what to do this week)
5. 30-DAY PRIORITIES (what to focus on this month)

Reference industry benchmarks:
- AOV: Good is $75+, Great is $100+
- Repeat rate: Good is 25%+, Great is 35%+
- Revenue growth: Healthy is 10%+ month-over-month
- Products: Hero product brands often do best with 5-20 SKUs`;

export async function POST(req: NextRequest) {
  try {
    const { metrics }: { metrics: StoreMetrics } = await req.json();
    
    if (!metrics) {
      return NextResponse.json({ error: 'Metrics required' }, { status: 400 });
    }
    
    const metricsText = `
STORE METRICS:
- Monthly Revenue: $${metrics.estimatedMonthlyRevenue.toLocaleString()}
- Revenue Growth: ${metrics.revenueGrowth > 0 ? '+' : ''}${metrics.revenueGrowth}% vs last month
- Orders (30d): ${metrics.totalOrders30d}
- Average Order Value: $${metrics.aov}
- Total Customers: ${metrics.totalCustomers.toLocaleString()}
- New Customers (30d): ${metrics.newCustomers30d}
- Repeat Customer Rate: ${metrics.repeatCustomerRate}%
- Total Products: ${metrics.totalProducts}
- 90-Day Revenue: $${metrics.totalRevenue90d.toLocaleString()}
`;
    
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1500,
      system: ANALYSIS_PROMPT,
      messages: [
        { role: 'user', content: metricsText }
      ],
    });
    
    const analysis = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');
    
    return NextResponse.json({ 
      analysis,
      metrics,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze store' }, { status: 500 });
  }
}
