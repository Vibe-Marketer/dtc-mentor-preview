"use strict";(()=>{var e={};e.id=31,e.ids=[31],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4899:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>y,patchFetch:()=>R,requestAsyncStorage:()=>l,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>h});var o={};r.r(o),r.d(o,{POST:()=>d});var a=r(9303),s=r(8716),n=r(670),i=r(7070);let u=new(r(213)).ZP({apiKey:process.env.ANTHROPIC_API_KEY}),p=`You are DTC Mentor analyzing real Shopify store data. Based on these metrics, provide a strategic health check.

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
- Products: Hero product brands often do best with 5-20 SKUs`;async function d(e){try{let{metrics:t}=await e.json();if(!t)return i.NextResponse.json({error:"Metrics required"},{status:400});let r=`
STORE METRICS:
- Monthly Revenue: $${t.estimatedMonthlyRevenue.toLocaleString()}
- Revenue Growth: ${t.revenueGrowth>0?"+":""}${t.revenueGrowth}% vs last month
- Orders (30d): ${t.totalOrders30d}
- Average Order Value: $${t.aov}
- Total Customers: ${t.totalCustomers.toLocaleString()}
- New Customers (30d): ${t.newCustomers30d}
- Repeat Customer Rate: ${t.repeatCustomerRate}%
- Total Products: ${t.totalProducts}
- 90-Day Revenue: $${t.totalRevenue90d.toLocaleString()}
`,o=(await u.messages.create({model:"claude-3-haiku-20240307",max_tokens:1500,system:p,messages:[{role:"user",content:r}]})).content.filter(e=>"text"===e.type).map(e=>e.text).join("\n");return i.NextResponse.json({analysis:o,metrics:t})}catch(e){return console.error("Analysis error:",e),i.NextResponse.json({error:"Failed to analyze store"},{status:500})}}let c=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/shopify/analyze/route",pathname:"/api/shopify/analyze",filename:"route",bundlePath:"app/api/shopify/analyze/route"},resolvedPagePath:"/Users/administrator/.openclaw/workspace/dtc-mentor/app/api/shopify/analyze/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:l,staticGenerationAsyncStorage:h,serverHooks:m}=c,y="/api/shopify/analyze/route";function R(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:h})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[276,972,213],()=>r(4899));module.exports=o})();