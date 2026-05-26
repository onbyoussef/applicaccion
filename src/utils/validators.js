// Validation functions
export const isValidAmount = (amount) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && num <= 999999;
};

export const isValidDescription = (text) => {
  return text && text.trim().length > 0 && text.trim().length <= 100;
};

export const isValidBudget = (budget) => {
  const num = parseFloat(budget);
  return !isNaN(num) && num > 0 && num <= 9999999;
};

export const isValidCurrency = (currency) => {
  return currency && currency.trim().length > 0;
};

export const isValidDate = (dateStr) => {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date);
};

export const isValidCategory = (category, validCategories) => {
  return validCategories.includes(category);
};

export const isValidNeedLevel = (level) => {
  return ['essential', 'optional', 'unexpected'].includes(level);
};

export const isValidCycle = (cycle) => {
  return ['fixed', 'variable', 'oneoff'].includes(cycle);
};

export const isValidTransactionType = (type) => {
  return ['income', 'expense'].includes(type);
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Check if it's first run
export const isFirstRun = () => {
  const stored = localStorage.getItem('smartBudgetPro_isFirstRun');
  return stored === null || stored === 'true';
};

// Mark first run as complete
export const markNotFirstRun = () => {
  localStorage.setItem('smartBudgetPro_isFirstRun', 'false');
};

// Mark first run (for testing)
export const resetFirstRun = () => {
  localStorage.setItem('smartBudgetPro_isFirstRun', 'true');
};

// Get days in month
export const getDaysInMonth = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Compare two dates (same day)
export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1).toISOString().split('T')[0];
  const d2 = new Date(date2).toISOString().split('T')[0];
  return d1 === d2;
};

// Format phone number (if needed)
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};
