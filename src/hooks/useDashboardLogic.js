import { useMemo } from 'react';
import { useBudget } from './useBudget.js';
import { useTransaction } from './useTransaction.js';
import { useBudgetLogic } from './useBudgetLogic.js';
import { getDateFromDaysAgo } from '../utils/calculations.js';
import { getTransactionsForLastNDays, getLastNTransactions } from '../utils/filters.js';
import { MOTIVATIONAL_TIPS } from '../constants/categories.js';
import {
  calculateSpendingDNA,
  calculateNeedLevelSummary,
  calculateCycleSummary,
  calculateItemSummary,
  calculateDangerDay,
  calculateSubscriptions,
  calculateUnexpectedExpenses,
  calculateSavingsSuggestions,
  calculateReportCard,
  calculateSmartBudgetRecommendation,
  calculateLogStreak,
} from '../utils/analyticsMetrics.js';

const pickMotivationalTip = ({ status, budgetUsagePercent }) => {
  if (status === 'OVERSPENDING') return '🚨 You’re overspending this month — pick one category and set a “no-spend” rule for 48 hours.';
  if (status === 'WARNING') return '⚠️ You’re close to your budget — try swapping one optional purchase today to stay on track.';
  if (budgetUsagePercent < 60) return '🎉 You’re doing great — consider moving the extra room into savings automatically.';
  return MOTIVATIONAL_TIPS[Math.floor(Math.random() * MOTIVATIONAL_TIPS.length)];
};

export const useDashboardLogic = () => {
  const { settings, budget, transactions } = useBudget();
  const { getCurrentMonthTransactions } = useTransaction();
  const {
    currentMonthExpenses,
    currentMonthIncome,
    remainingBudget,
    safeSpendToday,
    burnRate,
    forecast,
    budgetUsagePercent,
    status,
    healthScore,
  } = useBudgetLogic();

  const currency = settings?.currency || 'EUR';
  const currencySymbol = { EUR: '€', USD: '$', GBP: '£', MAD: 'د.م.' }[currency] || '€';

  // Get current month date range
  const now = useMemo(() => new Date(), []);
  const currentMonthStart = useMemo(() => new Date(now.getFullYear(), now.getMonth(), 1), [now]);
  const currentMonthEnd = useMemo(() => new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59), [now]);
  const remainingDays = currentMonthEnd.getDate() - now.getDate();

  const last7DaysData = useMemo(() => {
    const monthTx = getCurrentMonthTransactions();
    const last7 = getTransactionsForLastNDays(monthTx, 7);

    const dailyData = {};
    for (let i = 6; i >= 0; i--) {
      const date = getDateFromDaysAgo(i);
      dailyData[date] = 0;
    }

    last7.forEach((tx) => {
      if (tx.type === 'expense' && Object.prototype.hasOwnProperty.call(dailyData, tx.date)) {
        dailyData[tx.date] += tx.amount;
      }
    });

    return Object.entries(dailyData).map(([date, amount]) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      amount: Math.round(amount * 100) / 100,
      date,
    }));
  }, [getCurrentMonthTransactions]);

  const recentTransactions = useMemo(() => {
    return getLastNTransactions(getCurrentMonthTransactions(), 5);
  }, [getCurrentMonthTransactions]);

  const tip = useMemo(() => {
    return pickMotivationalTip({ status, budgetUsagePercent });
  }, [status, budgetUsagePercent]);

  // Phase 2: Calculate all analytics metrics
  const spendingDNA = useMemo(() => {
    return calculateSpendingDNA(transactions, currentMonthStart, currentMonthEnd);
  }, [transactions, currentMonthStart, currentMonthEnd]);

  const needLevels = useMemo(() => {
    return calculateNeedLevelSummary(transactions, currentMonthStart, currentMonthEnd);
  }, [transactions, currentMonthStart, currentMonthEnd]);

  const cycleSummary = useMemo(() => {
    return calculateCycleSummary(transactions, currentMonthStart, currentMonthEnd);
  }, [transactions, currentMonthStart, currentMonthEnd]);

  const itemSummary = useMemo(() => {
    return calculateItemSummary(transactions, currentMonthStart, currentMonthEnd);
  }, [transactions, currentMonthStart, currentMonthEnd]);

  const dangerDay = useMemo(() => {
    return calculateDangerDay(transactions, currentMonthStart, currentMonthEnd);
  }, [transactions, currentMonthStart, currentMonthEnd]);

  const subscriptions = useMemo(() => {
    return calculateSubscriptions(transactions, currentMonthStart, currentMonthEnd);
  }, [transactions, currentMonthStart, currentMonthEnd]);

  const unexpectedExpenses = useMemo(() => {
    return calculateUnexpectedExpenses(transactions, currentMonthStart, currentMonthEnd);
  }, [transactions, currentMonthStart, currentMonthEnd]);

  const suggestions = useMemo(() => {
    return calculateSavingsSuggestions(transactions, budget, currentMonthStart, currentMonthEnd);
  }, [transactions, budget, currentMonthStart, currentMonthEnd]);

  const reportCard = useMemo(() => {
    return calculateReportCard(transactions, budget, currentMonthStart, currentMonthEnd);
  }, [transactions, budget, currentMonthStart, currentMonthEnd]);

  const budgetRecommendation = useMemo(() => {
    return calculateSmartBudgetRecommendation(transactions, budget);
  }, [transactions, budget]);

  const logStreak = useMemo(() => {
    return calculateLogStreak(transactions);
  }, [transactions]);

  return {
    currency,
    currencySymbol,
    remainingDays,

    currentMonthExpenses,
    currentMonthIncome,
    remainingBudget,
    safeSpendToday,
    burnRate,
    forecast,
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
  };
};

