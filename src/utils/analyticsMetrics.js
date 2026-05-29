/**
 * Comprehensive analytics metrics for Phase 2 features
 * Calculates all derived metrics for spending analysis
 */

export const calculateSpendingDNA = (transactions, currentMonthStart, currentMonthEnd) => {
  // Categorize transactions as Essential, Optional, or Unexpected
  const essentialCategories = ['food', 'housing', 'health', 'transport'];
  const optionalCategories = ['entertainment', 'shopping', 'travel', 'education'];

  let essential = 0;
  let optional = 0;
  let unexpected = 0;

  const monthTransactions = transactions.filter(t => {
    const txDate = new Date(t.date);
    return t.type === 'expense' && txDate >= currentMonthStart && txDate <= currentMonthEnd;
  });

  monthTransactions.forEach(tx => {
    const amount = Math.abs(tx.amount);
    if (essentialCategories.includes(tx.category)) essential += amount;
    else if (optionalCategories.includes(tx.category)) optional += amount;
    else unexpected += amount;
  });

  const total = essential + optional + unexpected;
  return {
    essential,
    optional,
    unexpected,
    total,
    percentages: {
      essential: total > 0 ? (essential / total) * 100 : 0,
      optional: total > 0 ? (optional / total) * 100 : 0,
      unexpected: total > 0 ? (unexpected / total) * 100 : 0,
    },
  };
};

export const calculateNeedLevelSummary = (transactions, currentMonthStart, currentMonthEnd) => {
  // Group by necessity level: Must-Have, Should-Have, Nice-to-Have
  const mustHave = ['food', 'housing', 'health', 'transport']; // Essential
  const shouldHave = ['education', 'business']; // Important but not daily
  const niceToHaveList = ['entertainment', 'shopping', 'travel', 'other']; // Discretionary

  let must = 0, should = 0, nice = 0;

  const monthTransactions = transactions.filter(t => {
    const txDate = new Date(t.date);
    return t.type === 'expense' && txDate >= currentMonthStart && txDate <= currentMonthEnd;
  });

  monthTransactions.forEach(tx => {
    const amount = Math.abs(tx.amount);
    if (mustHave.includes(tx.category)) must += amount;
    else if (shouldHave.includes(tx.category)) should += amount;
    else if (niceToHaveList.includes(tx.category)) nice += amount;
  });

  const total = must + should + nice;
  return {
    mustHave: must,
    shouldHave: should,
    niceToHave: nice,
    total,
    percentages: {
      mustHave: total > 0 ? (must / total) * 100 : 0,
      shouldHave: total > 0 ? (should / total) * 100 : 0,
      niceToHave: total > 0 ? (nice / total) * 100 : 0,
    },
  };
};

export const calculateCycleSummary = (transactions, currentMonthStart, currentMonthEnd) => {
  // Analyze spending cycles: Daily, Weekly, Monthly, One-off
  const daily = []; // Regular daily expenses
  const weekly = []; // Weekly patterns
  const monthly = []; // Monthly recurring
  const oneOff = []; // Single occurrences

  // Group by item name and count occurrences
  const itemMap = {};
  const monthTransactions = transactions.filter(t => {
    const txDate = new Date(t.date);
    return t.type === 'expense' && txDate >= currentMonthStart && txDate <= currentMonthEnd;
  });

  monthTransactions.forEach(tx => {
    const key = `${tx.category}-${tx.description}`;
    if (!itemMap[key]) {
      itemMap[key] = { count: 0, total: 0, dates: [], description: tx.description };
    }
    itemMap[key].count += 1;
    itemMap[key].total += Math.abs(tx.amount);
    itemMap[key].dates.push(new Date(tx.date));
  });

  // Categorize by frequency
  Object.entries(itemMap).forEach(([key, item]) => {
    if (item.count >= 20) {
      daily.push({ ...item, cycle: 'Daily', frequency: item.count });
    } else if (item.count >= 4) {
      weekly.push({ ...item, cycle: 'Weekly', frequency: item.count });
    } else if (item.count >= 2) {
      monthly.push({ ...item, cycle: 'Monthly', frequency: item.count });
    } else {
      oneOff.push({ ...item, cycle: 'One-off', frequency: 1 });
    }
  });

  const dailyTotal = daily.reduce((sum, item) => sum + item.total, 0);
  const weeklyTotal = weekly.reduce((sum, item) => sum + item.total, 0);
  const monthlyTotal = monthly.reduce((sum, item) => sum + item.total, 0);
  const oneOffTotal = oneOff.reduce((sum, item) => sum + item.total, 0);
  const total = dailyTotal + weeklyTotal + monthlyTotal + oneOffTotal;

  return {
    daily: { count: daily.length, total: dailyTotal, items: daily },
    weekly: { count: weekly.length, total: weeklyTotal, items: weekly },
    monthly: { count: monthly.length, total: monthlyTotal, items: monthly },
    oneOff: { count: oneOff.length, total: oneOffTotal, items: oneOff },
    total,
    percentages: {
      daily: total > 0 ? (dailyTotal / total) * 100 : 0,
      weekly: total > 0 ? (weeklyTotal / total) * 100 : 0,
      monthly: total > 0 ? (monthlyTotal / total) * 100 : 0,
      oneOff: total > 0 ? (oneOffTotal / total) * 100 : 0,
    },
  };
};

export const calculateItemSummary = (transactions, currentMonthStart, currentMonthEnd) => {
  // Group transactions by item name
  const itemMap = {};

  const monthTransactions = transactions.filter(t => {
    const txDate = new Date(t.date);
    return t.type === 'expense' && txDate >= currentMonthStart && txDate <= currentMonthEnd;
  });

  monthTransactions.forEach(tx => {
    const desc = tx.description || 'Uncategorized';
    if (!itemMap[desc]) {
      itemMap[desc] = { count: 0, total: 0, category: tx.category, min: Infinity, max: 0, dates: [] };
    }
    itemMap[desc].count += 1;
    itemMap[desc].total += Math.abs(tx.amount);
    itemMap[desc].min = Math.min(itemMap[desc].min, Math.abs(tx.amount));
    itemMap[desc].max = Math.max(itemMap[desc].max, Math.abs(tx.amount));
    itemMap[desc].dates.push(new Date(tx.date));
  });

  const items = Object.entries(itemMap)
    .map(([name, data]) => ({
      name,
      count: data.count,
      total: data.total,
      average: data.total / data.count,
      min: data.min,
      max: data.max,
      category: data.category,
      dates: data.dates,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 15); // Top 15 items

  return items;
};

export const calculateDangerDay = (transactions, currentMonthStart, currentMonthEnd) => {
  // Identify which days of week have highest overspending
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayMap = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const dayCountMap = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  const monthTransactions = transactions.filter(t => {
    const txDate = new Date(t.date);
    return t.type === 'expense' && txDate >= currentMonthStart && txDate <= currentMonthEnd;
  });

  monthTransactions.forEach(tx => {
    const txDate = new Date(tx.date);
    const dayOfWeek = txDate.getDay();
    dayMap[dayOfWeek] += Math.abs(tx.amount);
    dayCountMap[dayOfWeek] += 1;
  });

  const dayAverages = Object.entries(dayMap).map(([day, total]) => ({
    day: daysOfWeek[parseInt(day)],
    dayNum: parseInt(day),
    total,
    count: dayCountMap[day],
    average: dayCountMap[day] > 0 ? total / dayCountMap[day] : 0,
  }));

  const dangerDays = dayAverages.sort((a, b) => b.average - a.average).slice(0, 3);

  return {
    dangerDays,
    highestDay: dangerDays[0],
    allDays: dayAverages,
  };
};

export const calculateSubscriptions = (transactions, currentMonthStart, currentMonthEnd) => {
  // Detect recurring monthly expenses (subscriptions)
  const lastMonthStart = new Date(currentMonthStart);
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
  
  const itemMap = {};

  transactions
    .filter(t => t.type === 'expense')
    .forEach(tx => {
      const desc = tx.description || 'Uncategorized';
      if (!itemMap[desc]) {
        itemMap[desc] = { count: 0, total: 0, category: tx.category, dates: [] };
      }
      itemMap[desc].count += 1;
      itemMap[desc].total += Math.abs(tx.amount);
      itemMap[desc].dates.push(new Date(tx.date));
    });

  const subscriptions = Object.entries(itemMap)
    .filter(([name, data]) => {
      // Likely subscription if: similar amount, appears monthly, fixed pattern
      return data.count >= 2 && data.total / data.count < 500;
    })
    .map(([name, data]) => ({
      name,
      count: data.count,
      total: data.total,
      monthly: data.total / Math.max(1, Math.floor(data.count / 2)),
      category: data.category,
      frequency: 'Monthly',
    }))
    .sort((a, b) => b.monthly - a.monthly);

  const monthlySubscriptionCost = subscriptions.reduce((sum, sub) => sum + sub.monthly, 0);
  const yearlySubscriptionCost = monthlySubscriptionCost * 12;

  return {
    subscriptions,
    monthlyTotal: monthlySubscriptionCost,
    yearlyTotal: yearlySubscriptionCost,
    count: subscriptions.length,
  };
};

export const calculateUnexpectedExpenses = (transactions, currentMonthStart, currentMonthEnd) => {
  // Flag unusual or unexpected expenses
  const monthTransactions = transactions.filter(t => {
    const txDate = new Date(t.date);
    return t.type === 'expense' && txDate >= currentMonthStart && txDate <= currentMonthEnd;
  });

  // Calculate average spending per category
  const categoryAverages = {};
  monthTransactions.forEach(tx => {
    if (!categoryAverages[tx.category]) {
      categoryAverages[tx.category] = [];
    }
    categoryAverages[tx.category].push(Math.abs(tx.amount));
  });

  // Find outliers (2x average)
  const unexpected = [];
  monthTransactions.forEach(tx => {
    const amounts = categoryAverages[tx.category];
    const avg = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
    if (Math.abs(tx.amount) > avg * 1.5) {
      unexpected.push({
        ...tx,
        amountAboveAverage: Math.abs(tx.amount) - avg,
        categoryAverage: avg,
      });
    }
  });

  const totalUnexpected = unexpected.reduce((sum, tx) => sum + tx.amountAboveAverage, 0);

  return {
    count: unexpected.count,
    items: unexpected.sort((a, b) => b.amountAboveAverage - a.amountAboveAverage),
    totalExtra: totalUnexpected,
  };
};

export const calculateSavingsSuggestions = (transactions, budget, currentMonthStart, currentMonthEnd) => {
  // Analyze spending and provide specific savings suggestions
  const spendingDNA = calculateSpendingDNA(transactions, currentMonthStart, currentMonthEnd);
  const subscriptions = calculateSubscriptions(transactions, currentMonthStart, currentMonthEnd);
  const itemSummary = calculateItemSummary(transactions, currentMonthStart, currentMonthEnd);
  const needLevels = calculateNeedLevelSummary(transactions, currentMonthStart, currentMonthEnd);

  const suggestions = [];

  // Suggestion 1: Unexpected expenses
  if (spendingDNA.percentages.unexpected > 15) {
    suggestions.push({
      id: 1,
      title: '🎯 Reduce Unexpected Spending',
      description: `You're spending ${Math.round(spendingDNA.percentages.unexpected)}% on unexpected items. Try to plan ahead.`,
      potentialSavings: spendingDNA.unexpected * 0.25,
      priority: 'high',
    });
  }

  // Suggestion 2: Subscriptions
  if (subscriptions.monthlyTotal > budget.total * 0.1) {
    suggestions.push({
      id: 2,
      title: '💳 Review Subscriptions',
      description: `You're spending ${Math.round((subscriptions.monthlyTotal / budget.total) * 100)}% on subscriptions. Review unused ones.`,
      potentialSavings: subscriptions.monthlyTotal * 0.2,
      priority: 'high',
    });
  }

  // Suggestion 3: Top spending item
  if (itemSummary.length > 0) {
    const topItem = itemSummary[0];
    suggestions.push({
      id: 3,
      title: `📉 Optimize "${topItem.name}"`,
      description: `Your top expense is ${topItem.name} (${topItem.count}x). Small changes add up.`,
      potentialSavings: topItem.total * 0.1,
      priority: 'medium',
    });
  }

  // Suggestion 4: Nice-to-have spending
  if (needLevels.percentages.niceToHave > 25) {
    suggestions.push({
      id: 4,
      title: '🎁 Reduce Discretionary Spending',
      description: `You're spending ${Math.round(needLevels.percentages.niceToHave)}% on discretionary items.`,
      potentialSavings: needLevels.niceToHave * 0.2,
      priority: 'medium',
    });
  }

  return suggestions.sort((a, b) => {
    const priorityMap = { high: 0, medium: 1, low: 2 };
    return priorityMap[a.priority] - priorityMap[b.priority];
  });
};

export const calculateReportCard = (transactions, budget, currentMonthStart, currentMonthEnd) => {
  // Generate A-F grade for monthly spending
  const monthExpenses = transactions
    .filter(t => {
      const txDate = new Date(t.date);
      return t.type === 'expense' && txDate >= currentMonthStart && txDate <= currentMonthEnd;
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const percentage = (monthExpenses / budget.total) * 100;
  let grade, color, message;

  if (percentage < 70) {
    grade = 'A'; color = 'emerald'; message = 'Excellent! Way under budget 🎉';
  } else if (percentage < 85) {
    grade = 'B'; color = 'blue'; message = 'Great! Well within budget 👍';
  } else if (percentage < 100) {
    grade = 'C'; color = 'amber'; message = 'Good! Close to budget 👌';
  } else if (percentage < 120) {
    grade = 'D'; color = 'orange'; message = 'Over budget. Next month plan better 📌';
  } else {
    grade = 'F'; color = 'rose'; message = 'Way over budget. Time to cutback ⚠️';
  }

  return {
    grade,
    color,
    message,
    percentage: Math.round(percentage),
    spent: monthExpenses,
    budget: budget.total,
    remaining: budget.total - monthExpenses,
  };
};

export const calculateSmartBudgetRecommendation = (transactions, budget) => {
  // Analyze last 3 months to recommend ideal budget
  const now = new Date();
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);

  const relevantTransactions = transactions.filter(t => {
    const txDate = new Date(t.date);
    return t.type === 'expense' && txDate >= threeMonthsAgo;
  });

  if (relevantTransactions.length === 0) return null;

  const totalSpent = relevantTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const averageMonthly = totalSpent / 3;
  const recommended = Math.ceil(averageMonthly * 1.1); // Add 10% buffer

  return {
    currentBudget: budget.total,
    recommendedBudget: recommended,
    recentAverage: Math.round(averageMonthly),
    difference: recommended - budget.total,
    trend: averageMonthly > budget.total ? 'above' : 'below',
  };
};

export const calculateLogStreak = (transactions) => {
  // Count consecutive days with logged transactions
  const dates = new Set();
  transactions.forEach(t => {
    const dateStr = new Date(t.date).toDateString();
    dates.add(dateStr);
  });

  const sortedDates = Array.from(dates)
    .map(d => new Date(d))
    .sort((a, b) => b - a);

  let streak = 0;
  let maxStreak = 0;
  let currentStreakStart = null;

  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i];
    const previousDate = sortedDates[i + 1];

    if (
      !previousDate ||
      (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24) === 1
    ) {
      streak++;
      if (!currentStreakStart) currentStreakStart = currentDate;
    } else {
      if (streak > maxStreak) {
        maxStreak = streak;
      }
      streak = 0;
      currentStreakStart = null;
    }
  }

  // Check current streak (from today backwards)
  const today = new Date().toDateString();
  const currentStreak =
    dates.has(today) || dates.has(new Date(Date.now() - 86400000).toDateString())
      ? streak + 1
      : 0;

  return {
    currentStreak,
    longestStreak: maxStreak,
    isOnFire: currentStreak > 0,
  };
};
