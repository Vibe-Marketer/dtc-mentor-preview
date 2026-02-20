'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Inputs {
  aov: number;
  cogsPercent: number;
  shippingCost: number;
  cac: number;
  repeatPurchaseRate: number;
  avgOrdersPerCustomer: number;
}

interface Outputs {
  grossMargin: number;
  contributionMargin: number;
  firstOrderProfitLoss: number;
  breakEvenOrders: number;
  ltv: number;
  ltvCacRatio: number;
  paybackPeriodMonths: number;
  verdict: 'healthy' | 'warning' | 'underwater';
  verdictExplanation: string;
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>({
    aov: 75,
    cogsPercent: 30,
    shippingCost: 8,
    cac: 35,
    repeatPurchaseRate: 25,
    avgOrdersPerCustomer: 2.5,
  });

  const [outputs, setOutputs] = useState<Outputs | null>(null);

  useEffect(() => {
    calculateMetrics();
  }, [inputs]);

  const calculateMetrics = () => {
    const { aov, cogsPercent, shippingCost, cac, repeatPurchaseRate, avgOrdersPerCustomer } = inputs;

    // Formulas
    const grossMargin = aov * (1 - cogsPercent / 100);
    const contributionMargin = grossMargin - shippingCost;
    const firstOrderProfitLoss = contributionMargin - cac;
    const breakEvenOrders = Math.ceil(cac / contributionMargin);
    const ltv = (aov * avgOrdersPerCustomer * (1 - cogsPercent / 100)) - (shippingCost * avgOrdersPerCustomer);
    const ltvCacRatio = ltv / cac;
    
    // Assume 4 purchases per year if not specified
    const purchaseFrequency = 4;
    const paybackPeriodMonths = (breakEvenOrders / purchaseFrequency) * 12;

    // Verdict logic
    let verdict: 'healthy' | 'warning' | 'underwater' = 'underwater';
    let verdictExplanation = '';

    if (ltvCacRatio >= 3 && firstOrderProfitLoss >= 0) {
      verdict = 'healthy';
      verdictExplanation = `Strong unit economics! Your LTV:CAC ratio of ${ltvCacRatio.toFixed(2)}:1 is excellent (above 3:1), and you're profitable on first order. This business can scale profitably.`;
    } else if (ltvCacRatio >= 2 && contributionMargin > 0) {
      verdict = 'warning';
      verdictExplanation = `Decent foundation, but needs improvement. Your LTV:CAC of ${ltvCacRatio.toFixed(2)}:1 is acceptable, but ${firstOrderProfitLoss < 0 ? 'you\'re losing $' + Math.abs(firstOrderProfitLoss).toFixed(2) + ' on first orders' : 'margins are tight'}. Focus on improving repeat rate or reducing CAC.`;
    } else {
      verdict = 'underwater';
      verdictExplanation = `Warning: Unsustainable economics. Your LTV:CAC of ${ltvCacRatio.toFixed(2)}:1 is too low (target 3:1+). ${firstOrderProfitLoss < 0 ? 'You\'re losing $' + Math.abs(firstOrderProfitLoss).toFixed(2) + ' per first order.' : ''} Reduce CAC, increase AOV, or improve retention before scaling.`;
    }

    setOutputs({
      grossMargin,
      contributionMargin,
      firstOrderProfitLoss,
      breakEvenOrders,
      ltv,
      ltvCacRatio,
      paybackPeriodMonths,
      verdict,
      verdictExplanation,
    });
  };

  const handleInputChange = (field: keyof Inputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'underwater': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getMetricColor = (value: number, thresholds: { good: number; warning: number }, isHigherBetter = true) => {
    if (isHigherBetter) {
      if (value >= thresholds.good) return 'text-green-400';
      if (value >= thresholds.warning) return 'text-yellow-400';
      return 'text-red-400';
    } else {
      if (value <= thresholds.good) return 'text-green-400';
      if (value <= thresholds.warning) return 'text-yellow-400';
      return 'text-red-400';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header with Navigation */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer">
                DTC Mentor
              </h1>
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Chat
              </Link>
              <Link href="/calculator" className="text-white font-medium">
                Calculator
              </Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Unit Economics Calculator
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Know your numbers. Make better decisions. Scale profitably.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* INPUTS Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-blue-400">📊</span> Your Numbers
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Average Order Value (AOV)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.aov}
                    onChange={(e) => handleInputChange('aov', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Cost of Goods Sold (COGS %)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputs.cogsPercent}
                    onChange={(e) => handleInputChange('cogsPercent', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.1"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Shipping Cost per Order
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.shippingCost}
                    onChange={(e) => handleInputChange('shippingCost', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Customer Acquisition Cost (CAC)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.cac}
                    onChange={(e) => handleInputChange('cac', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Repeat Purchase Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputs.repeatPurchaseRate}
                    onChange={(e) => handleInputChange('repeatPurchaseRate', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.1"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Average Orders per Customer
                </label>
                <input
                  type="number"
                  value={inputs.avgOrdersPerCustomer}
                  onChange={(e) => handleInputChange('avgOrdersPerCustomer', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          {/* OUTPUTS Section */}
          <div className="space-y-6">
            {/* Verdict */}
            {outputs && (
              <div className={`border-2 rounded-2xl p-6 ${
                outputs.verdict === 'healthy' ? 'bg-green-900/20 border-green-500/50' :
                outputs.verdict === 'warning' ? 'bg-yellow-900/20 border-yellow-500/50' :
                'bg-red-900/20 border-red-500/50'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {outputs.verdict === 'healthy' ? '✅' : outputs.verdict === 'warning' ? '⚠️' : '🚨'}
                  </span>
                  <h3 className={`text-2xl font-bold ${getVerdictColor(outputs.verdict)}`}>
                    {outputs.verdict.charAt(0).toUpperCase() + outputs.verdict.slice(1)}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {outputs.verdictExplanation}
                </p>
              </div>
            )}

            {/* Metrics */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-purple-400">📈</span> Results
              </h2>
              
              {outputs && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Gross Margin per Order</span>
                    <span className={`text-xl font-bold ${getMetricColor(outputs.grossMargin, { good: 30, warning: 20 })}`}>
                      ${outputs.grossMargin.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Contribution Margin</span>
                    <span className={`text-xl font-bold ${getMetricColor(outputs.contributionMargin, { good: 20, warning: 10 })}`}>
                      ${outputs.contributionMargin.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">First Order P/L</span>
                    <span className={`text-xl font-bold ${outputs.firstOrderProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${outputs.firstOrderProfitLoss.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Break-even Orders</span>
                    <span className={`text-xl font-bold ${getMetricColor(outputs.breakEvenOrders, { good: 2, warning: 3 }, false)}`}>
                      {outputs.breakEvenOrders}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">Customer LTV</span>
                    <span className={`text-xl font-bold ${getMetricColor(outputs.ltv, { good: 100, warning: 50 })}`}>
                      ${outputs.ltv.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-gray-400">LTV:CAC Ratio</span>
                    <span className={`text-xl font-bold ${getMetricColor(outputs.ltvCacRatio, { good: 3, warning: 2 })}`}>
                      {outputs.ltvCacRatio.toFixed(2)}:1
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400">Payback Period</span>
                    <span className={`text-xl font-bold ${getMetricColor(outputs.paybackPeriodMonths, { good: 3, warning: 6 }, false)}`}>
                      {outputs.paybackPeriodMonths.toFixed(1)} mo
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Benchmarks */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-300">📚 Healthy Benchmarks</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• <strong className="text-green-400">LTV:CAC</strong> should be 3:1 or higher</li>
                <li>• <strong className="text-green-400">First Order P/L</strong> ideally breakeven or positive</li>
                <li>• <strong className="text-green-400">Payback Period</strong> under 6 months preferred</li>
                <li>• <strong className="text-green-400">Contribution Margin</strong> 20%+ is healthy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Want Help Improving These Numbers?</h3>
            <p className="text-gray-300 mb-6">
              Chat with our AI mentor for personalized advice on improving your unit economics, retention strategies, and scaling profitably.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/"
                className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Ask the AI Mentor
              </Link>
              <Link 
                href="/pricing"
                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
