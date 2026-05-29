import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const ItemSummary = ({ items, currencySymbol }) => {
  const [expanded, setExpanded] = useState(false);

  const displayItems = expanded ? items : items.slice(0, 5);

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800 rounded-lg p-4 space-y-3"
    >
      <h3 className="text-lg font-semibold text-white">📦 Top Expenses</h3>

      <div className="space-y-2">
        {displayItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition"
          >
            <div className="flex-1">
              <p className="font-semibold text-slate-200 text-sm truncate">{item.name}</p>
              <p className="text-xs text-slate-400">
                {item.count}x • Avg: {currencySymbol}{Math.round(item.average)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-white">{currencySymbol}{Math.round(item.total)}</p>
              <p className="text-xs text-slate-400">{item.count} times</p>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2 text-sm text-primary-400 hover:text-primary-300 font-semibold transition"
        >
          {expanded ? '↑ Show Less' : `↓ Show All ${items.length} Items`}
        </button>
      )}
    </motion.div>
  );
};

export default ItemSummary;
