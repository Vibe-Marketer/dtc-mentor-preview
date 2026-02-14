"use strict";(()=>{var e={};e.id=744,e.ids=[744],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5315:e=>{e.exports=require("path")},5048:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>S,patchFetch:()=>A,requestAsyncStorage:()=>k,routeModule:()=>y,serverHooks:()=>v,staticGenerationAsyncStorage:()=>b});var n={};r.r(n),r.d(n,{POST:()=>w});var o=r(9303),s=r(8716),a=r(670),i=r(7070),c=r(213);let u=require("fs");var h=r.n(u),l=r(5315),p=r.n(l);function d(e){let t=new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","by","from","as","is","was","are","were","been","be","have","has","had","do","does","did","will","would","could","should","may","might","must","shall","can","need","dare","ought","used","this","that","these","those","i","you","he","she","it","we","they","what","which","who","when","where","why","how","all","each","every","both","few","more","most","other","some","such","no","not","only","own","same","so","than","too","very"]);return e.toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(e=>e.length>2&&!t.has(e))}let m=`You are DTC Mentor, an expert AI advisor for direct-to-consumer ecommerce brands. You help founders and operators scale profitably.

Your expertise includes:
- Unit economics (LTV, CAC, contribution margin, payback periods)
- Email/SMS marketing (Klaviyo, flows, campaigns, benchmarks)
- Paid advertising (Meta, TikTok, Google, creative strategy)
- Retention & loyalty (repeat purchase optimization, subscriptions)
- Scaling strategy (when/how to grow, hiring, operations)

IMPORTANT - Be a strategic consultant, not a chatbot:

1. ASK DIAGNOSTIC QUESTIONS FIRST
Before giving advice, understand the full picture. Ask 2-3 targeted questions based on what they share.

For scaling questions, ask:
- Current monthly revenue and growth rate
- Contribution margin (not just gross margin)
- Repeat purchase rate and average customer lifespan
- Cash runway in months
- What's working NOW vs what's not

For performance problems (CAC rising, ROAS dropping), ask:
- What are the specific numbers (now vs 30/60/90 days ago)?
- What changed recently (creative, audience, landing page)?
- How often are you testing new creative?
- What does your funnel look like (CTR, CVR, AOV)?

For retention problems, ask:
- Where in the journey are customers dropping off?
- What's your current email/SMS setup?
- Do you have post-purchase flows?
- What's your product repurchase cycle?

2. DIG DEEPER ON VAGUE ANSWERS
If they say "my CAC is high" - ask "what's the number and what channel?"
If they say "retention is bad" - ask "what's your repeat rate and time to second purchase?"
Don't accept vague answers - get specific numbers.

3. THEN GIVE TARGETED ADVICE
Once you understand the situation, give specific recommendations with exact numbers and priorities. Reference the knowledge base benchmarks.

4. IDENTIFY THE REAL PROBLEM
Often the stated problem isn't the root cause. Someone asking about scaling might actually have a cash flow problem. Someone asking about ads might have a product-market fit issue. Diagnose before prescribing.

Style guidelines:
- Be direct and actionable. No fluff.
- Give specific numbers and benchmarks from the knowledge base when available
- Suggest concrete next steps
- If you don't know something, say so
- Use bullet points and headers for clarity
- Keep responses focused and practical
- When you reference specific metrics or frameworks, cite them clearly`,g=new c.ZP({apiKey:process.env.ANTHROPIC_API_KEY}),f=null;async function w(e){try{let{messages:t}=await e.json(),r=t.filter(e=>"user"===e.role).pop()?.content||"",n=function(e){try{let t=function(){if(!f){let e=p().join(process.cwd(),"knowledge"),t=h().readdirSync(e).filter(e=>e.endsWith(".md")),r="";for(let n of t){let t=p().join(e,n);r+="\n\n"+h().readFileSync(t,"utf-8")}f={chunks:function(e){let t=[],r=e.split("\n"),n="",o="",s=0;for(let e of r)e.startsWith("## ")?(o.trim()&&t.push({id:`chunk-${s++}`,text:o.trim(),section:n,keywords:d(o)}),n=e.replace("## ",""),o=e+"\n"):e.startsWith("### ")?(o.trim()&&o.split("\n").length>2&&t.push({id:`chunk-${s++}`,text:o.trim(),section:n,keywords:d(o)}),o=`## ${n}
${e}
`):o+=e+"\n";return o.trim()&&t.push({id:`chunk-${s++}`,text:o.trim(),section:n,keywords:d(o)}),t}(r),createdAt:new Date().toISOString()},console.log(`Loaded search store with ${f.chunks.length} chunks from ${t.length} files`)}return f}(),r=function(e,t,r=4){let n=d(e);if(0===n.length)return[];let o=t.chunks.reduce((e,t)=>e+t.keywords.length,0)/t.chunks.length,s=t.chunks.map(e=>({chunk:e,score:function(e,t,r,n=1.5,o=.75){let s=t.length,a=new Map;for(let e of t)a.set(e,(a.get(e)||0)+1);let i=0;for(let t of e){let e=a.get(t)||0;e>0&&(i+=e*(n+1)/(e+n*(1-o+s/r*o)))}return i}(n,e.keywords,o)}));return s.sort((e,t)=>t.score-e.score),s.filter(e=>e.score>0).slice(0,r).map(e=>e.chunk)}(e,t,4);if(0===r.length)return"";let n=r.map(e=>e.text).join("\n\n---\n\n");return`

RELEVANT KNOWLEDGE BASE CONTEXT:
${n}`}catch(e){return console.error("Error retrieving context:",e),""}}(r),o=t.map(e=>({role:"user"===e.role?"user":"assistant",content:e.content})),s=(await g.messages.create({model:"claude-3-haiku-20240307",max_tokens:1024,system:m+n,messages:o})).content.filter(e=>"text"===e.type).map(e=>e.text).join("\n");return i.NextResponse.json({response:s})}catch(e){return console.error("Chat API error:",e),i.NextResponse.json({response:"Sorry, there was an error processing your request. Please try again."},{status:500})}}let y=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"/Users/administrator/.openclaw/workspace/dtc-mentor/app/api/chat/route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:k,staticGenerationAsyncStorage:b,serverHooks:v}=y,S="/api/chat/route";function A(){return(0,a.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:b})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[276,972,213],()=>r(5048));module.exports=n})();