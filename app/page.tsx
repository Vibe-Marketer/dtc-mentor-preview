'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface BusinessProfile {
  revenue: string;
  platform: string;
  category: string;
  challenge: string;
  teamSize: string;
}

const ONBOARDING_QUESTIONS = [
  {
    id: 'revenue',
    question: "What's your current monthly revenue?",
    options: [
      { value: 'pre-launch', label: 'Pre-launch', emoji: '🚀' },
      { value: 'under-10k', label: 'Under $10K/mo', emoji: '🌱' },
      { value: '10k-50k', label: '$10K - $50K/mo', emoji: '📈' },
      { value: '50k-100k', label: '$50K - $100K/mo', emoji: '🔥' },
      { value: '100k-500k', label: '$100K - $500K/mo', emoji: '⚡' },
      { value: '500k-plus', label: '$500K+/mo', emoji: '👑' },
    ]
  },
  {
    id: 'platform',
    question: "What platform are you selling on?",
    options: [
      { value: 'shopify', label: 'Shopify', emoji: '🛍️' },
      { value: 'tiktok-shop', label: 'TikTok Shop', emoji: '📱' },
      { value: 'amazon', label: 'Amazon', emoji: '📦' },
    ]
  },
  {
    id: 'category',
    question: "What do you sell?",
    options: [
      { value: 'beauty', label: 'Beauty & Skincare', emoji: '💄' },
      { value: 'apparel', label: 'Apparel & Fashion', emoji: '👕' },
      { value: 'supplements', label: 'Supplements & Health', emoji: '💊' },
      { value: 'food-bev', label: 'Food & Beverage', emoji: '🍫' },
      { value: 'home', label: 'Home & Lifestyle', emoji: '🏠' },
      { value: 'tech', label: 'Tech & Gadgets', emoji: '📱' },
      { value: 'pets', label: 'Pet Products', emoji: '🐕' },
      { value: 'other', label: 'Other', emoji: '📦' },
    ]
  },
  {
    id: 'challenge',
    question: "What's your biggest challenge right now?",
    options: [
      { value: 'traffic', label: 'Getting traffic', emoji: '👀' },
      { value: 'conversion', label: 'Converting visitors', emoji: '🎯' },
      { value: 'aov', label: 'Increasing AOV', emoji: '💰' },
      { value: 'retention', label: 'Repeat purchases', emoji: '🔄' },
      { value: 'margins', label: 'Improving margins', emoji: '📊' },
      { value: 'scaling', label: 'Scaling profitably', emoji: '🚀' },
    ]
  },
  {
    id: 'teamSize',
    question: "What's your team look like?",
    options: [
      { value: 'solo', label: 'Just me', emoji: '🦸' },
      { value: 'small', label: '2-5 people', emoji: '👥' },
      { value: 'growing', label: '6-15 people', emoji: '🏢' },
      { value: 'established', label: '15+ people', emoji: '🏛️' },
    ]
  }
];

export default function Home() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [profile, setProfile] = useState<BusinessProfile>({
    revenue: '',
    platform: '',
    category: '',
    challenge: '',
    teamSize: ''
  });
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check for saved profile on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('dtc-mentor-profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setOnboardingComplete(true);
      setMessages([{
        role: 'assistant',
        content: getWelcomeMessage(parsed)
      }]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getWelcomeMessage = (p: BusinessProfile) => {
    const revenueLabel = ONBOARDING_QUESTIONS[0].options.find(o => o.value === p.revenue)?.label || '';
    const categoryLabel = ONBOARDING_QUESTIONS[2].options.find(o => o.value === p.category)?.label || '';
    const challengeLabel = ONBOARDING_QUESTIONS[3].options.find(o => o.value === p.challenge)?.label?.toLowerCase() || '';
    
    return `Perfect. ${revenueLabel} ${categoryLabel.toLowerCase()} brand — I know exactly where you're at.\n\nYour main challenge is ${challengeLabel}. Let's dig in.\n\nWhat specific question do you have? The more detail you give me, the more tactical I can get.`;
  };

  const handleOnboardingAnswer = (value: string) => {
    const questionId = ONBOARDING_QUESTIONS[currentQuestion].id as keyof BusinessProfile;
    const newProfile = { ...profile, [questionId]: value };
    setProfile(newProfile);
    
    if (currentQuestion < ONBOARDING_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Save profile and start chat
      localStorage.setItem('dtc-mentor-profile', JSON.stringify(newProfile));
      setOnboardingComplete(true);
      setMessages([{
        role: 'assistant',
        content: getWelcomeMessage(newProfile)
      }]);
    }
  };

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
          messages: [...messages, { role: 'user', content: userMessage }],
          profile // Send the business profile with every request
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

  const resetProfile = () => {
    localStorage.removeItem('dtc-mentor-profile');
    setProfile({ revenue: '', platform: '', category: '', challenge: '', teamSize: '' });
    setCurrentQuestion(0);
    setOnboardingComplete(false);
    setMessages([]);
    setQuestionsAsked(0);
  };

  // Onboarding Screen
  if (!onboardingComplete) {
    const question = ONBOARDING_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion) / ONBOARDING_QUESTIONS.length) * 100;
    
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              DTC Mentor
            </h1>
            <p className="text-sm text-gray-400">Let me learn about your business first</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto w-full px-4 pt-6">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Question {currentQuestion + 1} of {ONBOARDING_QUESTIONS.length}
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {question.question}
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOnboardingAnswer(option.value)}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 rounded-xl p-4 text-left transition-all duration-200 group"
              >
                <span className="text-2xl mb-2 block">{option.emoji}</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Chat Screen
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
          <div className="text-right flex items-center gap-4">
            <button 
              onClick={resetProfile}
              className="text-xs text-gray-500 hover:text-gray-400"
            >
              Reset Profile
            </button>
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

      {/* Profile Badge */}
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="inline-flex items-center gap-2 bg-gray-800/50 rounded-full px-3 py-1 text-xs text-gray-400">
          <span>{ONBOARDING_QUESTIONS[0].options.find(o => o.value === profile.revenue)?.label}</span>
          <span>•</span>
          <span>{ONBOARDING_QUESTIONS[2].options.find(o => o.value === profile.category)?.label}</span>
          <span>•</span>
          <span>{ONBOARDING_QUESTIONS[1].options.find(o => o.value === profile.platform)?.label}</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto px-4 py-2">
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
