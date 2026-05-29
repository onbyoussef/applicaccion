import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const NeedLevelSummary = ({ needLevels, currencySymbol }) => {
  const categories = [
    { type: 'mustHave', label: 'Must-Have', emoji: '🏥', color: 'from-rose-500 to-rose-400' },
    { type: 'shouldHave', label: 'Should-Have', emoji: '📚', color: 'from-blue-500 to-blue-400' },
    { type: 'niceToHave', label: 'Nice-to-Have', emoji: '🎁', color: 'from-amber-500 to-amber-400' },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800 rounded-lg p-4 space-y-4"
    >
      <h3 className="text-lg font-semibold text-white">📊 Need Level Summary</h3>

      <div className="space-y-3">
        {categories.map(cat => (
          <div key={cat.type}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{cat.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{cat.label}</p>
                  <p className="text-xs text-slate-400">{currencySymbol}{Math.round(needLevels[cat.type])}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-white">{Math.round(needLevels.percentages[cat.type])}%</p>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${cat.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${needLevels.percentages[cat.type]}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-700 text-xs text-slate-400 text-center">
        Total: {currencySymbol}{Math.round(needLevels.total)}
      </div>
    </motion.div>
  );
};

export default NeedLevelSummary;
