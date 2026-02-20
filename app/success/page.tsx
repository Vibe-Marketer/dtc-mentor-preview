'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (sessionId) {
      // Mark as paid user in localStorage
      localStorage.setItem('dtc-mentor-paid', 'true');
      localStorage.setItem('dtc-mentor-session', sessionId);
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Confirming your subscription...</p>
        </div>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-8">
            We couldn't confirm your subscription. If you were charged, please contact support.
          </p>
          <Link 
            href="/pricing"
            className="inline-block bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-gray-100"
          >
            Try Again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-4">You're In!</h1>
        <p className="text-gray-400 mb-8">
          Welcome to DTC Mentor. You now have unlimited access to AI-powered DTC advice.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-8 py-4 rounded-xl hover:from-blue-400 hover:to-purple-400 transition-colors"
          >
            Start Chatting →
          </Link>
          
          <div className="text-sm text-gray-500">
            <p className="mb-2">Quick tips to get the most out of DTC Mentor:</p>
            <ul className="text-left space-y-1">
              <li>• Share your actual numbers (CAC, AOV, margins)</li>
              <li>• Ask specific questions, not general ones</li>
              <li>• Challenge the AI's advice if it doesn't fit</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
