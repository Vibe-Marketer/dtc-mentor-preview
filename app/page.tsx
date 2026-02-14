'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm your DTC Mentor - an AI trained on the best practices from top ecommerce brands. Ask me anything about:\n\n• Email/SMS flows & retention\n• Paid acquisition & creative\n• Unit economics (CAC, LTV, margins)\n• Conversion optimization\n• Scaling strategies\n\nWhat's on your mind?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content: userMessage }]
        })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      setQuestionsAsked(prev => prev + 1);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, something went wrong. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              DTC Mentor
            </h1>
            <p className="text-sm text-gray-400">AI-powered ecommerce advisor</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              {questionsAsked < 5 ? (
                <span>{5 - questionsAsked} free questions left</span>
              ) : (
                <a href="#upgrade" className="text-blue-400 hover:underline">
                  Upgrade for unlimited →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6 pb-32">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-100'
              }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pt-6 pb-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about retention, CAC, email flows, scaling..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Send
            </button>
          </div>
          <p className="text-center text-xs text-gray-600 mt-3">
            Powered by AI trained on top DTC frameworks
          </p>
        </div>
      </div>

      {/* Upgrade Modal - shows after 5 questions */}
      {questionsAsked >= 5 && (
        <div id="upgrade" className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-2">You're loving DTC Mentor!</h2>
            <p className="text-gray-400 mb-6">Unlock unlimited questions and advanced features</p>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6">
              <div className="text-3xl font-bold mb-1">$97/month</div>
              <div className="text-blue-200">Unlimited AI mentorship</div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Unlimited questions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Store audit tool
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Email flow templates
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Weekly strategy calls
              </li>
            </ul>

            <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
              Upgrade Now →
            </button>
            
            <button 
              onClick={() => setQuestionsAsked(0)}
              className="w-full text-gray-500 text-sm mt-4 hover:text-gray-400"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
