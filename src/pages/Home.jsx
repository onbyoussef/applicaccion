import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../utils/animations.js';
import { useBudget } from '../hooks/useBudget.js';
import { useBudgetLogic } from '../hooks/useBudgetLogic.js';
import { useTransaction } from '../hooks/useTransaction.js';
import Header from '../components/layout/Header.jsx';
import MetricCard from '../components/cards/MetricCard.jsx';
import HealthScoreCard from '../components/cards/HealthScoreCard.jsx';
import TransactionCard from '../components/cards/TransactionCard.jsx';
import DailyAreaChart from '../components/charts/DailyAreaChart.jsx';
import Button from '../components/common/Button.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { 
  formatCurrency, 
  getGreeting 
} from '../utils/formatters.js';
import { STATUS_CONFIG, MOTIVATIONAL_TIPS } from '../constants/categories.js';
import { 
  getTransactionsForLastNDays 
} from '../utils/filters.js';
import { getDateFromDaysAgo } from '../utils/calculations.js';

const Home = ({ onAddTransaction }) => {
  const { settings, deleteTransaction } = useBudget();
  const { getRecentTransactions, getCurrentMonthTransactions } = useTransaction();
  const {
    currentMonthExpenses,
    currentMonthIncome,
    safeSpendToday,
    burnRate,
    forecast,
    budgetUsagePercent,
    status,
    healthScore,
  } = useBudgetLogic();

  const currency = settings?.currency || 'EUR';
  const currencySymbol = { EUR: '€', USD: '$', GBP: '£', MAD: 'د.م.' }[currency] || '€';

  // Get spending data for last 7 days
  const last7DaysTransactions = useMemo(() => {
    const transactions = getTransactionsForLastNDays(getCurrentMonthTransactions(), 7);
    const dailyData = {};

    for (let i = 6; i >= 0; i--) {
      const date = getDateFromDaysAgo(i);
      dailyData[date] = 0;
    }

    transactions.forEach(tx => {
      if (tx.type === 'expense' && dailyData.hasOwnProperty(tx.date)) {
        dailyData[tx.date] += tx.amount;
      }
    });

    return Object.entries(dailyData).map(([date, amount]) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      amount: Math.round(amount * 100) / 100,
      date,
    }));
  }, [getCurrentMonthTransactions]);

  const recentTransactions = getRecentTransactions(5);
  const randomTip = MOTIVATIONAL_TIPS[Math.floor(Math.random() * MOTIVATIONAL_TIPS.length)];
  const statusConfig = STATUS_CONFIG[status];

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-900">
      <Header 
        title={`${getGreeting()}! 👋`} 
        subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        showThemeToggle={false}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-6 space-y-6 pb-32"
      >
        {/* Total Balance Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium mb-2">Total Balance</p>
            <h2 className="text-4xl font-bold mb-2">{formatCurrency(currentMonthIncome - currentMonthExpenses, currencySymbol)}</h2>
            <p className="text-sm text-white/70">Income: {formatCurrency(currentMonthIncome, currencySymbol)}</p>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            icon="💰"
            label="Safe Spend Today"
            value={Math.round(safeSpendToday * 100) / 100}
            subtitle={currencySymbol}
            gradient="from-success-600 to-success-400"
          />
          <MetricCard
            icon="📉"
            label="Burn Rate"
            value={`${currencySymbol}${Math.round(burnRate * 100) / 100}/day`}
            subtitle="Avg Spending"
            gradient="from-warning-600 to-warning-400"
          />
          <MetricCard
            icon="📈"
            label="Forecast"
            value={formatCurrency(forecast, currencySymbol)}
            subtitle="End of month"
            gradient="from-slate-600 to-slate-500"
          />
          <motion.div
            variants={itemVariants}
            className={`${statusConfig.color} rounded-lg p-4 text-white flex flex-col items-center justify-center`}
          >
            <span className="text-3xl mb-2">{statusConfig.emoji}</span>
            <p className="text-xs font-medium">{statusConfig.label}</p>
            <p className="text-lg font-bold mt-1">{Math.round(budgetUsagePercent)}%</p>
          </motion.div>
        </div>

        {/* Income vs Expenses */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            variants={itemVariants}
            className="bg-slate-800 rounded-lg p-4"
          >
            <div className="text-2xl mb-2">📥</div>
            <p className="text-sm text-slate-400">Income</p>
            <p className="text-xl font-bold text-success-400 mt-1">{formatCurrency(currentMonthIncome, currencySymbol)}</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-slate-800 rounded-lg p-4"
          >
            <div className="text-2xl mb-2">📤</div>
            <p className="text-sm text-slate-400">Expenses</p>
            <p className="text-xl font-bold text-danger-400 mt-1">{formatCurrency(currentMonthExpenses, currencySymbol)}</p>
          </motion.div>
        </div>

        {/* Spending Trend Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-800 rounded-lg p-4"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Last 7 Days</h3>
          <DailyAreaChart data={last7DaysTransactions} />
        </motion.div>

        {/* Health Score */}
        <HealthScoreCard score={healthScore} label="Financial Health" />

        {/* Motivational Tip */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-800 rounded-lg p-4 border-l-4 border-primary-500"
        >
          <p className="text-sm text-slate-400 mb-1">💡 Today's Insight</p>
          <p className="text-white font-medium">{randomTip}</p>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
            <button onClick={onAddTransaction} className="text-primary-400 text-sm hover:text-primary-300 transition font-semibold">View All →</button>
          </div>

          {recentTransactions.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              {recentTransactions.map(tx => (
                <TransactionCard
                  key={tx.id}
                  transaction={tx}
                  currency={currencySymbol}
                  onDelete={deleteTransaction}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState
              icon="📭"
              title="No Transactions"
              description="Add your first transaction to get started"
            />
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-4 pt-4"
        >
          <Button variant="primary" size="lg" className="w-full" onClick={onAddTransaction}>
            ➕ Add Transaction
          </Button>
          <Button variant="secondary" size="lg" className="w-full">
            📊 View Details
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
