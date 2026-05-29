import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const OneOffExpenseTracker = ({ cycleSummary, currencySymbol }) => {
  const oneOffData = cycleSummary.oneOff;
  const oneOffPercentage = cycleSummary.percentages.oneOff;

  // Warn if one-offs are too high (> 20% of spending)
  const isWarning = oneOffPercentage > 20;

  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-lg p-4 border-l-4 space-y-3 ${
        isWarning
          ? 'bg-amber-900/20 border-amber-700'
          : 'bg-slate-800 border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">⚡ One-off Expenses</h3>
        <div className="text-right">
          <p className={`text-sm font-bold ${isWarning ? 'text-amber-400' : 'text-white'}`}>
            {Math.round(oneOffPercentage)}%
          </p>
          <p className="text-xs text-slate-400">of spending</p>
        </div>
      </div>

      {isWarning && (
        <div className="bg-amber-900/40 p-2 rounded text-sm text-amber-200">
          ⚠️ You have too many one-off expenses. Planning helps reduce these.
        </div>
      )}

      <div className="bg-slate-700/50 p-3 rounded">
        <p className="text-sm text-slate-300 mb-2">
          <span className="font-bold text-white">{oneOffData.count}</span> one-off expenses
        </p>
        <p className="text-2xl font-bold text-white">{currencySymbol}{Math.round(oneOffData.total)}</p>
        <p className="text-xs text-slate-400 mt-1">Total this month</p>
      </div>

      {oneOffData.items.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-300">Top one-off expenses:</p>
          {oneOffData.items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span className="text-slate-400 truncate">{item.description}</span>
              <span className="font-bold text-white whitespace-nowrap ml-2">
                {currencySymbol}{Math.round(item.total)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="pt-3 border-t border-slate-700">
        <p className="text-xs text-slate-400 italic text-center">
          💡 Reduce one-offs by creating budgets for unexpected needs
        </p>
      </div>
    </motion.div>
  );
};

export default OneOffExpenseTracker;
