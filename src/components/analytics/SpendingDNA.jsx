import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const SpendingDNA = ({ dna, currencySymbol }) => {
  const colors = {
    essential: 'from-red-500 to-red-400',
    optional: 'from-amber-500 to-amber-400',
    unexpected: 'from-purple-500 to-purple-400',
  };

  const icons = {
    essential: '🏠',
    optional: '🎮',
    unexpected: '⚡',
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-800 rounded-lg p-4 space-y-4"
    >
      <h3 className="text-lg font-semibold text-white">🧬 Spending DNA</h3>

      <div className="space-y-3">
        {['essential', 'optional', 'unexpected'].map(type => (
          <div key={type}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{icons[type]}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-200 capitalize">
                    {type === 'essential' ? 'Essential' : type === 'optional' ? 'Optional' : 'Unexpected'}
                  </p>
                  <p className="text-xs text-slate-400">{currencySymbol}{Math.round(dna[type])}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{Math.round(dna.percentages[type])}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${colors[type]}`}
                initial={{ width: 0 }}
                animate={{ width: `${dna.percentages[type]}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-700">
        <p className="text-xs text-slate-400 text-center">
          Total: {currencySymbol}{Math.round(dna.total)}
        </p>
      </div>
    </motion.div>
  );
};

export default SpendingDNA;
