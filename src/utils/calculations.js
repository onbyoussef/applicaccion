import { STATUS, DAYS_IN_MONTH } from '../constants/categories.js';

// Calculate safe spend today
export const calculateSafeSpendToday = (remainingBudget, remainingDays) => {
  if (remainingDays <= 0) return 0;
  return remainingBudget / remainingDays;
};

// Calculate burn rate (expense per day)
export const calculateBurnRate = (totalExpenses, daysElapsed) => {
  if (daysElapsed <= 0) return 0;
  return totalExpenses / daysElapsed;
};

// Calculate forecast end of month
export const calculateForecast = (burnRate, totalDaysInMonth) => {
  return burnRate * totalDaysInMonth;
};

// Calculate budget usage percentage
export const calculateBudgetUsage = (expenses, budget) => {
  if (budget <= 0) return 0;
  return (expenses / budget) * 100;
};

// Get status based on usage percentage
export const getStatus = (usagePercent) => {
  if (usagePercent < 90) return STATUS.ON_TRACK;
  if (usagePercent <= 100) return STATUS.WARNING;
  return STATUS.OVERSPENDING;
};

// Get remaining days in month
export const getRemainingDaysInMonth = (date = new Date()) => {
  const today = new Date(date);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const remainingDays = lastDay.getDate() - today.getDate();
  return Math.max(0, remainingDays);
};

// Get elapsed days in month
export const getElapsedDaysInMonth = (date = new Date()) => {
  const today = new Date(date);
  return today.getDate();
};

// Get current month start and end
export const getCurrentMonthBounds = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const start = new Date(year, month, 1).toISOString().split('T')[0];
  const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
  
  return { start, end };
};

// Get month bounds for a specific year/month
export const getMonthBounds = (year, month) => {
  const start = new Date(year, month, 1).toISOString().split('T')[0];
  const end = new Date(year, month + 1, 0).toISOString().split('T')[0];
  return { start, end };
};

// Check if a date is in current month
export const isInCurrentMonth = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

// Get date from days ago
export const getDateFromDaysAgo = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Calculate total by category
export const getTotalByCategory = (transactions, category) => {
  return transactions
    .filter(tx => tx.category === category && tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
};

// Calculate total by type
export const getTotalByType = (transactions, type) => {
  return transactions
    .filter(tx => tx.type === type)
    .reduce((sum, tx) => sum + tx.amount, 0);
};

// Get monthly totals
export const getMonthlyTotals = (transactions, monthStart, monthEnd) => {
  const monthTransactions = transactions.filter(tx => {
    return tx.date >= monthStart && tx.date <= monthEnd;
  });

  return {
    income: getTotalByType(monthTransactions, 'income'),
    expenses: getTotalByType(monthTransactions, 'expense'),
    net: getTotalByType(monthTransactions, 'income') - getTotalByType(monthTransactions, 'expense'),
  };
};

// Get daily average spending
export const getDailyAverage = (transactions, category = null) => {
  let relevant = transactions.filter(tx => tx.type === 'expense');
  
  if (category) {
    relevant = relevant.filter(tx => tx.category === category);
  }

  if (relevant.length === 0) return 0;

  const total = relevant.reduce((sum, tx) => sum + tx.amount, 0);
  
  // Count unique days
  const uniqueDays = new Set(relevant.map(tx => tx.date));
  const daysCount = Math.max(1, uniqueDays.size);

  return total / daysCount;
};

// Get last N transactions
export const getLastNTransactions = (transactions, n = 5) => {
  return transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, n);
};

// Get transactions for current month
export const getCurrentMonthTransactions = (transactions) => {
  const { start, end } = getCurrentMonthBounds();
  return transactions.filter(tx => tx.date >= start && tx.date <= end);
};

// Group transactions by category
export const groupByCategory = (transactions) => {
  const grouped = {};
  
  transactions.forEach(tx => {
    if (!grouped[tx.category]) {
      grouped[tx.category] = [];
    }
    grouped[tx.category].push(tx);
  });

  return grouped;
};

// Group transactions by date
export const groupByDate = (transactions) => {
  const grouped = {};
  
  transactions.forEach(tx => {
    if (!grouped[tx.date]) {
      grouped[tx.date] = [];
    }
    grouped[tx.date].push(tx);
  });

  return grouped;
};

// Group transactions by item/description (for Item Summary)
export const groupByItem = (transactions) => {
  const grouped = {};
  
  transactions.filter(tx => tx.type === 'expense').forEach(tx => {
    const key = tx.description.toUpperCase();
    if (!grouped[key]) {
      grouped[key] = {
        description: tx.description,
        total: 0,
        count: 0,
        category: tx.category,
      };
    }
    grouped[key].total += tx.amount;
    grouped[key].count += 1;
  });

  return Object.values(grouped).sort((a, b) => b.total - a.total);
};

// Get category distribution by percentage
export const getCategoryDistribution = (transactions) => {
  const categoryTotals = {};
  let total = 0;

  transactions.filter(tx => tx.type === 'expense').forEach(tx => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
    total += tx.amount;
  });

  const distribution = {};
  Object.entries(categoryTotals).forEach(([category, amount]) => {
    distribution[category] = (amount / total) * 100;
  });

  return distribution;
};

// Get need level distribution
export const getNeedLevelDistribution = (transactions) => {
  const needTotals = {};
  let total = 0;

  transactions.filter(tx => tx.type === 'expense').forEach(tx => {
    needTotals[tx.needLevel] = (needTotals[tx.needLevel] || 0) + tx.amount;
    total += tx.amount;
  });

  const distribution = {};
  Object.entries(needTotals).forEach(([level, amount]) => {
    distribution[level] = (amount / total) * 100;
  });

  return distribution;
};

// Get cycle distribution
export const getCycleDistribution = (transactions) => {
  const cycleTotals = {};
  let total = 0;

  transactions.filter(tx => tx.type === 'expense').forEach(tx => {
    cycleTotals[tx.cycle] = (cycleTotals[tx.cycle] || 0) + tx.amount;
    total += tx.amount;
  });

  const distribution = {};
  Object.entries(cycleTotals).forEach(([cycle, amount]) => {
    distribution[cycle] = (amount / total) * 100;
  });

  return distribution;
};

// Add days to date
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Calculate financial health score (0-100)
export const calculateHealthScore = (usagePercent, transactionCount, hasRegularTracking = true) => {
  let score = 100;

  // Deduct based on usage
  if (usagePercent > 100) {
    score -= (usagePercent - 100) * 2;
  } else if (usagePercent > 90) {
    score -= (usagePercent - 90) * 0.5;
  }

  // Bonus for tracking
  if (transactionCount >= 20) score += 5;
  if (transactionCount < 5) score -= 10;

  return Math.max(0, Math.min(100, score));
};

// Get spending personality
export const getSpendingPersonality = (transactions) => {
  if (transactions.length === 0) return 'OBSERVER';

  const { essential = 0, optional = 0, unexpected = 0 } = getNeedLevelDistribution(transactions);

  if (optional > 40) return 'IMPULSE_BUYER';
  if (unexpected > 25) return 'UNPREDICTABLE';
  if (essential > 75) return 'SMART_SPENDER';
  return 'BALANCED_SPENDER';
};
