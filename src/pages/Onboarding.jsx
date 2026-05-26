import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants } from '../utils/animations.js';
import { useBudget } from '../hooks/useBudget.js';
import { useTheme } from '../hooks/useTheme.js';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';
import { CURRENCIES, APP_NAME, APP_VERSION } from '../constants/categories.js';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState('2000');
  const [currency, setCurrency] = useState('EUR');
  const [theme, setThemeLocal] = useState('dark');
  const { setBudget: setBudgetContext, completeOnboarding } = useBudget();
  const { setTheme: setThemeContext } = useTheme();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      const budgetAmount = parseFloat(budget) || 2000;
      setBudgetContext({
        total: budgetAmount,
        byCategory: {
          food: budgetAmount * 0.175,
          transport: budgetAmount * 0.1,
          shopping: budgetAmount * 0.075,
          housing: budgetAmount * 0.5,
          health: budgetAmount * 0.075,
          entertainment: budgetAmount * 0.05,
          travel: budgetAmount * 0.025,
          education: budgetAmount * 0.025,
          business: 0,
          other: 0,
        },
      });
      setThemeContext(theme);
      completeOnboarding();
      onComplete();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            className="text-center space-y-6"
          >
            <div className="text-7xl mb-4">💰</div>
            <h1 className="text-4xl font-bold text-white">
              {APP_NAME}
            </h1>
            <p className="text-xl text-slate-400">Track every euro. Own your future.</p>
            <p className="text-sm text-slate-500">v{APP_VERSION}</p>
            <p className="text-slate-300 text-lg mt-8">
              Welcome! Let's set up your budget tracking in 3 simple steps.
            </p>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">What's your monthly budget?</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Monthly Budget Amount
                </label>
                <div className="flex gap-2">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="px-3 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                  >
                    {Object.entries(CURRENCIES).map(([key, { symbol, label }]) => (
                      <option key={key} value={key}>
                        {symbol} {label}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="number"
                    placeholder="e.g., 2000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <p className="text-sm text-slate-400">
                We'll automatically distribute this across categories. You can adjust later.
              </p>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Choose your theme</h2>
            <div className="space-y-3">
              <button
                onClick={() => setThemeLocal('dark')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-primary-500 bg-slate-800'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <div className="text-2xl mb-2">🌙</div>
                <div className="font-semibold text-white">Dark Mode</div>
                <div className="text-xs text-slate-400">Easy on the eyes</div>
              </button>
              <button
                onClick={() => setThemeLocal('light')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  theme === 'light'
                    ? 'border-primary-500 bg-slate-100'
                    : 'border-slate-300 bg-slate-100/50 hover:border-slate-400'
                }`}
              >
                <div className="text-2xl mb-2">☀️</div>
                <div className={`font-semibold ${theme === 'light' ? 'text-slate-900' : 'text-slate-700'}`}>
                  Light Mode
                </div>
                <div className={`text-xs ${theme === 'light' ? 'text-slate-600' : 'text-slate-500'}`}>
                  Bright and clear
                </div>
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderStep()}

        <div className="mt-12 flex gap-3">
          {step > 1 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            variant="primary"
            size="lg"
            className="flex-1"
          >
            {step === 3 ? 'Get Started' : 'Next'}
          </Button>
        </div>

        <div className="flex gap-2 justify-center mt-8">
          {[1, 2, 3].map((dot) => (
            <motion.div
              key={dot}
              className={`h-2 rounded-full transition-all ${
                dot === step ? 'bg-primary-500 w-8' : 'bg-slate-600 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
