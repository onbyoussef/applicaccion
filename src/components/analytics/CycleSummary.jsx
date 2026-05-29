import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const CycleSummary = ({ cycleSummary, currencySymbol }) => {
  const cycles = [
    { type: 'daily', label: 'Daily', emoji: '☀️', color: 'from-yellow-500 to-yellow-400' },
    { type: 'weekly', label: 'Weekly', emoji: '📅', color: 'from-blue-500 to-blue-400' },
    { type: 'monthly', label: 'Monthly', emoji: '🗓️', color: 'from-purple-500 to-purple-400' },
    { type: 'oneOff', label: 'One-off', emoji: '⚡', color: 'from-rose-500 to-rose-400' },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800 rounded-lg p-4 space-y-4"
    >
      <h3 className="text-lg font-semibold text-white">🔄 Spending Cycles</h3>

      <div className="space-y-3">
        {cycles.map(cycle => (
          <div key={cycle.type}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{cycle.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{cycle.label}</p>
                  <p className="text-xs text-slate-400">
                    {cycleSummary[cycle.type].count} items • {currencySymbol}{Math.round(cycleSummary[cycle.type].total)}
                  </p>
                </div>
              </div>
              <p className="text-sm font-bold text-white">{Math.round(cycleSummary.percentages[cycle.type])}%</p>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${cycle.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${cycleSummary.percentages[cycle.type]}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-700 text-xs text-slate-400 text-center">
        Total: {currencySymbol}{Math.round(cycleSummary.total)}
      </div>
    </motion.div>
  );
};

export default CycleSummary;
