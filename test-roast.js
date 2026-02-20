// Quick test script for the roaster
const testUrl = 'https://www.shopify.com';

async function testRoaster() {
  console.log('🔥 Testing roaster with:', testUrl);
  console.log('\n1. Fetching HTML via Jina AI Reader...');
  
  // Step 1: Fetch HTML client-side
  const jinaUrl = `https://r.jina.ai/${testUrl}`;
  const htmlResponse = await fetch(jinaUrl, {
    headers: {
      'Accept': 'text/html',
      'X-Return-Format': 'html'
    }
  });
  
  if (!htmlResponse.ok) {
    throw new Error(`Failed to fetch HTML: ${htmlResponse.status}`);
  }
  
  const html = await htmlResponse.text();
  console.log(`✓ Got HTML (${html.length} chars)`);
  
  // Step 2: Send to API for analysis
  console.log('\n2. Sending to API for analysis...');
  const apiResponse = await fetch('https://dtcmentor.ai/api/roast', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      url: testUrl,
      html: html
    })
  });
  
  const result = await apiResponse.json();
  
  if (!apiResponse.ok) {
    throw new Error(`API error: ${result.error}`);
  }
  
  console.log('✓ Got roast!');
  console.log('\n📊 Analysis:');
  console.log(`- Title: ${result.analysis.title}`);
  console.log(`- H1: ${result.analysis.h1}`);
  console.log(`- Images: ${result.analysis.imageCount}`);
  console.log(`- Reviews: ${result.analysis.hasReviews ? 'Yes' : 'No'}`);
  console.log(`- Email Capture: ${result.analysis.hasEmailCapture ? 'Yes' : 'No'}`);
  
  console.log('\n🔥 Roast preview:');
  console.log(result.roast.substring(0, 500) + '...');
  
  console.log('\n✅ TEST PASSED - Roaster is working!');
}

testRoaster().catch(err => {
  console.error('❌ TEST FAILED:', err.message);
  process.exit(1);
});
