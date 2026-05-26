import { useCallback } from 'react';
import { useBudget } from './useBudget.js';
import { getTotalByType, getCurrentMonthBounds, getMonthlyTotals, getLastNTransactions } from '../utils/calculations.js';
import { filterBySearch, filterByType, filterByCategory } from '../utils/filters.js';

export const useTransaction = () => {
  const { 
    transactions, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction 
  } = useBudget();

  const getTransaction = useCallback((id) => {
    return transactions.find(tx => tx.id === id);
  }, [transactions]);

  const getTransactionsByType = useCallback((type) => {
    return filterByType(transactions, type);
  }, [transactions]);

  const getExpenses = useCallback(() => {
    return filterByType(transactions, 'expense');
  }, [transactions]);

  const getIncome = useCallback(() => {
    return filterByType(transactions, 'income');
  }, [transactions]);

  const getTransactionsByCategory = useCallback((category) => {
    return filterByCategory(transactions, category);
  }, [transactions]);

  const searchTransactions = useCallback((searchTerm) => {
    return filterBySearch(transactions, searchTerm);
  }, [transactions]);

  const getRecentTransactions = useCallback((count = 5) => {
    return getLastNTransactions(transactions, count);
  }, [transactions]);

  const getCurrentMonthTransactions = useCallback(() => {
    const { start, end } = getCurrentMonthBounds();
    return transactions.filter(tx => tx.date >= start && tx.date <= end);
  }, [transactions]);

  const getMonthTotals = useCallback(() => {
    const { start, end } = getCurrentMonthBounds();
    return getMonthlyTotals(transactions, start, end);
  }, [transactions]);

  const getTotalExpenses = useCallback((startDate = null, endDate = null) => {
    let filtered = getExpenses();
    if (startDate && endDate) {
      filtered = filtered.filter(tx => tx.date >= startDate && tx.date <= endDate);
    }
    return getTotalByType(filtered, 'expense');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  const getTotalIncome = useCallback((startDate = null, endDate = null) => {
    let filtered = getIncome();
    if (startDate && endDate) {
      filtered = filtered.filter(tx => tx.date >= startDate && tx.date <= endDate);
    }
    return getTotalByType(filtered, 'income');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransaction,
    getTransactionsByType,
    getExpenses,
    getIncome,
    getTransactionsByCategory,
    searchTransactions,
    getRecentTransactions,
    getCurrentMonthTransactions,
    getMonthTotals,
    getTotalExpenses,
    getTotalIncome,
  };
};
