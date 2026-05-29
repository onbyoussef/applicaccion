import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const EndOfMonthReportCard = ({ reportCard, currencySymbol }) => {
  const getGradeColor = () => {
    const colors = {
      A: 'from-emerald-600 to-emerald-500',
      B: 'from-blue-600 to-blue-500',
      C: 'from-amber-600 to-amber-500',
      D: 'from-orange-600 to-orange-500',
      F: 'from-rose-600 to-rose-500',
    };
    return colors[reportCard.grade] || colors.C;
  };

  const getGradeEmoji = () => {
    const emojis = { A: '🏆', B: '👍', C: '👌', D: '📌', F: '⚠️' };
    return emojis[reportCard.grade];
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`bg-gradient-to-br ${getGradeColor()} rounded-lg p-6 text-white relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 opacity-10 text-6xl">{getGradeEmoji()}</div>

      <div className="relative z-10 space-y-4">
        <div>
          <p className="text-white/80 text-sm font-medium">Monthly Report Card</p>
          <h3 className="text-6xl font-black mt-2">{reportCard.grade}</h3>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-semibold">{reportCard.message}</p>
          <p className="text-sm text-white/80">{reportCard.percentage}% of budget used</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/20">
          <div>
            <p className="text-xs text-white/70">Budget</p>
            <p className="font-bold text-lg">{currencySymbol}{Math.round(reportCard.budget)}</p>
          </div>
          <div>
            <p className="text-xs text-white/70">Spent</p>
            <p className="font-bold text-lg">{currencySymbol}{Math.round(reportCard.spent)}</p>
          </div>
        </div>

        <div className="bg-white/10 rounded p-2 text-center">
          <p className="text-sm font-bold">
            {reportCard.remaining >= 0 ? '💰 ' : '📉 '}
            {currencySymbol}{Math.round(Math.abs(reportCard.remaining))} {reportCard.remaining >= 0 ? 'remaining' : 'over'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EndOfMonthReportCard;
