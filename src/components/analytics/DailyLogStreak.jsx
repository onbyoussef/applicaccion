import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../utils/animations.js';

const DailyLogStreak = ({ streak }) => {

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-2 gap-4"
    >
      {/* Current Streak */}
      <div className="bg-gradient-to-br from-rose-600 to-rose-500 rounded-lg p-4 text-white">
        <p className="text-sm text-rose-100 mb-2">Current Streak</p>
        <p className="text-4xl font-black">{streak.currentStreak}</p>
        <p className="text-xs text-rose-100 mt-1">days 🔥</p>
        {streak.isOnFire && (
          <p className="text-xs font-bold text-yellow-200 mt-2 animate-pulse">🎯 Keep it going!</p>
        )}
      </div>

      {/* Longest Streak */}
      <div className="bg-gradient-to-br from-amber-600 to-amber-500 rounded-lg p-4 text-white">
        <p className="text-sm text-amber-100 mb-2">Longest Streak</p>
        <p className="text-4xl font-black">{streak.longestStreak}</p>
        <p className="text-xs text-amber-100 mt-1">days 👑</p>
        <p className="text-xs font-bold text-white mt-2">Personal Record</p>
      </div>
    </motion.div>
  );
};

export default DailyLogStreak;
