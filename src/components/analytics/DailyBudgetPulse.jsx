import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const DailyBudgetPulse = ({ safeSpendToday, currencySymbol, remainingDays, daysSpentPerWeek = 4 }) => {
  const safeSpendWeekly = safeSpendToday * 7;
  const recommendation = `Spend wisely! You have ${remainingDays} days left. ${
    safeSpendToday > 0
      ? `Safe daily limit: ${currencySymbol}${Math.round(safeSpendToday)}`
      : '🚨 You are over budget'
  }`;

  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white"
    >
      <div className="absolute top-0 right-0 opacity-10">
        <div className="text-6xl">💰</div>
      </div>

      <div className="relative z-10">
        <p className="text-blue-100 text-sm mb-2 font-medium">📱 Daily Budget Pulse</p>
        <div className="mb-4">
          <p className="text-5xl font-bold text-white">{currencySymbol}{Math.round(safeSpendToday)}</p>
          <p className="text-sm text-blue-100 mt-1">Safe to spend today</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-blue-300/30">
          <div>
            <p className="text-xs text-blue-100">Weekly Limit</p>
            <p className="text-lg font-semibold text-white">{currencySymbol}{Math.round(safeSpendWeekly)}</p>
          </div>
          <div>
            <p className="text-xs text-blue-100">Days Remaining</p>
            <p className="text-lg font-semibold text-white">{remainingDays}</p>
          </div>
        </div>

        <p className="text-xs text-blue-100 mt-3 italic">💡 {recommendation}</p>
      </div>
    </motion.div>
  );
};

export default DailyBudgetPulse;
