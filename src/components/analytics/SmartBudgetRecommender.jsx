import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const SmartBudgetRecommender = ({ recommendation, currencySymbol }) => {
  if (!recommendation) return null;

  const difference = recommendation.difference;
  const isAboveBudget = recommendation.trend === 'above';

  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-lg p-4 border-l-4 space-y-3 ${
        isAboveBudget
          ? 'bg-amber-900/20 border-amber-700'
          : 'bg-emerald-900/20 border-emerald-700'
      }`}
    >
      <h3 className="text-lg font-semibold text-white">🎯 Smart Budget Recommendation</h3>

      <div className={`p-3 rounded ${
        isAboveBudget
          ? 'bg-amber-900/40'
          : 'bg-emerald-900/40'
      }`}>
        <p className="text-xs text-slate-300 mb-1">Based on last 3 months</p>
        <p className={`text-2xl font-bold ${
          isAboveBudget ? 'text-amber-200' : 'text-emerald-200'
        }`}>
          {currencySymbol}{Math.round(recommendation.recommendedBudget)}
        </p>
        <p className="text-xs text-slate-400 mt-1">Recommended monthly budget</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-700/50 p-2 rounded">
          <p className="text-xs text-slate-400">Current</p>
          <p className="font-bold text-white">{currencySymbol}{Math.round(recommendation.currentBudget)}</p>
        </div>
        <div className="bg-slate-700/50 p-2 rounded">
          <p className="text-xs text-slate-400">3-Month Avg</p>
          <p className="font-bold text-white">{currencySymbol}{Math.round(recommendation.recentAverage)}</p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-700">
        <p className={`text-sm font-semibold ${
          isAboveBudget ? 'text-amber-300' : 'text-emerald-300'
        }`}>
          {isAboveBudget
            ? `📈 Your spending is ${currencySymbol}${Math.round(Math.abs(difference))} above current budget`
            : `✓ Your spending is ${currencySymbol}${Math.round(Math.abs(difference))} below current budget`
          }
        </p>
      </div>
    </motion.div>
  );
};

export default SmartBudgetRecommender;
