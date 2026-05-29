import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../utils/animations.js';
import { useBudget } from '../hooks/useBudget.js';
import { useDashboardLogic } from '../hooks/useDashboardLogic.js';
import Header from '../components/layout/Header.jsx';
import MetricCard from '../components/cards/MetricCard.jsx';
import HealthScoreCard from '../components/cards/HealthScoreCard.jsx';
import TransactionCard from '../components/cards/TransactionCard.jsx';
import DailyAreaChart from '../components/charts/DailyAreaChart.jsx';
import Button from '../components/common/Button.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { getGreeting } from '../utils/formatters.js';
import { STATUS_CONFIG } from '../constants/categories.js';

// Phase 2 Analytics Components
import DailyBudgetPulse from '../components/analytics/DailyBudgetPulse.jsx';
import SpendingDNA from '../components/analytics/SpendingDNA.jsx';
import NeedLevelSummary from '../components/analytics/NeedLevelSummary.jsx';
import CycleSummary from '../components/analytics/CycleSummary.jsx';
import ItemSummary from '../components/analytics/ItemSummary.jsx';
import DangerDayDetector from '../components/analytics/DangerDayDetector.jsx';
import SubscriptionRadar from '../components/analytics/SubscriptionRadar.jsx';
import UnexpectedExpenseShield from '../components/analytics/UnexpectedExpenseShield.jsx';
import OneOffExpenseTracker from '../components/analytics/OneOffExpenseTracker.jsx';
import ItemIntelligence from '../components/analytics/ItemIntelligence.jsx';
import EndOfMonthReportCard from '../components/analytics/EndOfMonthReportCard.jsx';
import SmartBudgetRecommender from '../components/analytics/SmartBudgetRecommender.jsx';
import SavingsSuggester from '../components/analytics/SavingsSuggester.jsx';
import DailyLogStreak from '../components/analytics/DailyLogStreak.jsx';

const Home = ({ onAddTransaction }) => {
  // Phase 2 deployment - all 15 analytics features active
  const { deleteTransaction } = useBudget();
  const {
    currencySymbol,
    remainingDays,
    currentMonthExpenses,
    currentMonthIncome,
    safeSpendToday,
    burnRate,
    budgetUsagePercent,
    status,
    healthScore,
    last7DaysData,
    recentTransactions,
    tip,
    // Phase 2 metrics
    spendingDNA,
    needLevels,
    cycleSummary,
    itemSummary,
    dangerDay,
    subscriptions,
    unexpectedExpenses,
    suggestions,
    reportCard,
    budgetRecommendation,
    logStreak,
  } = useDashboardLogic();

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
        {/* ===== TIER 1: Daily Budget Pulse ===== */}
        <DailyBudgetPulse 
          safeSpendToday={safeSpendToday} 
          currencySymbol={currencySymbol}
          remainingDays={remainingDays}
        />

        {/* ===== TIER 2: Key Metrics ===== */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-300">📊 Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              icon="📥"
              label="Income"
              value={currentMonthIncome}
              subtitle={currencySymbol}
              gradient="from-success-600 to-success-400"
            />
            <MetricCard
              icon="📤"
              label="Expenses"
              value={currentMonthExpenses}
              subtitle={currencySymbol}
              gradient="from-danger-600 to-danger-400"
            />
            <MetricCard
              icon="📉"
              label="Burn Rate"
              value={`${currencySymbol}${Math.round(burnRate * 100) / 100}/day`}
              subtitle="Avg Spending"
              gradient="from-warning-600 to-warning-400"
            />
            <motion.div
              variants={itemVariants}
              className={`${statusConfig.color} rounded-lg p-4 text-white flex flex-col items-center justify-center`}
            >
              <span className="text-2xl mb-1">{statusConfig.emoji}</span>
              <p className="text-xs font-medium">{statusConfig.label}</p>
              <p className="text-lg font-bold mt-1">{Math.round(budgetUsagePercent)}%</p>
            </motion.div>
          </div>
        </motion.div>

        {/* ===== TIER 3: Daily Log Streak ===== */}
        <DailyLogStreak streak={logStreak} />

        {/* ===== TIER 4: Spending Trends ===== */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-800 rounded-lg p-4"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Last 7 Days Trend</h3>
          <DailyAreaChart data={last7DaysData} />
        </motion.div>

        {/* ===== TIER 5: Spending Analysis ===== */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-300">🔬 Spending Analysis</h3>
          <SpendingDNA dna={spendingDNA} currencySymbol={currencySymbol} />
          <NeedLevelSummary needLevels={needLevels} currencySymbol={currencySymbol} />
        </motion.div>

        {/* ===== TIER 6: Cycle & Item Analysis ===== */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-300">📈 Spending Cycles</h3>
          <CycleSummary cycleSummary={cycleSummary} currencySymbol={currencySymbol} />
          <OneOffExpenseTracker cycleSummary={cycleSummary} currencySymbol={currencySymbol} />
        </motion.div>

        {/* ===== TIER 7: Item Intelligence ===== */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-300">📦 Spending Breakdown</h3>
          <ItemSummary items={itemSummary} currencySymbol={currencySymbol} />
          <ItemIntelligence itemSummary={itemSummary} currencySymbol={currencySymbol} />
        </motion.div>

        {/* ===== TIER 8: Risk Analysis ===== */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-300">⚠️ Risk Analysis</h3>
          <DangerDayDetector dangerDay={dangerDay} currencySymbol={currencySymbol} />
          <UnexpectedExpenseShield unexpectedExpenses={unexpectedExpenses} currencySymbol={currencySymbol} />
          <SubscriptionRadar subscriptions={subscriptions} currencySymbol={currencySymbol} />
        </motion.div>

        {/* ===== TIER 9: Recommendations ===== */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-300">💡 Recommendations</h3>
          <SavingsSuggester suggestions={suggestions} currencySymbol={currencySymbol} />
          <SmartBudgetRecommender recommendation={budgetRecommendation} currencySymbol={currencySymbol} />
        </motion.div>

        {/* ===== TIER 10: Month Report Card ===== */}
        <EndOfMonthReportCard reportCard={reportCard} currencySymbol={currencySymbol} />

        {/* ===== TIER 11: Health & Tips ===== */}
        <HealthScoreCard score={healthScore} label="Financial Health" />

        <motion.div
          variants={itemVariants}
          className="bg-slate-800 rounded-lg p-4 border-l-4 border-primary-500"
        >
          <p className="text-sm text-slate-400 mb-1">💡 Today's Insight</p>
          <p className="text-white font-medium">{tip}</p>
        </motion.div>

        {/* ===== TIER 12: Recent Transactions ===== */}
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

        {/* ===== ACTION BUTTONS ===== */}
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
