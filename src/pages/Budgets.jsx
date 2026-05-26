import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '../hooks/useBudget.js';
import { useBudgetLogic } from '../hooks/useBudgetLogic.js';
import { formatCurrency } from '../utils/formatters.js';
import { CATEGORIES } from '../constants/categories.js';
import { containerVariants, itemVariants } from '../utils/animations.js';
import Header from '../components/layout/Header.jsx';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';

const BudgetPage = () => {
  const { budget, setBudget } = useBudget();
  const { currentMonthExpenses, categoryTotals, remainingBudget, remainingDays, budgetUsagePercent, safeSpendToday } = useBudgetLogic();
  const [totalBudget, setTotalBudget] = useState(budget.total.toString());
  const [categoryBudgets, setCategoryBudgets] = useState(budget.byCategory || {});
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
    return Object.entries(CATEGORIES)
      .filter(([_, cat]) => cat.type !== 'income')
      .map(([key, cat]) => ({
        key,
        ...cat,
        spent: categoryTotals[key] || 0,
        budgeted: categoryBudgets[key] || (budget.total * 0.1), // Default 10% per category
      }))
      .map(cat => ({
        ...cat,
        remaining: cat.budgeted - cat.spent,
        usagePercent: (cat.spent / cat.budgeted * 100).toFixed(1),
        status: cat.spent > cat.budgeted ? 'over' : cat.spent >= cat.budgeted * 0.9 ? 'warning' : 'ok',
      }));
  }, [categoryTotals, categoryBudgets, budget.total]);

  const handleSaveBudget = () => {
    const newBudget = {
      total: parseFloat(totalBudget) || 0,
      byCategory: categoryBudgets,
    };
    setBudget(newBudget);
    setIsEditing(false);
  };

  const updateCategoryBudget = (category, amount) => {
    setCategoryBudgets(prev => ({
      ...prev,
      [category]: parseFloat(amount) || 0,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ok':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-amber-500';
      case 'over':
        return 'bg-rose-500';
      default:
        return 'bg-slate-300';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'ok':
        return '🟢';
      case 'warning':
        return '🟡';
      case 'over':
        return '🔴';
      default:
        return '⚪';
    }
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
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Safe Spend Today</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(Math.max(safeSpendToday, 0))}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-2">
            You can spend {formatCurrency(Math.max(safeSpendToday, 0))} today and stay on track
          </p>
        </motion.div>

        {/* Edit Budget Button */}
        <motion.div variants={itemVariants}>
          <Button 
            variant={isEditing ? "danger" : "primary"}
            onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
            className="w-full"
          >
            {isEditing ? '✕ Cancel Editing' : '✎ Edit Budget'}
          </Button>
        </motion.div>

        {/* Edit Total Budget */}
        {isEditing && (
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Monthly Budget Total
            </label>
            <Input 
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              placeholder="0.00"
            />
          </motion.div>
        )}

        {/* Category Budgets */}
        <motion.div variants={containerVariants} className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Budget by Category</h3>
          
          {expenseCategories.map((cat) => (
            <motion.div
              key={cat.key}
              variants={itemVariants}
              className="bg-white dark:bg-slate-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{cat.emoji}</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{cat.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {getStatusEmoji(cat.status)} {cat.usagePercent}% used
                    </p>
                  </div>
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-right">
                  <div className="text-xs text-slate-500 dark:text-slate-400">{formatCurrency(cat.spent)}</div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">of {formatCurrency(cat.budgeted)}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full transition-all ${getStatusColor(cat.status)}`}
                  style={{ width: `${Math.min(parseFloat(cat.usagePercent), 100)}%` }}
                />
              </div>

              {/* Edit Mode */}
              {isEditing && (
                <Input 
                  type="number"
                  value={categoryBudgets[cat.key]?.toString() || cat.budgeted.toString()}
                  onChange={(e) => updateCategoryBudget(cat.key, e.target.value)}
                  placeholder="0.00"
                  className="mt-2"
                />
              )}

              {/* Remaining/Over indicator */}
              {!isEditing && (
                <p className={`text-xs font-semibold mt-2 ${
                  cat.remaining >= 0 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {cat.remaining >= 0 ? '✓ ' : '✗ '}{formatCurrency(Math.abs(cat.remaining))} {cat.remaining >= 0 ? 'remaining' : 'over'}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Save Button */}
        {isEditing && (
          <motion.div variants={itemVariants}>
            <Button 
              variant="success"
              onClick={handleSaveBudget}
              className="w-full"
            >
              ✓ Save Budget
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BudgetPage;
