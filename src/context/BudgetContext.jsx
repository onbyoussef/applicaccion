import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import storageService from '../services/storageService.js';
import { generateDemoTransactions, generateDemoBudget, generateDemoSettings } from '../data/demoData.js';
import { DEFAULT_SETTINGS, DEFAULT_BUDGET } from '../constants/categories.js';
import { generateId } from '../utils/validators.js';
import { 
  detectUserCurrency, 
  markCurrencyAsAutoDetected
} from '../utils/currencyDetection.js';

export const BudgetContext = createContext();

const initialState = {
  transactions: [],
  budget: DEFAULT_BUDGET,
  settings: DEFAULT_SETTINGS,
  isFirstRun: true,
  hasDemoData: false,
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_STATE':
      return action.payload;

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(tx =>
          tx.id === action.payload.id ? action.payload : tx
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(tx => tx.id !== action.payload),
      };

    case 'SET_BUDGET':
      return {
        ...state,
        budget: action.payload,
      };

    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
      };

    case 'SET_SETTINGS':
      return {
        ...state,
        settings: action.payload,
      };

    case 'SET_THEME':
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.payload,
        },
      };

    case 'SET_CURRENCY':
      return {
        ...state,
        settings: {
          ...state.settings,
          currency: action.payload,
        },
      };

    case 'SET_FIRST_RUN':
      return {
        ...state,
        isFirstRun: action.payload,
      };

    case 'CLEAR_ALL_DATA':
      return {
        ...initialState,
        isLoading: false,
      };

    case 'ADD_DEMO_DATA':
      return {
        ...state,
        transactions: generateDemoTransactions(),
        budget: generateDemoBudget(),
        hasDemoData: true,
      };

    case 'CLEAR_DEMO_DATA':
      return {
        ...state,
        transactions: [],
        hasDemoData: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Initialize from localStorage on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const savedTransactions = storageService.getTransactions();
        const savedBudget = storageService.getBudget();
        const savedSettings = storageService.getSettings();
        const isFirstRun = storageService.isFirstRun();
        const hasDemoData = storageService.hasDemoData();

        let transactions = savedTransactions || [];
        let budget = savedBudget || DEFAULT_BUDGET;
        let settings = savedSettings || DEFAULT_SETTINGS;

        // If first run, add demo data and detect currency
        if (isFirstRun && transactions.length === 0) {
          transactions = generateDemoTransactions();
          budget = generateDemoBudget();
          settings = generateDemoSettings();
          
          // Auto-detect currency on first run
          const detectedCurrency = await detectUserCurrency();
          settings.currency = detectedCurrency;
          markCurrencyAsAutoDetected();
          
          dispatch({ type: 'ADD_DEMO_DATA' });
          storageService.setHasDemoData(true);
          storageService.setSettings(settings);
        }

        dispatch({
          type: 'INIT_STATE',
          payload: {
            transactions,
            budget,
            settings,
            isFirstRun,
            hasDemoData: hasDemoData || isFirstRun,
            isLoading: false,
          },
        });
      } catch (error) {
        console.error('Error initializing from storage:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeApp();
  }, []);

  // Persist state changes to localStorage
  useEffect(() => {
    storageService.setTransactions(state.transactions);
  }, [state.transactions]);

  useEffect(() => {
    storageService.setBudget(state.budget);
  }, [state.budget]);

  useEffect(() => {
    storageService.setSettings(state.settings);
  }, [state.settings]);

  // Action creators
  const addTransaction = useCallback((transaction) => {
    const newTransaction = {
      ...transaction,
      id: transaction?.id || generateId(),
    };
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    return newTransaction;
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    const transaction = state.transactions.find(tx => tx.id === id);
    if (transaction) {
      const updated = { ...transaction, ...updates };
      dispatch({ type: 'UPDATE_TRANSACTION', payload: updated });
      return updated;
    }
  }, [state.transactions]);

  const deleteTransaction = useCallback((id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  }, []);

  const setBudget = useCallback((budget) => {
    dispatch({ type: 'SET_BUDGET', payload: budget });
  }, []);

  const setSettings = useCallback((settings) => {
    dispatch({ type: 'SET_SETTINGS', payload: settings });
  }, []);

  const setTheme = useCallback((theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  }, []);

  const setCurrency = useCallback((currency) => {
    dispatch({ type: 'SET_CURRENCY', payload: currency });
  }, []);

  const completeOnboarding = useCallback(() => {
    dispatch({ type: 'SET_FIRST_RUN', payload: false });
    storageService.setFirstRunComplete();
  }, []);

  const clearAllData = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_DATA' });
    storageService.clearAll();
  }, []);

  const clearDemoData = useCallback(() => {
    dispatch({ type: 'CLEAR_DEMO_DATA' });
    storageService.setHasDemoData(false);
    storageService.setTransactions([]);
  }, []);

  const value = {
    ...state,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setBudget,
    setSettings,
    setTheme,
    setCurrency,
    completeOnboarding,
    clearAllData,
    clearDemoData,
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};
