import { NextRequest, NextResponse } from 'next/server';

// Shopify OAuth flow - Step 2: Handle callback and get access token
export async function GET(req: NextRequest) {
  const shopifyClientId = process.env.SHOPIFY_CLIENT_ID;
  const shopifyClientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  
  const shop = req.nextUrl.searchParams.get('shop');
  const code = req.nextUrl.searchParams.get('code');
  
  if (!shop || !code) {
    return NextResponse.json({ error: 'Missing shop or code' }, { status: 400 });
  }
  
  if (!shopifyClientId || !shopifyClientSecret) {
    return NextResponse.json({ error: 'Shopify not configured' }, { status: 500 });
  }
  
  try {
    // Exchange code for access token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: shopifyClientId,
        client_secret: shopifyClientSecret,
        code: code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 400 });
    }
    
    // In production, store this token securely associated with the user
    // For now, redirect with token in URL (temporary for demo)
    const redirectUrl = new URL('/connected', req.url);
    redirectUrl.searchParams.set('shop', shop);
    redirectUrl.searchParams.set('token', tokenData.access_token);
    
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Shopify OAuth error:', error);
    return NextResponse.json({ error: 'OAuth failed' }, { status: 500 });
  }
}
