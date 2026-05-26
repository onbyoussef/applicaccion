import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '../hooks/useBudget.js';
import { useTheme } from '../hooks/useTheme.js';
import { storageService } from '../services/storageService.js';
import { containerVariants, itemVariants } from '../utils/animations.js';
import Header from '../components/layout/Header.jsx';
import Button from '../components/common/Button.jsx';

const Settings = () => {
  const { settings, setCurrency, clearAllData, hasDemoData } = useBudget();
  const { theme, setTheme } = useTheme();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showConfirmDeleteDemo, setShowConfirmDeleteDemo] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExportData = () => {
    try {
      const data = storageService.exportData();
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `smart-budget-pro-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleClearAllData = () => {
    clearAllData();
    setShowConfirmClear(false);
  };

  const handleDeleteDemoData = () => {
    storageService.setHasDemoData(false);
    setShowConfirmDeleteDemo(false);
  };

  const currencyOptions = [
    { code: 'EUR', symbol: '€', label: 'Euro (€)' },
    { code: 'USD', symbol: '$', label: 'US Dollar ($)' },
    { code: 'GBP', symbol: '£', label: 'British Pound (£)' },
    { code: 'MAD', symbol: 'د.م.', label: 'Moroccan Dirham (د.م.)' },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-24"
    >
      <Header 
        title="⚙️ Settings" 
        subtitle="Customize your experience"
      />

      <div className="px-4 py-4 space-y-6">
        {/* App Info */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">About</p>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">App Name</span>
              <span className="font-semibold text-slate-900 dark:text-white">Smart Budget Pro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Version</span>
              <span className="font-semibold text-slate-900 dark:text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Tagline</span>
              <span className="font-semibold text-slate-900 dark:text-white text-right">Track every euro.</span>
            </div>
          </div>
        </motion.div>

        {/* Currency Selection */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Currency</p>
          <div className="grid grid-cols-2 gap-2">
            {currencyOptions.map((curr) => (
              <button
                key={curr.code}
                onClick={() => setCurrency(curr.code)}
                className={`py-3 px-3 rounded-lg font-medium text-sm transition-all text-center ${
                  settings.currency === curr.code
                    ? 'bg-primary-500 text-white ring-2 ring-primary-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div>{curr.symbol}</div>
                <div className="text-xs mt-1">{curr.code}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Theme Selection */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Theme</p>
          <div className="flex gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                theme === 'light'
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              ☀️ Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              🌙 Dark
            </button>
          </div>
        </motion.div>

        {/* Export Data */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Data Management</p>
          <div className="space-y-3">
            <Button 
              variant="primary"
              onClick={handleExportData}
              className="w-full"
            >
              📥 Export Data as JSON
            </Button>
            {exportSuccess && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 text-center">✓ Data exported successfully!</p>
            )}
          </div>
        </motion.div>

        {/* Delete Demo Data */}
        {hasDemoData && (
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Demo Data</p>
            
            {!showConfirmDeleteDemo ? (
              <Button 
                variant="ghost"
                onClick={() => setShowConfirmDeleteDemo(true)}
                className="w-full"
              >
                🗑️ Delete Demo Data
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-slate-700 dark:text-slate-300">Are you sure? This will remove all demo transactions.</p>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost"
                    onClick={() => setShowConfirmDeleteDemo(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="danger"
                    onClick={handleDeleteDemoData}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Clear All Data */}
        <motion.div variants={itemVariants} className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-lg p-4">
          <p className="text-sm font-semibold text-rose-700 dark:text-rose-400 mb-3">⚠️ Danger Zone</p>
          
          {!showConfirmClear ? (
            <Button 
              variant="danger"
              onClick={() => setShowConfirmClear(true)}
              className="w-full"
            >
              🔴 Clear All Data
            </Button>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-rose-700 dark:text-rose-400">This action cannot be undone. All your data will be permanently deleted.</p>
              <div className="flex gap-2">
                <Button 
                  variant="ghost"
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="danger"
                  onClick={handleClearAllData}
                  className="flex-1"
                >
                  Delete Everything
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div variants={itemVariants} className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
          <p className="text-xs text-blue-700 dark:text-blue-400">
            💡 All your data is stored locally on your device. It's never sent to any server.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
