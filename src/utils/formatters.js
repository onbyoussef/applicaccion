// Utility functions for date formatting
export const formatDate = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export const formatFullDate = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export const formatMonthYear = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Utility functions for currency formatting
export const formatCurrency = (amount, currency = '€') => {
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return `${currency}${formatted}`;
};

export const formatCurrencyShort = (amount, currency = '€') => {
  if (Math.abs(amount) >= 1000000) {
    return `${currency}${(amount / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(amount) >= 1000) {
    return `${currency}${(amount / 1000).toFixed(1)}K`;
  }
  return `${currency}${amount.toFixed(2)}`;
};

// Utility functions for percentage formatting
export const formatPercentage = (value, decimals = 0) => {
  return `${value.toFixed(decimals)}%`;
};

// Utility function for amount formatting
export const formatAmount = (amount) => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Time ago formatting
export const formatTimeAgo = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const seconds = Math.floor((new Date() - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return formatDate(date);
};

// Get greeting based on time of day
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Convert date to YYYY-MM-DD format for input fields
export const dateToInputFormat = (date) => {
  if (typeof date === 'string') {
    return date.split('T')[0];
  }
  return date.toISOString().split('T')[0];
};

// Convert input format to ISO string
export const inputFormatToDate = (inputValue) => {
  return new Date(inputValue + 'T00:00:00').toISOString();
};

export const getTodayISO = () => {
  return new Date().toISOString().split('T')[0];
};
