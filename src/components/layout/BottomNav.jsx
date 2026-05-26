import React from 'react';
import { motion } from 'framer-motion';

const BottomNav = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', emoji: '🏠' },
    { id: 'transactions', label: 'Transactions', emoji: '💸' },
    { id: 'analytics', label: 'Analytics', emoji: '📊' },
    { id: 'budgets', label: 'Budgets', emoji: '🎯' },
    { id: 'settings', label: 'Settings', emoji: '⚙️' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 dark:bg-slate-800 border-t border-slate-700 dark:border-slate-700">
      <nav className="flex items-center justify-around h-20 max-w-md mx-auto lg:max-w-4xl">
        {navItems.map((item) => {
          const isActive = activePage === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center w-16 h-16 transition-all duration-200 ${
                isActive
                  ? 'text-primary-500'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <motion.div
                initial={false}
                animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                className="text-2xl mb-1"
              >
                {item.emoji}
              </motion.div>
              <span className={`text-xs font-medium ${
                isActive ? 'text-primary-500' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-0 w-12 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-t"
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
