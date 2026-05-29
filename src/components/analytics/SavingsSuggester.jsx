import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const SavingsSuggester = ({ suggestions, currencySymbol = '$' }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <motion.div
        variants={itemVariants}
        className="bg-slate-800 rounded-lg p-4 text-center"
      >
        <p className="text-sm text-slate-400">✓ No savings opportunities found right now</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800 rounded-lg p-4 space-y-3"
    >
      <h3 className="text-lg font-semibold text-white">💡 Savings Opportunities</h3>

      <div className="space-y-2">
        {suggestions.slice(0, 4).map(suggestion => (
          <motion.div
            key={suggestion.id}
            className={`p-3 rounded border-l-4 ${
              suggestion.priority === 'high'
                ? 'bg-rose-900/20 border-rose-700'
                : 'bg-amber-900/20 border-amber-700'
            }`}
          >
            <div className="flex items-start justify-between mb-1">
              <p className="font-semibold text-slate-200 text-sm">{suggestion.title}</p>
              <p className={`text-xs font-bold ${
                suggestion.priority === 'high' ? 'text-rose-300' : 'text-amber-300'
              }`}>
                {currencySymbol}{Math.round(suggestion.potentialSavings)}/mo
              </p>
            </div>
            <p className="text-xs text-slate-400">{suggestion.description}</p>
          </motion.div>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div className="pt-3 border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center">
            Potential monthly savings: <span className="font-bold text-success-400">
              {currencySymbol}{Math.round(suggestions.reduce((sum, s) => sum + s.potentialSavings, 0))}
            </span>
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SavingsSuggester;
