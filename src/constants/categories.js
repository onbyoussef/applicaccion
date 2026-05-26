// Category definitions with emojis
export const CATEGORIES = {
  food: { emoji: '🍕', label: 'Food & Dining' },
  transport: { emoji: '🚗', label: 'Transport' },
  shopping: { emoji: '🛍️', label: 'Shopping' },
  housing: { emoji: '🏠', label: 'Housing' },
  health: { emoji: '💊', label: 'Health' },
  entertainment: { emoji: '🎬', label: 'Entertainment' },
  travel: { emoji: '✈️', label: 'Travel' },
  education: { emoji: '📚', label: 'Education' },
  business: { emoji: '💼', label: 'Business' },
  income: { emoji: '💰', label: 'Income' },
  other: { emoji: '🎁', label: 'Other' },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES);

// Need levels
export const NEED_LEVELS = {
  essential: { emoji: '🟢', label: 'Essential' },
  optional: { emoji: '🔵', label: 'Optional' },
  unexpected: { emoji: '🟣', label: 'Unexpected' },
};

// Transaction cycles
export const CYCLES = {
  fixed: { emoji: '🔴', label: 'Fixed' },
  variable: { emoji: '🔵', label: 'Variable' },
  oneoff: { emoji: '🟡', label: 'One-off' },
};

// Budget status
export const STATUS = {
  ON_TRACK: 'ON_TRACK',
  WARNING: 'WARNING',
  OVERSPENDING: 'OVERSPENDING',
};

export const STATUS_CONFIG = {
  ON_TRACK: { color: 'bg-success-500', textColor: 'text-success-500', label: 'On Track', emoji: '✅' },
  WARNING: { color: 'bg-warning-500', textColor: 'text-warning-500', label: 'Warning', emoji: '⚠️' },
  OVERSPENDING: { color: 'bg-danger-500', textColor: 'text-danger-500', label: 'Overspending', emoji: '🚨' },
};

// Currencies
export const CURRENCIES = {
  EUR: { symbol: '€', label: 'Euro', code: 'EUR' },
  USD: { symbol: '$', label: 'US Dollar', code: 'USD' },
  GBP: { symbol: '£', label: 'British Pound', code: 'GBP' },
  MAD: { symbol: 'د.م.', label: 'Moroccan Dirham', code: 'MAD' },
};

export const CURRENCY_KEYS = Object.keys(CURRENCIES);

// Themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// App versions
export const APP_VERSION = '1.0.0';
export const APP_NAME = 'Smart Budget Pro';

// Default settings
export const DEFAULT_SETTINGS = {
  currency: 'EUR',
  theme: 'dark',
  isFirstRun: true,
};

// Default budget
export const DEFAULT_BUDGET = {
  total: 2000,
  byCategory: {
    food: 300,
    transport: 150,
    shopping: 200,
    housing: 1000,
    health: 100,
    entertainment: 150,
    travel: 100,
    education: 50,
    business: 0,
    other: 0,
  },
};

// Toast messages
export const MESSAGES = {
  TRANSACTION_ADDED: 'Transaction added successfully',
  TRANSACTION_UPDATED: 'Transaction updated successfully',
  TRANSACTION_DELETED: 'Transaction deleted successfully',
  BUDGET_SAVED: 'Budget saved successfully',
  SETTINGS_SAVED: 'Settings saved successfully',
  DATA_EXPORTED: 'Data exported successfully',
  DATA_CLEARED: 'All data cleared',
  DEMO_DATA_CLEARED: 'Demo data cleared',
};

// Motivational tips
export const MOTIVATIONAL_TIPS = [
  'Track every euro, own your future! 💪',
  'Every expense tells a story. What\'s yours? 📖',
  'Small savings compound into big wealth. 💎',
  'Spending wisely is the first step to financial freedom. 🚀',
  'You\'re building wealth one transaction at a time. 📈',
  'Financial awareness is the first step to financial freedom. 🧠',
  'Budget like a boss, live like a legend. 👑',
  'Your future self will thank you for tracking today. 🙏',
  'Breaking the budget doesn\'t break your dreams. 💭',
  'Consistency in tracking leads to consistency in success. ✨',
];

// Empty state messages
export const EMPTY_STATES = {
  NO_TRANSACTIONS: 'No transactions yet. Add one to get started! 🚀',
  NO_BUDGET: 'Set a budget to track your spending 🎯',
  NO_DATA: 'No data available 📊',
};

// Days in months (for calculations)
export const DAYS_IN_MONTH = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
