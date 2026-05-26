// Filter functions for transactions

export const filterByType = (transactions, type) => {
  if (!type) return transactions;
  return transactions.filter(tx => tx.type === type);
};

export const filterByCategory = (transactions, category) => {
  if (!category) return transactions;
  return transactions.filter(tx => tx.category === category);
};

export const filterByDateRange = (transactions, startDate, endDate) => {
  return transactions.filter(tx => {
    return tx.date >= startDate && tx.date <= endDate;
  });
};

export const filterBySearch = (transactions, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') return transactions;
  
  const term = searchTerm.toLowerCase();
  return transactions.filter(tx => {
    return tx.description.toLowerCase().includes(term) ||
           tx.category.toLowerCase().includes(term);
  });
};

export const filterByNeedLevel = (transactions, needLevel) => {
  if (!needLevel) return transactions;
  return transactions.filter(tx => tx.needLevel === needLevel);
};

export const filterByCycle = (transactions, cycle) => {
  if (!cycle) return transactions;
  return transactions.filter(tx => tx.cycle === cycle);
};

export const filterByAmountRange = (transactions, minAmount, maxAmount) => {
  return transactions.filter(tx => {
    return tx.amount >= minAmount && tx.amount <= maxAmount;
  });
};

// Sorting functions

export const sortByDate = (transactions, order = 'desc') => {
  return [...transactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const sortByAmount = (transactions, order = 'desc') => {
  return [...transactions].sort((a, b) => {
    return order === 'desc' ? b.amount - a.amount : a.amount - b.amount;
  });
};

export const sortByCategory = (transactions, order = 'asc') => {
  return [...transactions].sort((a, b) => {
    return order === 'asc' 
      ? a.category.localeCompare(b.category)
      : b.category.localeCompare(a.category);
  });
};

export const sortByDescription = (transactions, order = 'asc') => {
  return [...transactions].sort((a, b) => {
    return order === 'asc'
      ? a.description.localeCompare(b.description)
      : b.description.localeCompare(a.description);
  });
};

// Get last N transactions
export const getLastNTransactions = (transactions, n = 5) => {
  return sortByDate(transactions, 'desc').slice(0, n);
};

// Get transactions by status
export const getTransactionsByStatus = (transactions, status) => {
  // status: recent, high-value, low-value, etc
  if (status === 'recent') {
    return sortByDate(transactions, 'desc').slice(0, 10);
  }
  if (status === 'high-value') {
    return sortByAmount(transactions, 'desc').slice(0, 10);
  }
  if (status === 'low-value') {
    return sortByAmount(transactions, 'asc').slice(0, 10);
  }
  return transactions;
};

// Get unique categories from transactions
export const getUniqueCategoriesFromTransactions = (transactions) => {
  return [...new Set(transactions.map(tx => tx.category))];
};

// Filter expenses only
export const getExpenses = (transactions) => {
  return transactions.filter(tx => tx.type === 'expense');
};

// Filter income only
export const getIncome = (transactions) => {
  return transactions.filter(tx => tx.type === 'income');
};

// Get transactions for today
export const getTransactionsForToday = (transactions) => {
  const today = new Date().toISOString().split('T')[0];
  return transactions.filter(tx => tx.date === today);
};

// Get transactions for this week
export const getTransactionsForThisWeek = (transactions) => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  
  const startDate = startOfWeek.toISOString().split('T')[0];
  const endDate = now.toISOString().split('T')[0];
  
  return filterByDateRange(transactions, startDate, endDate);
};

// Get transactions for this month
export const getTransactionsForThisMonth = (transactions) => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
  
  return filterByDateRange(transactions, startDate, endDate);
};

// Get transactions for last N days
export const getTransactionsForLastNDays = (transactions, days) => {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - days);
  
  const startStr = startDate.toISOString().split('T')[0];
  const endStr = now.toISOString().split('T')[0];
  
  return filterByDateRange(transactions, startStr, endStr);
};

// Combine multiple filters
export const applyFilters = (transactions, filters) => {
  let result = transactions;
  
  if (filters.type) {
    result = filterByType(result, filters.type);
  }
  if (filters.category) {
    result = filterByCategory(result, filters.category);
  }
  if (filters.startDate && filters.endDate) {
    result = filterByDateRange(result, filters.startDate, filters.endDate);
  }
  if (filters.searchTerm) {
    result = filterBySearch(result, filters.searchTerm);
  }
  if (filters.needLevel) {
    result = filterByNeedLevel(result, filters.needLevel);
  }
  if (filters.cycle) {
    result = filterByCycle(result, filters.cycle);
  }
  if (filters.minAmount !== undefined && filters.maxAmount !== undefined) {
    result = filterByAmountRange(result, filters.minAmount, filters.maxAmount);
  }
  
  return result;
};
