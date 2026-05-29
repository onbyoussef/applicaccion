import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const UnexpectedExpenseShield = ({ unexpectedExpenses, currencySymbol }) => {
  if (!unexpectedExpenses || unexpectedExpenses.count === 0) {
    return (
      <motion.div
        variants={itemVariants}
        className="bg-slate-800 rounded-lg p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🛡️</span>
          <h3 className="text-lg font-semibold text-white">Unexpected Expenses</h3>
        </div>
        <p className="text-sm text-emerald-400 text-center py-3">✓ All spending is on track!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800 rounded-lg p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          <h3 className="text-lg font-semibold text-white">Unexpected Expenses</h3>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-rose-400">{unexpectedExpenses.count}</p>
          <p className="text-xs text-slate-400">flagged</p>
        </div>
      </div>

      <div className="bg-rose-900/20 border border-rose-700/50 rounded-lg p-3">
        <p className="text-sm text-rose-200 font-semibold mb-1">Extra spending detected</p>
        <p className="text-lg font-bold text-rose-300">{currencySymbol}{Math.round(unexpectedExpenses.totalExtra)}</p>
        <p className="text-xs text-rose-400">above average for these categories</p>
      </div>

      <div className="space-y-2">
        {unexpectedExpenses.items.slice(0, 4).map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-200 truncate">{item.description}</p>
              <p className="text-xs text-slate-400">{item.category}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-rose-400 text-sm">+{currencySymbol}{Math.round(item.amountAboveAverage)}</p>
              <p className="text-xs text-slate-500">above avg</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UnexpectedExpenseShield;
