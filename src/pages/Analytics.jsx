import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useBudget } from '../hooks/useBudget.js';
import { useBudgetLogic } from '../hooks/useBudgetLogic.js';
import { formatCurrency, formatPercentage } from '../utils/formatters.js';
import { getCategoryDistribution, getNeedLevelDistribution, getCycleDistribution } from '../utils/calculations.js';
import { CATEGORIES } from '../constants/categories.js';
import { getIconComponent } from '../utils/iconMapper.js';
import { containerVariants, itemVariants } from '../utils/animations.js';
import Header from '../components/layout/Header.jsx';
import EmptyState from '../components/common/EmptyState.jsx';

const Analytics = () => {
  const { transactions } = useBudget();
  const { currentMonthExpenses, categoryTotals, budgetUsagePercent } = useBudgetLogic();

  const categoryData = useMemo(() => {
    const distribution = getCategoryDistribution(transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth()));
    return Object.entries(distribution)
      .map(([category, percentage]) => ({
        name: CATEGORIES[category]?.label || category,
        value: parseFloat(percentage),
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const needLevelData = useMemo(() => {
    const distribution = getNeedLevelDistribution(transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth()));
    return Object.entries(distribution)
      .map(([needLevel, percentage]) => ({
        name: needLevel.charAt(0).toUpperCase() + needLevel.slice(1),
        value: parseFloat(percentage),
      }));
  }, [transactions]);

  const cycleData = useMemo(() => {
    const distribution = getCycleDistribution(transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth()));
    return Object.entries(distribution)
      .map(([cycle, percentage]) => ({
        name: cycle.charAt(0).toUpperCase() + cycle.slice(1),
        value: parseFloat(percentage),
      }));
  }, [transactions]);

  const topCategories = useMemo(() => {
    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category: CATEGORIES[category]?.label || category,
        icon: CATEGORIES[category]?.icon || 'Gift',
        amount,
        percentage: (amount / currentMonthExpenses * 100).toFixed(1),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }, [categoryTotals, currentMonthExpenses]);

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#F43F5E', '#8B5CF6', '#EC4899'];

  if (transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth()).length === 0) {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pb-24"
      >
        <Header title="📊 Analytics" subtitle="Your spending insights" />
        <div className="px-4 py-8">
          <EmptyState
            icon="📈"
            title="No expense data yet"
            description="Start adding transactions to see your analytics"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-24"
    >
      <Header title="📊 Analytics" subtitle="Your spending insights" />

      <div className="px-4 py-4 space-y-6">
        {/* Top 3 Categories */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🏆 Top Spending Categories</h3>
          <div className="space-y-3">
            {topCategories.map((cat, idx) => {
              const IconComponent = getIconComponent(cat.icon);
              return (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-primary-400">
                      <IconComponent size={24} className="stroke-2" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{cat.category}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{cat.percentage}% of budget</p>
                    </div>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(cat.amount)}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Budget Usage */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 rounded-lg p-4 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Budget Usage</p>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-2">{formatPercentage(budgetUsagePercent)}</p>
          <div className="mt-3 h-2 bg-white dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all ${
                budgetUsagePercent >= 100 ? 'bg-rose-500' :
                budgetUsagePercent >= 90 ? 'bg-amber-500' :
                'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(budgetUsagePercent, 100)}%` }}
            />
          </div>
        </motion.div>

        {/* Category Distribution Chart */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">💰 Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Need Level Distribution */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">📍 Spending by Need Level</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={needLevelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Cycle Distribution */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔄 Spending by Cycle</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cycleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Summary Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Expenses</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white mt-2">{formatCurrency(currentMonthExpenses)}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Transactions</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white mt-2">{transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth()).length}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
