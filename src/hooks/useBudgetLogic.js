import { useMemo } from 'react';
import { useTransaction } from './useTransaction.js';
import { useBudget } from './useBudget.js';
import {
  calculateSafeSpendToday,
  calculateBurnRate,
  calculateForecast,
  calculateBudgetUsage,
  getStatus,
  getRemainingDaysInMonth,
  getElapsedDaysInMonth,
  getTotalByCategory,
  getDailyAverage,
  calculateHealthScore,
  getSpendingPersonality,
} from '../utils/calculations.js';

export const useBudgetLogic = () => {
  const { getMonthTotals } = useTransaction();
  const { transactions, budget } = useBudget();

  const monthTotals = getMonthTotals();
  const currentMonthExpenses = monthTotals.expenses;
  const currentMonthIncome = monthTotals.income;

  // Current month calculations
  const remainingBudget = useMemo(() => {
    return budget.total - currentMonthExpenses;
  }, [budget.total, currentMonthExpenses]);

  const remainingDays = useMemo(() => {
    return getRemainingDaysInMonth();
  }, []);

  const elapsedDays = useMemo(() => {
    return getElapsedDaysInMonth();
  }, []);

  const safeSpendToday = useMemo(() => {
    return calculateSafeSpendToday(remainingBudget, remainingDays);
  }, [remainingBudget, remainingDays]);

  const burnRate = useMemo(() => {
    return calculateBurnRate(currentMonthExpenses, elapsedDays);
  }, [currentMonthExpenses, elapsedDays]);

  const forecast = useMemo(() => {
    const totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    return calculateForecast(burnRate, totalDays);
  }, [burnRate]);

  const budgetUsagePercent = useMemo(() => {
    return calculateBudgetUsage(currentMonthExpenses, budget.total);
  }, [currentMonthExpenses, budget.total]);

  const status = useMemo(() => {
    return getStatus(budgetUsagePercent);
  }, [budgetUsagePercent]);

  const categoryTotals = useMemo(() => {
    const totals = {};
    Object.keys(budget.byCategory).forEach(category => {
      totals[category] = getTotalByCategory(transactions, category);
    });
    return totals;
  }, [transactions, budget.byCategory]);

  const categoryUsagePercent = useMemo(() => {
    const usage = {};
    Object.entries(budget.byCategory).forEach(([category, amount]) => {
      usage[category] = amount > 0 ? (categoryTotals[category] / amount) * 100 : 0;
    });
    return usage;
  }, [budget.byCategory, categoryTotals]);

  const dailyAverage = useMemo(() => {
    return getDailyAverage(transactions);
  }, [transactions]);

  const healthScore = useMemo(() => {
    return calculateHealthScore(budgetUsagePercent, transactions.length);
  }, [budgetUsagePercent, transactions.length]);

  const spendingPersonality = useMemo(() => {
    return getSpendingPersonality(transactions);
  }, [transactions]);

  return {
    // Totals
    currentMonthExpenses,
    currentMonthIncome,
    remainingBudget,
    
    // Time
    remainingDays,
    elapsedDays,
    
    // Key metrics
    safeSpendToday,
    burnRate,
    forecast,
    budgetUsagePercent,
    status,
    dailyAverage,
    
    // Category breakdown
    categoryTotals,
    categoryUsagePercent,
    
    // Health & insights
    healthScore,
    spendingPersonality,
  };
};
