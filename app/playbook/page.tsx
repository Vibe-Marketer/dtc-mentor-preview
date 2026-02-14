'use client';

import { useState } from 'react';

export default function PlaybookPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    
    setLoading(true);
    
    // TODO: Connect to email service (ConvertKit, Beehiiv, etc.)
    // For now, just simulate success
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-xl text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Check your inbox
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            The $100M DTC Playbook is on its way. Give it 2 minutes.
          </p>
          <a 
            href="/"
            className="inline-block bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Try DTC Mentor Free →
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm font-bold px-4 py-1 rounded-full mb-6">
            FREE DOWNLOAD
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            The $100M DTC Playbook
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Exactly how Liquid Death, OLIPOP, Jolie, and Jones Road built 
            9-figure brands. Real strategies. Real numbers. No fluff.
          </p>
        </div>

        {/* Email Capture */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold px-8 py-4 rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Get It Free'}
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-3">
            No spam. Unsubscribe anytime.
          </p>
        </form>

        {/* What's Inside */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">What's Inside</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="text-3xl mb-3">💧</div>
              <h3 className="text-xl font-bold mb-2">Liquid Death</h3>
              <p className="text-gray-400">
                How they turned water into a $700M brand with zero paid ads at launch. 
                The exact content strategy that made them go viral.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="text-3xl mb-3">🥤</div>
              <h3 className="text-xl font-bold mb-2">OLIPOP</h3>
              <p className="text-gray-400">
                From farmers markets to $200M+ revenue. Their retail strategy, 
                influencer playbook, and subscription model breakdown.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="text-3xl mb-3">🚿</div>
              <h3 className="text-xl font-bold mb-2">Jolie</h3>
              <p className="text-gray-400">
                $0 to $25M in 2 years selling shower heads. The TikTok strategy, 
                PR playbook, and unit economics that made it work.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="text-3xl mb-3">💄</div>
              <h3 className="text-xl font-bold mb-2">Jones Road</h3>
              <p className="text-gray-400">
                Bobbi Brown's comeback brand: $100M+ in 3 years. The organic-first 
                strategy, email machine, and community playbook.
              </p>
            </div>
          </div>
        </div>

        {/* Proof Points */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-8">This Isn't Theory</h2>
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
            <div>
              <div className="text-3xl font-black text-white">$1B+</div>
              <div className="text-sm">Combined Revenue</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">4</div>
              <div className="text-sm">Deep-Dive Case Studies</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">47</div>
              <div className="text-sm">Actionable Tactics</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Stop guessing. Start stealing.
          </h2>
          <p className="text-gray-400 mb-6">
            These brands figured it out. Now you can copy their playbook.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold px-8 py-4 rounded-xl transition-all disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Get It Free'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 text-sm">
          <p>From the team at <a href="/" className="text-gray-400 hover:text-white">DTC Mentor</a></p>
        </div>
      </div>
    </main>
  );
}
