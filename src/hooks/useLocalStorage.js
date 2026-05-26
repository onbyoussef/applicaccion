import { useState, useEffect, useCallback } from 'react';
import { debounce } from '../utils/validators.js';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Debounced function to update localStorage
  const debouncedWrite = useCallback(
    debounce((value) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error writing ${key} to localStorage:`, error);
      }
    }, 500),
    [key]
  );

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      debouncedWrite(valueToStore);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  }, [storedValue, debouncedWrite]);

  return [storedValue, setValue];
};
