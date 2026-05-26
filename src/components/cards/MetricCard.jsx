import React from 'react';
import { motion } from 'framer-motion';
import { scaleInVariants } from '../../utils/animations.js';
import { useCountUp } from '../../hooks/useCountUp.js';

const MetricCard = ({ 
  icon, 
  label, 
  value, 
  subtitle = '', 
  gradient = 'from-primary-600 to-primary-400',
  animated = true 
}) => {
  const countUp = useCountUp(typeof value === 'number' ? value : 0);
  const displayValue = animated && typeof value === 'number' ? countUp : value;

  return (
    <motion.div
      variants={scaleInVariants}
      className={`bg-gradient-to-br ${gradient} rounded-lg p-4 text-white relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      <div className="relative z-10">
        <div className="text-3xl mb-2">{icon}</div>
        <p className="text-sm font-medium text-white/80">{label}</p>
        <p className="text-2xl font-bold mt-1">{displayValue}</p>
        {subtitle && <p className="text-xs text-white/70 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

export default MetricCard;
