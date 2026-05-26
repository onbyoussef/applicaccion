import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';
import { formatCurrency, formatDate } from '../../utils/formatters.js';
import { CATEGORIES } from '../../constants/categories.js';
import Badge from '../common/Badge.jsx';

const TransactionCard = ({ transaction, onDelete, currency = '€' }) => {
  const category = CATEGORIES[transaction.category];
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-700 dark:bg-slate-700 rounded-lg p-4 flex items-center justify-between hover:bg-slate-600 dark:hover:bg-slate-600 transition-colors"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="text-2xl">{category?.emoji || '💰'}</div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white truncate">{transaction.description}</p>
          <p className="text-xs text-slate-400">{formatDate(transaction.date)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className={`font-semibold ${isIncome ? 'text-success-400' : 'text-slate-200'}`}>
            {isIncome ? '↑' : '↓'} {formatCurrency(transaction.amount, currency)}
          </p>
          <div className="flex gap-1 mt-1">
            <Badge variant="slate" className="text-xs px-2 py-0.5">
              {transaction.needLevel === 'essential' ? '🟢' : transaction.needLevel === 'optional' ? '🔵' : '🟣'}
            </Badge>
          </div>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(transaction.id)}
            className="text-slate-400 hover:text-danger-500 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default TransactionCard;
