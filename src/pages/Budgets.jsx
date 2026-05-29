import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '../hooks/useBudget.js';
import { useBudgetLogic } from '../hooks/useBudgetLogic.js';
import { formatCurrency } from '../utils/formatters.js';
import { containerVariants, itemVariants } from '../utils/animations.js';
import Header from '../components/layout/Header.jsx';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';

const BudgetPage = () => {
  const { budget, setBudget } = useBudget();
  const { currentMonthExpenses, remainingBudget, remainingDays, budgetUsagePercent, safeSpendToday } = useBudgetLogic();
  const [totalBudget, setTotalBudget] = useState(budget.total.toString());
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveBudget = () => {
    const newBudget = {
      total: parseFloat(totalBudget) || 0,
    };
    setBudget(newBudget);
    setIsEditing(false);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-24"
    >
      <Header 
        title="🎯 Budgets" 
        subtitle={`${remainingDays} days left this month`}
      />

      <div className="px-4 py-4 space-y-6">
        {/* Alert if Over Budget */}
        {budgetUsagePercent > 100 && (
          <motion.div 
            variants={itemVariants}
            className="bg-rose-50 dark:bg-rose-950 border-2 border-rose-200 dark:border-rose-800 rounded-lg p-4 animate-pulse"
          >
            <p className="text-sm font-bold text-rose-700 dark:text-rose-400">⚠️ Over Budget Alert</p>
            <p className="text-xs text-rose-600 dark:text-rose-300 mt-1">
              You've exceeded your monthly budget by {formatCurrency(currentMonthExpenses - budget.total)}
            </p>
          </motion.div>
        )}

        {/* Monthly Summary */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Budget</p>
              <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{formatCurrency(budget.total)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Spent</p>
              <p className="text-lg font-bold text-rose-600 dark:text-rose-400">{formatCurrency(currentMonthExpenses)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Remaining</p>
              <p className={`text-lg font-bold ${remainingBudget >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {formatCurrency(Math.abs(remainingBudget))}
              </p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-4">
            <div className="h-3 bg-white/30 dark:bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${
                  budgetUsagePercent >= 100 ? 'bg-rose-500' :
                  budgetUsagePercent >= 90 ? 'bg-amber-500' :
                  'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(budgetUsagePercent, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 text-center">
              {budgetUsagePercent.toFixed(1)}% of budget used
            </p>
          </div>
        </motion.div>

        {/* Safe Spend Today */}
        <motion.div variants={itemVariants} className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">💰 Safe Spend Today</p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{formatCurrency(Math.max(safeSpendToday, 0))}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-2">
            ✓ You can safely spend this amount today to stay within your monthly budget
          </p>
        </motion.div>

        {/* Edit Budget Button */}
        <motion.div variants={itemVariants}>
          <Button 
            variant={isEditing ? "danger" : "primary"}
            onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
            className="w-full"
          >
            {isEditing ? '✕ Cancel' : '✎ Edit Budget'}
          </Button>
        </motion.div>

        {/* Edit Total Budget Section */}
        {isEditing && (
          <motion.div variants={itemVariants} className="bg-slate-800 rounded-lg p-4">
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Monthly Budget Total ({formatCurrency(budget.total)})
            </label>
            <div className="flex gap-2">
              <Input 
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
                placeholder="Enter budget amount"
                className="flex-1"
              />
              <Button 
                variant="success"
                onClick={handleSaveBudget}
              >
                Save
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              💡 This is your total monthly budget. Track transactions by category to see spending breakdown.
            </p>
          </motion.div>
        )}

        {/* Budget Info */}
        <motion.div variants={itemVariants} className="bg-slate-800 rounded-lg p-4 border-l-4 border-primary-500">
          <p className="text-sm text-slate-300 font-medium mb-2">📊 How it works:</p>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>✓ Set your total monthly budget above</li>
            <li>✓ Add transactions to track spending by category</li>
            <li>✓ Safe Spend Today updates automatically</li>
            <li>✓ Visual progress bar shows your budget usage</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BudgetPage;
