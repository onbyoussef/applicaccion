import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const DangerDayDetector = ({ dangerDay, currencySymbol = '$' }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800 rounded-lg p-4 space-y-4"
    >
      <h3 className="text-lg font-semibold text-white">⚠️ Danger Day Detector</h3>

      <div className="bg-rose-900/30 border border-rose-700/50 rounded-lg p-3">
        <p className="text-sm text-rose-300 mb-2">
          Highest spending on: <span className="font-bold text-rose-200">{dangerDay.highestDay.day}</span>
        </p>
        <p className="text-xs text-rose-400">
          Average: {currencySymbol}{Math.round(dangerDay.highestDay.average)}/day ({dangerDay.highestDay.count} transactions)
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-300">Days ranked by average spending:</p>
        {dangerDay.allDays.slice(0, 5).map((day, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-lg">
                {day.dayNum === 0 ? '🌞' : day.dayNum === 5 || day.dayNum === 6 ? '🎉' : '📅'}
              </span>
              <div className="flex-1">
                <p className="text-sm text-slate-300 font-medium">{day.day}</p>
                <p className="text-xs text-slate-500">{day.count} transactions</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-white text-sm">{currencySymbol}{Math.round(day.average)}</p>
              <p className="text-xs text-slate-500">avg</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-700">
        <p className="text-xs text-slate-400 text-center italic">
          💡 Tip: Plan your activities on {dangerDay.highestDay.day}s to reduce spending
        </p>
      </div>
    </motion.div>
  );
};

export default DangerDayDetector;
