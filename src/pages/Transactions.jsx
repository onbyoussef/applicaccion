import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '../hooks/useBudget.js';
import { formatCurrency } from '../utils/formatters.js';
import { filterByType, filterBySearch, sortByDate } from '../utils/filters.js';
import { containerVariants, itemVariants } from '../utils/animations.js';
import Header from '../components/layout/Header.jsx';
import TransactionCard from '../components/cards/TransactionCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';

const Transactions = ({ onAddTransaction }) => {
  const { transactions, deleteTransaction, settings } = useBudget();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (newest first), 'asc' (oldest first)

  const currencySymbol = { EUR: '€', USD: '$', GBP: '£', MAD: 'د.م.' }[settings?.currency] || '€';

  // Apply all filters and sorting
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply type filter
    if (filterType !== 'all') {
      result = filterByType(result, filterType);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      result = filterBySearch(result, searchTerm);
    }

    // Apply sorting
    result = sortByDate(result, sortOrder);

    return result;
  }, [transactions, filterType, searchTerm, sortOrder]);

  const totalFiltered = filteredTransactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);

  const filterButtons = [
    { label: 'All', value: 'all', icon: '📋' },
    { label: 'Income', value: 'income', icon: '📈' },
    { label: 'Expenses', value: 'expense', icon: '📉' },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-24"
    >
      <Header 
        title="💸 Transactions" 
        subtitle={`${filteredTransactions.length} transactions`}
      />

      <div className="px-4 py-4 space-y-4">
        {/* Search Bar */}
        <motion.div variants={itemVariants}>
          <Input 
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="🔍"
          />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilterType(btn.value)}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                filterType === btn.value
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <span className="mr-1">{btn.icon}</span>{btn.label}
            </button>
          ))}
        </motion.div>

        {/* Sort Toggle */}
        <motion.div variants={itemVariants} className="flex gap-2">
          <button
            onClick={() => setSortOrder('desc')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              sortOrder === 'desc'
                ? 'bg-primary-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            Newest First ↓
          </button>
          <button
            onClick={() => setSortOrder('asc')}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
              sortOrder === 'asc'
                ? 'bg-primary-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            Oldest First ↑
          </button>
        </motion.div>

        {/* Summary */}
        {filteredTransactions.length > 0 && (
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 rounded-lg p-3 text-center"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">Total (Filtered)</p>
            <p className={`text-lg font-bold ${totalFiltered >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {formatCurrency(totalFiltered)}
            </p>
          </motion.div>
        )}

        {/* Transactions List */}
        {filteredTransactions.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            className="space-y-3"
          >
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                variants={itemVariants}
                custom={index}
              >
                <TransactionCard 
                  transaction={transaction}
                  currency={currencySymbol}
                  onDelete={() => deleteTransaction(transaction.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <EmptyState 
              icon="📭"
              title="No transactions found"
              description={searchTerm ? "Try adjusting your search" : "Start by adding your first transaction"}
              action={<Button variant="primary" onClick={onAddTransaction}>+ Add Transaction</Button>}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Transactions;
