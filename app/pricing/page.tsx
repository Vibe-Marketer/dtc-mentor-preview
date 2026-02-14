'use client';

import { useState } from 'react';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleCheckout = async (plan: string) => {
    setLoading(true);
    
    try {
      // For now, redirect to Stripe payment link
      // Los: Replace with your actual payment link
      const paymentLinks: Record<string, string> = {
        monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LINK || '#',
        annual: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_LINK || '#',
      };
      
      if (paymentLinks[plan] && paymentLinks[plan] !== '#') {
        window.location.href = paymentLinks[plan];
      } else {
        // Fallback: collect email for waitlist
        alert('Payment coming soon! We\'ll notify you at ' + email);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Stop Guessing. Start Scaling.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get AI-powered DTC advice trained on the strategies of $100M+ brands.
            Available 24/7. No fluff. Just tactics that work.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Monthly</h2>
              <p className="text-gray-400">Perfect for testing the waters</p>
            </div>
            
            <div className="mb-6">
              <span className="text-5xl font-black">$97</span>
              <span className="text-gray-400">/month</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Unlimited AI conversations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                DTC frameworks & playbooks
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Email flow templates
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Unit economics calculators
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Cancel anytime
              </li>
            </ul>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 mb-4 text-white"
            />

            <button
              onClick={() => handleCheckout('monthly')}
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Get Started →'}
            </button>
          </div>

          {/* Annual */}
          <div className="bg-gradient-to-b from-blue-900/50 to-gray-900 border border-blue-500/50 rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-black text-sm font-bold px-4 py-1 rounded-full">
              BEST VALUE
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Annual</h2>
              <p className="text-gray-400">2 months free</p>
            </div>
            
            <div className="mb-6">
              <span className="text-5xl font-black">$970</span>
              <span className="text-gray-400">/year</span>
              <div className="text-sm text-green-400 mt-1">Save $194/year</div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Everything in Monthly
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Priority support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Early access to new features
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Exclusive case studies
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Monthly group Q&A calls
              </li>
            </ul>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 mb-4 text-white"
            />

            <button
              onClick={() => handleCheckout('annual')}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:from-blue-400 hover:to-purple-400 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Get Started →'}
            </button>
          </div>
        </div>

        {/* Guarantee */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">30-Day Money Back Guarantee</h3>
            <p className="text-gray-400">
              If DTC Mentor doesn't help you improve your business in 30 days, 
              we'll refund every penny. No questions asked.
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">Trusted by DTC operators from</p>
          <div className="flex justify-center items-center gap-8 text-gray-600 font-bold">
            <span>Shopify</span>
            <span>•</span>
            <span>Amazon</span>
            <span>•</span>
            <span>TikTok Shop</span>
          </div>
        </div>
      </div>
    </main>
  );
}
