'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RoastResult {
  analysis: {
    url: string;
    title?: string;
    metaDescription?: string;
    h1?: string;
    h2?: string;
    pricing?: string[];
    imageCount: number;
    hasReviews: boolean;
    hasEmailCapture: boolean;
    hasTrustBadges: boolean;
    ctaButtons: string[];
    loadTime?: number;
  };
  roast: string;
}

export default function RoastPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<RoastResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      // Step 1: Fetch HTML client-side using Jina AI Reader (bypasses CORS and Vercel restrictions)
      const jinaUrl = `https://r.jina.ai/${url.trim()}`;
      const htmlResponse = await fetch(jinaUrl, {
        headers: {
          'Accept': 'text/html',
          'X-Return-Format': 'html'
        }
      });
      
      if (!htmlResponse.ok) {
        setError('Could not fetch the page. Make sure the URL is accessible.');
        return;
      }
      
      const html = await htmlResponse.text();
      
      // Step 2: Send HTML to API for analysis
      const res = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: url.trim(),
          html: html
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Failed to analyze page');
        return;
      }
      
      setResult(data);
    } catch (err: any) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const parseRoast = (roast: string) => {
    const sections = {
      score: '',
      good: '',
      broken: '',
      fixes: ''
    };
    
    // Extract score
    const scoreMatch = roast.match(/##\s*Score:\s*(\d+\/10)/i);
    if (scoreMatch) {
      sections.score = scoreMatch[1];
    }
    
    // Extract sections
    const goodMatch = roast.match(/##\s*What's Actually Good\s*([\s\S]*?)(?=##|$)/i);
    const brokenMatch = roast.match(/##\s*What's Broken\s*([\s\S]*?)(?=##|$)/i);
    const fixesMatch = roast.match(/##\s*Fix These 3 Things First\s*([\s\S]*?)$/i);
    
    if (goodMatch) sections.good = goodMatch[1].trim();
    if (brokenMatch) sections.broken = brokenMatch[1].trim();
    if (fixesMatch) sections.fixes = fixesMatch[1].trim();
    
    return sections;
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Bold text
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Handle headers
      if (line.startsWith('###')) {
        return <h4 key={i} className="text-lg font-bold mt-4 mb-2 text-white" dangerouslySetInnerHTML={{ __html: line.replace(/###\s*/, '') }} />;
      }
      
      // Handle list items
      if (line.trim().startsWith('-')) {
        return (
          <li key={i} className="ml-4 mb-2" dangerouslySetInnerHTML={{ __html: line.replace(/^-\s*/, '') }} />
        );
      }
      
      // Regular paragraph
      if (line.trim()) {
        return <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: line }} />;
      }
      
      return <br key={i} />;
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer">
              DTC Mentor
            </h1>
          </Link>
          <div className="text-sm text-gray-400">
            Landing Page Roaster 🔥
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Get Your Landing Page <span className="text-red-500">Roasted</span>
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Brutally honest feedback on your Shopify store's landing page.<br />
          Find out what's killing your conversions.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex gap-3 mb-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourstore.com"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-bold text-lg transition-colors whitespace-nowrap"
            >
              {loading ? 'Roasting...' : 'Roast My Store 🔥'}
            </button>
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 text-red-200 text-sm">
              {error}
            </div>
          )}
        </form>

        {/* Loading State */}
        {loading && (
          <div className="mt-12 text-center">
            <div className="inline-block bg-gray-800 rounded-2xl px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
                <p className="text-gray-300 font-medium">
                  {['Sharpening knives...', 'Analyzing every pixel...', 'Preparing brutal honesty...', 'Finding all the problems...'][Math.floor(Math.random() * 4)]}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {result && !loading && (
        <div className="max-w-5xl mx-auto px-4 pb-16">
          {(() => {
            const sections = parseRoast(result.roast);
            const scoreNum = parseInt(sections.score.split('/')[0] || '5');
            const scoreColor = scoreNum >= 8 ? 'text-green-400' : scoreNum >= 6 ? 'text-yellow-400' : 'text-red-400';
            
            return (
              <div className="space-y-6">
                {/* Score */}
                {sections.score && (
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
                    <div className="text-6xl font-bold mb-2">
                      <span className={scoreColor}>{sections.score}</span>
                    </div>
                    <div className="text-gray-400">
                      {scoreNum >= 8 && "Pretty solid! Just needs some polish."}
                      {scoreNum >= 6 && scoreNum < 8 && "Not bad, but lots of room to improve."}
                      {scoreNum >= 4 && scoreNum < 6 && "Needs serious work to convert."}
                      {scoreNum < 4 && "Ouch. Time for a complete overhaul."}
                    </div>
                  </div>
                )}

                {/* What's Good */}
                {sections.good && (
                  <div className="bg-green-900/20 border border-green-800 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold mb-4 text-green-400 flex items-center gap-2">
                      ✅ What's Actually Good
                    </h3>
                    <div className="text-gray-300 space-y-2">
                      {formatText(sections.good)}
                    </div>
                  </div>
                )}

                {/* What's Broken */}
                {sections.broken && (
                  <div className="bg-red-900/20 border border-red-800 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold mb-4 text-red-400 flex items-center gap-2">
                      ❌ What's Broken
                    </h3>
                    <div className="text-gray-300 space-y-2">
                      {formatText(sections.broken)}
                    </div>
                  </div>
                )}

                {/* Top 3 Fixes */}
                {sections.fixes && (
                  <div className="bg-blue-900/20 border border-blue-800 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-2">
                      🔧 Fix These 3 Things First
                    </h3>
                    <div className="text-gray-300 space-y-4">
                      {formatText(sections.fixes)}
                    </div>
                  </div>
                )}

                {/* Raw Data */}
                <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <summary className="cursor-pointer font-medium text-gray-400 hover:text-gray-300">
                    📊 View Raw Analysis Data
                  </summary>
                  <div className="mt-4 text-sm text-gray-400 space-y-2 font-mono">
                    <p><strong>URL:</strong> {result.analysis.url}</p>
                    <p><strong>Title:</strong> {result.analysis.title || 'N/A'}</p>
                    <p><strong>Meta:</strong> {result.analysis.metaDescription || 'N/A'}</p>
                    <p><strong>H1:</strong> {result.analysis.h1 || 'N/A'}</p>
                    <p><strong>Images:</strong> {result.analysis.imageCount}</p>
                    <p><strong>Load Time:</strong> {result.analysis.loadTime}ms</p>
                    <p><strong>Reviews:</strong> {result.analysis.hasReviews ? 'Yes' : 'No'}</p>
                    <p><strong>Email Capture:</strong> {result.analysis.hasEmailCapture ? 'Yes' : 'No'}</p>
                    <p><strong>Trust Badges:</strong> {result.analysis.hasTrustBadges ? 'Yes' : 'No'}</p>
                  </div>
                </details>

                {/* CTA */}
                <div className="text-center pt-8">
                  <button
                    onClick={() => {
                      setResult(null);
                      setUrl('');
                    }}
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Roast Another Store
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Footer CTA */}
      {!result && !loading && (
        <div className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-3">
              Want personalized advice for your store?
            </h3>
            <p className="text-gray-400 mb-6">
              Chat with DTC Mentor AI for tactics on retention, scaling, email flows, and more.
            </p>
            <Link href="/">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold transition-colors">
                Try DTC Mentor →
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
