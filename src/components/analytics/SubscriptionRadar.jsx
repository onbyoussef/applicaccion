import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const SubscriptionRadar = ({ subscriptions, currencySymbol }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800 rounded-lg p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">📡 Subscription Radar</h3>
        <div className="text-right">
          <p className="text-sm font-bold text-warning-400">{subscriptions.count}</p>
          <p className="text-xs text-slate-400">detected</p>
        </div>
      </div>

      {subscriptions.count > 0 ? (
        <>
          <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-3 space-y-2">
            <p className="text-sm text-amber-200">
              <span className="font-bold text-amber-100">{currencySymbol}{Math.round(subscriptions.monthlyTotal)}</span>/month
            </p>
            <p className="text-xs text-amber-300">
              <span className="font-semibold">{currencySymbol}{Math.round(subscriptions.yearlyTotal)}</span> per year
            </p>
          </div>

          <div className="space-y-2">
            {subscriptions.subscriptions.slice(0, 5).map((sub, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200 truncate">{sub.name}</p>
                  <p className="text-xs text-slate-400">{sub.count}x • {sub.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white text-sm">{currencySymbol}{Math.round(sub.monthly)}</p>
                  <p className="text-xs text-slate-500">monthly</p>
                </div>
              </div>
            ))}
          </div>

          {subscriptions.subscriptions.length > 5 && (
            <p className="text-xs text-slate-400 text-center">
              +{subscriptions.subscriptions.length - 5} more subscriptions
            </p>
          )}

          <div className="pt-3 border-t border-slate-700">
            <p className="text-xs text-slate-400 text-center italic">
              💡 Review unused subscriptions - potential yearly savings: {currencySymbol}{Math.round(subscriptions.yearlyTotal * 0.2)}
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-4 text-slate-400">
          <p className="text-sm">✓ No recurring subscriptions detected</p>
        </div>
      )}
    </motion.div>
  );
};

export default SubscriptionRadar;
