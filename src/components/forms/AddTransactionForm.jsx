import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBudget } from '../../hooks/useBudget.js';
import { CATEGORIES, STATUS_CONFIG } from '../../constants/categories.js';
import { formatCurrency, getTodayISO } from '../../utils/formatters.js';
import { isValidAmount, isValidDescription, generateId } from '../../utils/validators.js';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';

const AddTransactionForm = ({ isOpen, onClose }) => {
  const { addTransaction, budget } = useBudget();
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: 'food',
    description: '',
    date: getTodayISO(),
    needLevel: 'essential',
    cycle: 'oneoff',
  });
  const [errors, setErrors] = useState({});

  const needLevels = [
    { value: 'essential', emoji: '🟢', label: 'Essential' },
    { value: 'optional', emoji: '🔵', label: 'Optional' },
    { value: 'unexpected', emoji: '🟣', label: 'Unexpected' },
  ];

  const cycles = [
    { value: 'fixed', emoji: '🔴', label: 'Fixed' },
    { value: 'variable', emoji: '🔵', label: 'Variable' },
    { value: 'oneoff', emoji: '🟡', label: 'One-off' },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!isValidAmount(parseFloat(formData.amount))) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!isValidDescription(formData.description)) {
      newErrors.description = 'Description is required (1-100 chars)';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newTransaction = {
      id: generateId(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
      needLevel: formData.type === 'income' ? 'essential' : formData.needLevel,
      cycle: formData.type === 'income' ? 'fixed' : formData.cycle,
    };

    addTransaction(newTransaction);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      type: 'expense',
      amount: '',
      category: 'food',
      description: '',
      date: getTodayISO(),
      needLevel: 'essential',
      cycle: 'oneoff',
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-12 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
            </div>

            <div className="px-4 pb-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Add Transaction
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Track every euro. Own your future.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Type Toggle */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Type
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'expense' })}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                        formData.type === 'expense'
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      📉 Expense
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'income' })}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                        formData.type === 'income'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      📈 Income
                    </button>
                  </div>
                </div>

                {/* Amount - Big Input */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 rounded-lg p-6 text-center">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full text-4xl font-bold text-center bg-transparent text-primary-600 dark:text-primary-400 outline-none mt-2 placeholder:text-primary-300"
                  />
                  {errors.amount && (
                    <p className="text-sm text-rose-600 dark:text-rose-400 mt-2">{errors.amount}</p>
                  )}
                </div>

                {/* Category Picker */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Category
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: key })}
                        className={`py-3 px-2 rounded-lg font-medium text-xs transition-all text-center ${
                          formData.category === key
                            ? 'bg-primary-500 text-white ring-2 ring-primary-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="text-xl">{cat.emoji}</div>
                        <div className="text-xs mt-1">{cat.label}</div>
                      </button>
                    ))}
                  </div>
                  {errors.category && (
                    <p className="text-sm text-rose-600 dark:text-rose-400 mt-2">{errors.category}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <Input
                    placeholder="What is this for?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  {errors.description && (
                    <p className="text-sm text-rose-600 dark:text-rose-400 mt-2">{errors.description}</p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Need Level (only for expenses) */}
                {formData.type === 'expense' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Need Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {needLevels.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, needLevel: level.value })}
                          className={`py-3 px-2 rounded-lg font-medium text-xs transition-all text-center ${
                            formData.needLevel === level.value
                              ? 'bg-primary-500 text-white ring-2 ring-primary-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="text-lg">{level.emoji}</div>
                          <div className="text-xs mt-1">{level.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cycle (only for expenses) */}
                {formData.type === 'expense' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Cycle
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {cycles.map((cycle) => (
                        <button
                          key={cycle.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, cycle: cycle.value })}
                          className={`py-3 px-2 rounded-lg font-medium text-xs transition-all text-center ${
                            formData.cycle === cycle.value
                              ? 'bg-primary-500 text-white ring-2 ring-primary-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="text-lg">{cycle.emoji}</div>
                          <div className="text-xs mt-1">{cycle.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="ghost"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="flex-1"
                  >
                    ✓ Add Transaction
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionForm;
