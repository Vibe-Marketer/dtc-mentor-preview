// Test with a smaller page
const testUrl = 'https://example.com';

async function testRoaster() {
  console.log('🔥 Testing roaster with:', testUrl);
  
  // Step 1: Fetch HTML
  const jinaUrl = `https://r.jina.ai/${testUrl}`;
  const htmlResponse = await fetch(jinaUrl, {
    headers: {
      'Accept': 'text/html',
      'X-Return-Format': 'html'
    }
  });
  
  const html = await htmlResponse.text();
  console.log(`✓ Got HTML (${html.length} chars)`);
  
  // Step 2: Send to API
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
    console.error('API Error:', result);
    throw new Error(`API error: ${result.error}`);
  }
  
  console.log('✅ SUCCESS!');
  console.log('Analysis:', result.analysis);
  console.log('Roast:', result.roast.substring(0, 300));
}

testRoaster().catch(err => {
  console.error('❌ FAILED:', err.message);
  process.exit(1);
});
