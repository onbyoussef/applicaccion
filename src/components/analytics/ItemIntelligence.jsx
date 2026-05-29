import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const ItemIntelligence = ({ itemSummary, currencySymbol }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const selectedData = selectedItem ? itemSummary.find(item => item.name === selectedItem) : null;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800 rounded-lg p-4 space-y-4"
    >
      <h3 className="text-lg font-semibold text-white">🔍 Item Intelligence</h3>

      {/* Item selector */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-300">Top 5 spending items:</p>
        <div className="space-y-1">
          {itemSummary.slice(0, 5).map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedItem(selectedItem === item.name ? null : item.name)}
              className={`w-full text-left p-2 rounded transition text-sm ${
                selectedItem === item.name
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-700/50 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="truncate">{item.name}</span>
                <span className="font-bold whitespace-nowrap ml-2">{item.count}x</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Item details */}
      {selectedData && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-700/50 rounded-lg p-3 space-y-2 border border-primary-600/30"
        >
          <h4 className="font-bold text-white">{selectedData.name}</h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-800 p-2 rounded">
              <p className="text-slate-400">Total</p>
              <p className="font-bold text-white">{currencySymbol}{Math.round(selectedData.total)}</p>
            </div>
            <div className="bg-slate-800 p-2 rounded">
              <p className="text-slate-400">Count</p>
              <p className="font-bold text-white">{selectedData.count}x</p>
            </div>
            <div className="bg-slate-800 p-2 rounded">
              <p className="text-slate-400">Average</p>
              <p className="font-bold text-white">{currencySymbol}{Math.round(selectedData.average)}</p>
            </div>
            <div className="bg-slate-800 p-2 rounded">
              <p className="text-slate-400">Range</p>
              <p className="font-bold text-white">
                {currencySymbol}{Math.round(selectedData.min)} - {currencySymbol}{Math.round(selectedData.max)}
              </p>
            </div>
          </div>

          {/* Trend analysis */}
          <div className="pt-2 border-t border-slate-600">
            <p className="text-xs font-semibold text-slate-300 mb-1">Analysis:</p>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>✓ {selectedData.count} purchases this month</li>
              <li>✓ Average per purchase: {currencySymbol}{Math.round(selectedData.average)}</li>
              <li>✓ Frequency: Every {Math.round(30 / selectedData.count)} days</li>
              {selectedData.max > selectedData.average * 1.5 && (
                <li className="text-amber-400">⚠️ Last purchase was {Math.round(((selectedData.max - selectedData.average) / selectedData.average) * 100)}% above average</li>
              )}
            </ul>
          </div>
        </motion.div>
      )}

      {!selectedData && (
        <p className="text-xs text-slate-400 text-center py-2">
          Click an item to see detailed spending patterns
        </p>
      )}
    </motion.div>
  );
};

export default ItemIntelligence;
