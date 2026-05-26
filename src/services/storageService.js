// LocalStorage service for data persistence
const STORAGE_PREFIX = 'smartBudgetPro_';

export const storageService = {
  // Transactions
  getTransactions: () => {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}transactions`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading transactions from storage:', error);
      return [];
    }
  },

  setTransactions: (transactions) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}transactions`, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions to storage:', error);
    }
  },

  // Budget
  getBudget: () => {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}budget`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading budget from storage:', error);
      return null;
    }
  },

  setBudget: (budget) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}budget`, JSON.stringify(budget));
    } catch (error) {
      console.error('Error saving budget to storage:', error);
    }
  },

  // Settings
  getSettings: () => {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}settings`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading settings from storage:', error);
      return null;
    }
  },

  setSettings: (settings) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}settings`, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to storage:', error);
    }
  },

  // Theme
  getTheme: () => {
    try {
      const theme = localStorage.getItem(`${STORAGE_PREFIX}theme`);
      return theme || 'dark';
    } catch (error) {
      console.error('Error reading theme from storage:', error);
      return 'dark';
    }
  },

  setTheme: (theme) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}theme`, theme);
    } catch (error) {
      console.error('Error saving theme to storage:', error);
    }
  },

  // Currency
  getCurrency: () => {
    try {
      const currency = localStorage.getItem(`${STORAGE_PREFIX}currency`);
      return currency || 'EUR';
    } catch (error) {
      console.error('Error reading currency from storage:', error);
      return 'EUR';
    }
  },

  setCurrency: (currency) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}currency`, currency);
    } catch (error) {
      console.error('Error saving currency to storage:', error);
    }
  },

  // First run status
  isFirstRun: () => {
    try {
      const status = localStorage.getItem(`${STORAGE_PREFIX}isFirstRun`);
      return status === null || status === 'true';
    } catch (error) {
      console.error('Error reading first run status from storage:', error);
      return true;
    }
  },

  setFirstRunComplete: () => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}isFirstRun`, 'false');
    } catch (error) {
      console.error('Error saving first run status to storage:', error);
    }
  },

  // Demo data flag
  hasDemoData: () => {
    try {
      const flag = localStorage.getItem(`${STORAGE_PREFIX}hasDemoData`);
      return flag === 'true';
    } catch (error) {
      console.error('Error reading demo data flag from storage:', error);
      return false;
    }
  },

  setHasDemoData: (flag) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}hasDemoData`, flag ? 'true' : 'false');
    } catch (error) {
      console.error('Error saving demo data flag to storage:', error);
    }
  },

  // Generic get/set
  get: (key) => {
    try {
      const data = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  },

  // Clear all app data
  clearAll: () => {
    try {
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith(STORAGE_PREFIX)
      );
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  // Export all data
  exportData: () => {
    try {
      const data = {
        transactions: this.getTransactions(),
        budget: this.getBudget(),
        settings: this.getSettings(),
        theme: this.getTheme(),
        currency: this.getCurrency(),
        exportDate: new Date().toISOString(),
      };
      return data;
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  },

  // Import data
  importData: (data) => {
    try {
      if (data.transactions) this.setTransactions(data.transactions);
      if (data.budget) this.setBudget(data.budget);
      if (data.settings) this.setSettings(data.settings);
      if (data.theme) this.setTheme(data.theme);
      if (data.currency) this.setCurrency(data.currency);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },
};

export default storageService;
