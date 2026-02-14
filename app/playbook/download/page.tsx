'use client';

export default function PlaybookDownload() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-500/20 text-green-400 text-sm font-bold px-4 py-1 rounded-full mb-6">
            ✓ YOU'RE IN
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            The $100M DTC Playbook
          </h1>
          <p className="text-xl text-gray-400">
            4 brands. 4 chapters. 20+ tactics you can steal today.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-bold mb-4">What's Inside</h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💧</span>
              <div>
                <span className="font-medium">Chapter 1: Liquid Death</span>
                <span className="text-gray-500 ml-2">— $1.4B selling water in cans</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥤</span>
              <div>
                <span className="font-medium">Chapter 2: OLIPOP</span>
                <span className="text-gray-500 ml-2">— $0 to $500M in 5 years</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚿</span>
              <div>
                <span className="font-medium">Chapter 3: Jolie</span>
                <span className="text-gray-500 ml-2">— $28M with no paid ads</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💄</span>
              <div>
                <span className="font-medium">Chapter 4: Jones Road</span>
                <span className="text-gray-500 ml-2">— $100M bootstrapped in 3 years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Playbook Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          
          <h2 className="text-3xl font-black text-white border-b border-gray-800 pb-4">Introduction: The New Rules</h2>
          
          <p>The playbook that built DTC brands from 2015-2020 is dead.</p>
          
          <p>Facebook CPMs are up 300%. iOS 14.5 killed attribution. Every brand looks the same. The arbitrage is over.</p>
          
          <p>But four brands didn't just survive — they became household names while most DTC brands died quietly.</p>
          
          <ul>
            <li><strong>Liquid Death:</strong> $1.4B valuation selling water in cans.</li>
            <li><strong>OLIPOP:</strong> $500M+ revenue in year 5, valued at $1.85B.</li>
            <li><strong>Jolie:</strong> $0 to $28M in 2 years selling shower heads.</li>
            <li><strong>Jones Road:</strong> $100M+ in 3 years, bootstrapped.</li>
          </ul>

          <p>This playbook breaks down exactly how they did it. No theory. Real tactics. Real numbers.</p>

          <hr className="border-gray-800 my-12" />

          {/* Chapter 1 */}
          <h2 className="text-3xl font-black text-white border-b border-gray-800 pb-4">
            <span className="text-4xl mr-2">💧</span> Chapter 1: Liquid Death
          </h2>
          <h3 className="text-xl text-gray-400">How to Build a $1.4B Brand Selling Commoditized Water</h3>

          <h4>The Insight</h4>
          <p>Mike Cessario noticed energy drink brands had incredible marketing — skull logos, extreme sports, rebellious vibes — but the products were terrible for you. Water was the opposite: healthy product, boring marketing.</p>
          <p><strong>The gap:</strong> What if you marketed water like a death metal energy drink?</p>

          <h4>The Numbers</h4>
          <ul>
            <li>Year 1 revenue: $2.8M</li>
            <li>2023 revenue: $263M</li>
            <li>Current valuation: $1.4B</li>
            <li>Retail locations: 113,000+</li>
            <li>Marketing spend: 10% of revenue allocated to brand (not performance)</li>
          </ul>

          <h4>The 5 Tactics That Built Liquid Death</h4>

          <div className="bg-gray-900 border-l-4 border-yellow-500 p-4 my-6">
            <h5 className="font-bold text-yellow-400 mb-2">1. Category Disruption Through Packaging</h5>
            <p className="text-gray-300 mb-0">Liquid Death chose tallboy aluminum cans — the same format as beer. Instantly different, socially acceptable at bars/concerts, sustainable, and justifies premium pricing ($1.89 vs $0.99).</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Find the packaging convention in your category and violate it intentionally.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-yellow-500 p-4 my-6">
            <h5 className="font-bold text-yellow-400 mb-2">2. Brand Investment as a Non-Negotiable</h5>
            <p className="text-gray-300 mb-0">From day one, Liquid Death allocated 10% of all revenue to brand marketing — regardless of what the spreadsheet said. This funded Super Bowl parodies, celebrity partnerships, and death metal albums.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Set aside a fixed % for brand before you calculate margins. Protect it like payroll.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-yellow-500 p-4 my-6">
            <h5 className="font-bold text-yellow-400 mb-2">3. Entertainment Over Advertising</h5>
            <p className="text-gray-300 mb-0">They don't run ads. They create content so good people share it voluntarily. "Greatest Hates" album featuring hate comments set to death metal. Mock infomercials. Billions of organic views.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Ask "would someone share this if we didn't pay them?" If no, don't make it.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-yellow-500 p-4 my-6">
            <h5 className="font-bold text-yellow-400 mb-2">4. Strategic Distribution = Lifestyle Placement</h5>
            <p className="text-gray-300 mb-0">Partnered with Live Nation for concerts. Not in the water aisle — in concert venues, 7-Eleven (next to beer), tattoo shops, gyms.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Go where your customer is expressing the identity your brand represents.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-yellow-500 p-4 my-6">
            <h5 className="font-bold text-yellow-400 mb-2">5. Mission as Marketing</h5>
            <p className="text-gray-300 mb-0">"Death to Plastic" isn't just a tagline. They donate to ocean cleanup, use only recyclable materials. Free press, partnership opportunities, customer loyalty.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Pick a real cause, make it central, and actually do something about it.</p>
          </div>

          <hr className="border-gray-800 my-12" />

          {/* Chapter 2 */}
          <h2 className="text-3xl font-black text-white border-b border-gray-800 pb-4">
            <span className="text-4xl mr-2">🥤</span> Chapter 2: OLIPOP
          </h2>
          <h3 className="text-xl text-gray-400">From Farmers Markets to $500M Revenue in 5 Years</h3>

          <h4>The Insight</h4>
          <p>Ben Goodwin spent 15 years trying to make a healthy soda that didn't taste like medicine. Gut health was exploding, but functional beverages tasted terrible.</p>
          <p><strong>The gap:</strong> What if a soda was both delicious AND healthy?</p>

          <h4>The Numbers</h4>
          <ul>
            <li>Year 1 revenue (2018): $852,000</li>
            <li>2024 projected: $500M</li>
            <li>Current valuation: $1.85B</li>
            <li>Retail locations: 50,000+</li>
            <li>Initial investment: $100,000</li>
          </ul>

          <h4>The 5 Tactics That Built OLIPOP</h4>

          <div className="bg-gray-900 border-l-4 border-blue-500 p-4 my-6">
            <h5 className="font-bold text-blue-400 mb-2">1. Obsessive Product Development (15 Years)</h5>
            <p className="text-gray-300 mb-0">Goodwin spent 15 years iterating on formulas. OLIPOP's breakthrough: It tastes like actual soda. Not "healthy soda." Soda. Flavors directly mimic nostalgic experiences while delivering 9g of fiber.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Don't launch until the product is genuinely better, not just "better for you."</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-blue-500 p-4 my-6">
            <h5 className="font-bold text-blue-400 mb-2">2. Strategic Retail Expansion</h5>
            <p className="text-gray-300 mb-0">2018: 40 Northern California stores. 2019: Regional chains. 2020: Target/Walmart. 2023: Costco, Starbucks. At each stage, they built proof of velocity before approaching the next tier.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Win your current retail tier before pitching the next one. Buyers want velocity data.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-blue-500 p-4 my-6">
            <h5 className="font-bold text-blue-400 mb-2">3. Social Media as Science Experiment</h5>
            <p className="text-gray-300 mb-0">They test constantly: which flavors drive UGC, which creators convert, which formats perform. TikTok exploded when they leaned into nostalgia — recreating childhood soda experiences.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Track which content types drive actual sales, not just engagement.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-blue-500 p-4 my-6">
            <h5 className="font-bold text-blue-400 mb-2">4. Subscription Model for Consumables</h5>
            <p className="text-gray-300 mb-0">Subscribe-and-save at 15% off. Increases LTV, creates predictable revenue, reduces CAC reliance. They marketed subscription aggressively from launch.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> If your product is consumable, make subscription the default, not an afterthought.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-blue-500 p-4 my-6">
            <h5 className="font-bold text-blue-400 mb-2">5. Investor-as-Distribution</h5>
            <p className="text-gray-300 mb-0">Investors include Camila Cabello, Priyanka Chopra, the Jonas Brothers, Gwyneth Paltrow. Not just checks — distribution channels with tens of millions of followers.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Choose investors who can open doors, not just write checks.</p>
          </div>

          <hr className="border-gray-800 my-12" />

          {/* Chapter 3 */}
          <h2 className="text-3xl font-black text-white border-b border-gray-800 pb-4">
            <span className="text-4xl mr-2">🚿</span> Chapter 3: Jolie
          </h2>
          <h3 className="text-xl text-gray-400">$0 to $28M in 2 Years With Almost No Paid Ads</h3>

          <h4>The Insight</h4>
          <p>Ryan Babenzien noticed his dry skin was getting worse and traced it to water quality. The beauty industry sells products to fix skin problems caused by water.</p>
          <p><strong>The gap:</strong> What if you just fixed the water?</p>

          <h4>The Numbers</h4>
          <ul>
            <li>Year 1 revenue (2022): $4M</li>
            <li>Year 2 revenue (2023): $28M</li>
            <li>Total raised: $2M (barely touched it)</li>
            <li>UGC videos created: 25,000+</li>
            <li>Paid ad spend: Near zero</li>
            <li>Profitable: From day one</li>
          </ul>

          <h4>The 5 Tactics That Built Jolie</h4>

          <div className="bg-gray-900 border-l-4 border-green-500 p-4 my-6">
            <h5 className="font-bold text-green-400 mb-2">1. Category Repositioning</h5>
            <p className="text-gray-300 mb-0">Jolie didn't enter "shower heads" — they entered "beauty." Shower heads are a $40 Home Depot commodity. Beauty products command premium prices and emotional loyalty.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Choose your competitive set strategically. Same product, different positioning = different business.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-green-500 p-4 my-6">
            <h5 className="font-bold text-green-400 mb-2">2. Manual UGC Seeding at Scale</h5>
            <p className="text-gray-300 mb-0">Manually reached out to hundreds of creators with a simple offer: free shower head for an honest review. Personal DMs, one by one. After a few hundred posted, the flywheel kicked in. Result: 25,000+ UGC videos.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Seed UGC manually until it becomes self-sustaining. Most brands give up too early.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-green-500 p-4 my-6">
            <h5 className="font-bold text-green-400 mb-2">3. Unmeasurable Marketing That Works</h5>
            <p className="text-gray-300 mb-0">Wrapped delivery trucks in NYC: "What if we told you your shower water was dirtier than this truck?" Can't measure sales from it. Massive social sharing and press. The unmeasured lifts the measured.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Allocate budget to creative brand marketing that can't be attributed. Trust that it lifts everything.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-green-500 p-4 my-6">
            <h5 className="font-bold text-green-400 mb-2">4. No Discounts, Ever</h5>
            <p className="text-gray-300 mb-0">Never ran a discount — not even Black Friday. "Customers who receive a discount expect one every time. It diminishes perceived value." Customers pay full price because they believe Jolie is premium.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> If you want to be a premium brand, act like one from day one. Discounts are a one-way door.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-green-500 p-4 my-6">
            <h5 className="font-bold text-green-400 mb-2">5. Margin-First Pricing</h5>
            <p className="text-gray-300 mb-0">Priced based on margin requirements, not competitors. Knew Jolie would need wholesale margins (~50%). Priced high enough to support omnichannel from the start.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Price for your target margin structure, not your competitor's price points.</p>
          </div>

          <hr className="border-gray-800 my-12" />

          {/* Chapter 4 */}
          <h2 className="text-3xl font-black text-white border-b border-gray-800 pb-4">
            <span className="text-4xl mr-2">💄</span> Chapter 4: Jones Road Beauty
          </h2>
          <h3 className="text-xl text-gray-400">$100M in 3 Years by Breaking Every DTC Rule</h3>

          <h4>The Insight</h4>
          <p>Bobbi Brown sold her brand to Estée Lauder in 1995, stayed 20 years, left in 2016. In 2020, at 63, she launched Jones Road with a different philosophy: less makeup, more skin.</p>
          <p><strong>The gap:</strong> Women over 40 want to look better, not more made up.</p>

          <h4>The Numbers</h4>
          <ul>
            <li>Year 1 revenue (2020): $20M</li>
            <li>Year 3 revenue (2023): $100M+</li>
            <li>Email subscribers: 1M+</li>
            <li>TikTok followers: 500K+</li>
            <li>Ad spend: ~$150-200K/month</li>
            <li>Funding: Bootstrapped</li>
          </ul>

          <h4>The 5 Tactics That Built Jones Road</h4>

          <div className="bg-gray-900 border-l-4 border-pink-500 p-4 my-6">
            <h5 className="font-bold text-pink-400 mb-2">1. Founder as Content Engine</h5>
            <p className="text-gray-300 mb-0">Bobbi posts multiple times daily. Morning routines in her bathroom. Product demos with no filters. Answering criticism. Teaching techniques. She IS the content.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> If you have founder credibility, use it. Get on camera daily.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-pink-500 p-4 my-6">
            <h5 className="font-bold text-pink-400 mb-2">2. Turning Controversy into Sales</h5>
            <p className="text-gray-300 mb-0">When a creator posted a negative viral review, Bobbi responded with a calm video showing correct application. No defensiveness. That response went viral. Sales quadrupled. The product became #1.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Negative viral moments are opportunities. Respond with helpfulness, not defensiveness.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-pink-500 p-4 my-6">
            <h5 className="font-bold text-pink-400 mb-2">3. Education Over Promotion</h5>
            <p className="text-gray-300 mb-0">Emails teach, not sell. "Not sure how to use Miracle Balm? Here's a guide." Email open rates: 30-35% (industry: 15-20%). BFCM 2023: Email drove 38.4% of revenue.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Teach first, sell second. Educated customers buy more and return less.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-pink-500 p-4 my-6">
            <h5 className="font-bold text-pink-400 mb-2">4. Minimal SKUs, Maximum Focus</h5>
            <p className="text-gray-300 mb-0">Launched with 6 products. While competitors launch 50+ SKUs, Jones Road went deep: Miracle Balm, What The Foundation, Face Pencil. Lower inventory risk, clearer decisions, stronger hero products.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Launch with fewer products than you think you need. Let winners emerge.</p>
          </div>

          <div className="bg-gray-900 border-l-4 border-pink-500 p-4 my-6">
            <h5 className="font-bold text-pink-400 mb-2">5. CX Automation That Scales</h5>
            <p className="text-gray-300 mb-0">After implementing support automation: 46% of tickets resolved automatically, 14% increase in post-support conversions, $1.5M in revenue in two weeks. Personal on front-end, automated on back-end.</p>
            <p className="text-sm text-gray-500 mt-2 mb-0"><strong>Tactic:</strong> Automate operations so you can afford to be personal where it matters.</p>
          </div>

          <hr className="border-gray-800 my-12" />

          {/* Common Threads */}
          <h2 className="text-3xl font-black text-white border-b border-gray-800 pb-4">The Common Threads</h2>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h4 className="font-bold text-white mb-2">1. Product First</h4>
              <p className="text-gray-400 text-sm mb-0">All four had products that genuinely worked before they scaled marketing.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h4 className="font-bold text-white mb-2">2. Brand as Fixed Expense</h4>
              <p className="text-gray-400 text-sm mb-0">None treated brand as optional. They protected unmeasurable marketing budget.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h4 className="font-bold text-white mb-2">3. Community &gt; Customers</h4>
              <p className="text-gray-400 text-sm mb-0">Built evangelists, not just buyers. People who defend the brand voluntarily.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h4 className="font-bold text-white mb-2">4. Founder Involvement</h4>
              <p className="text-gray-400 text-sm mb-0">All founders still actively involved in creative, product, or content daily.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 md:col-span-2">
              <h4 className="font-bold text-white mb-2">5. Patience</h4>
              <p className="text-gray-400 text-sm mb-0">Years building brand before scaling. 15 years on R&D. A year of manual UGC seeding. Resisting the urge to over-launch.</p>
            </div>
          </div>

          <hr className="border-gray-800 my-12" />

          {/* Action Items */}
          <h2 className="text-3xl font-black text-white border-b border-gray-800 pb-4">Your Action Items</h2>

          <h4>This Week</h4>
          <ul>
            <li><strong>Set your brand budget.</strong> Pick a % of revenue (5-10%) and protect it.</li>
            <li><strong>Identify 50 creators</strong> who would genuinely benefit from your product. Reach out manually.</li>
            <li><strong>Create one piece of founder content.</strong> Just one video, one post. Start.</li>
            <li><strong>Look at your pricing.</strong> Does it support wholesale margins? If not, raise it.</li>
          </ul>

          <h4>This Month</h4>
          <ul>
            <li><strong>Find your "tallboy can."</strong> What convention in your category could you violate?</li>
            <li><strong>Build one unmeasurable campaign.</strong> Something creative that can't be attributed.</li>
            <li><strong>Talk to 10 customers.</strong> Not surveys. Actual conversations.</li>
          </ul>

          <h4>This Quarter</h4>
          <ul>
            <li><strong>Track UGC velocity.</strong> How many organic posts monthly?</li>
            <li><strong>Measure repeat rate.</strong> Are you building loyalty or renting attention?</li>
            <li><strong>Calculate true LTV:CAC.</strong> With all costs included.</li>
          </ul>

        </article>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">
            Want personalized advice for YOUR brand?
          </h2>
          <p className="text-gray-400 mb-6">
            DTC Mentor is an AI trained on the best frameworks from top ecommerce operators.
          </p>
          <a 
            href="/"
            className="inline-block bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Try DTC Mentor Free →
          </a>
        </div>
      </div>
    </main>
  );
}
