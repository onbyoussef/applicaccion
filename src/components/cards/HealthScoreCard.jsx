import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const ProgressRing = ({ percentage = 0, size = 100, color = 'text-primary-500' }) => {
  const radius = (size - 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={size} width={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="text-slate-600 dark:text-slate-600"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className={color}
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
        strokeLinecap="round"
      />
    </svg>
  );
};

const HealthScoreCard = ({ score = 85, label = 'Financial Health' }) => {
  let color = 'text-success-500';
  let bgColor = 'from-success-600 to-success-400';
  
  if (score < 60) {
    color = 'text-danger-500';
    bgColor = 'from-danger-600 to-danger-400';
  } else if (score < 75) {
    color = 'text-warning-500';
    bgColor = 'from-warning-600 to-warning-400';
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`bg-gradient-to-br ${bgColor} rounded-lg p-6 text-white flex flex-col items-center justify-center`}
    >
      <p className="text-sm font-medium text-white/80 mb-4">{label}</p>
      <div className="relative">
        <ProgressRing percentage={score} size={100} color={color} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{score}%</span>
        </div>
      </div>
      <p className="text-xs text-white/70 mt-4">
        {score >= 85 ? '🏆 Excellent' : score >= 70 ? '😊 Good' : score >= 50 ? '😐 Fair' : '😬 Needs Work'}
      </p>
    </motion.div>
  );
};

export default HealthScoreCard;
