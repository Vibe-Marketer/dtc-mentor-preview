import { NextRequest, NextResponse } from 'next/server';

// Shopify OAuth flow - Step 1: Redirect to Shopify
export async function GET(req: NextRequest) {
  const shopifyClientId = process.env.SHOPIFY_CLIENT_ID;
  const redirectUri = process.env.SHOPIFY_REDIRECT_URI || 'https://dtc-mentor.vercel.app/api/shopify/callback';
  
  const shop = req.nextUrl.searchParams.get('shop');
  
  if (!shop) {
    return NextResponse.json({ error: 'Shop parameter required' }, { status: 400 });
  }
  
  if (!shopifyClientId) {
    return NextResponse.json({ error: 'Shopify not configured' }, { status: 500 });
  }
  
  // Scopes needed to pull store metrics
  const scopes = [
    'read_orders',
    'read_customers', 
    'read_products',
    'read_analytics',
  ].join(',');
  
  const nonce = Math.random().toString(36).substring(7);
  
  const authUrl = `https://${shop}/admin/oauth/authorize?` +
    `client_id=${shopifyClientId}` +
    `&scope=${scopes}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${nonce}`;
  
  return NextResponse.redirect(authUrl);
}
