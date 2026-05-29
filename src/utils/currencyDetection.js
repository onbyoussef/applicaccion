/**
 * Detect user's currency based on their country using ipapi.co
 * No API key required
 */

const COUNTRY_TO_CURRENCY = {
  // Europe - EUR
  ES: 'EUR', // Spain
  FR: 'EUR', // France
  DE: 'EUR', // Germany
  IT: 'EUR', // Italy
  PT: 'EUR', // Portugal
  AT: 'EUR', // Austria
  BE: 'EUR', // Belgium
  BG: 'EUR', // Bulgaria
  HR: 'EUR', // Croatia
  CY: 'EUR', // Cyprus
  CZ: 'EUR', // Czech Republic
  DK: 'EUR', // Denmark
  EE: 'EUR', // Estonia
  GR: 'EUR', // Greece
  HU: 'EUR', // Hungary
  IE: 'EUR', // Ireland
  LV: 'EUR', // Latvia
  LT: 'EUR', // Lithuania
  LU: 'EUR', // Luxembourg
  MT: 'EUR', // Malta
  NL: 'EUR', // Netherlands
  PL: 'EUR', // Poland
  RO: 'EUR', // Romania
  SK: 'EUR', // Slovakia
  SI: 'EUR', // Slovenia
  FI: 'EUR', // Finland
  SE: 'EUR', // Sweden
  // Americas - USD/CAD
  US: 'USD', // United States
  CA: 'USD', // Canada (also uses CAD, but defaulting to USD)
  // UK
  GB: 'GBP', // United Kingdom
  // North Africa
  MA: 'MAD', // Morocco
  // Default
};

/**
 * Fetch user's country from ipapi.co and map to currency
 * @returns {Promise<string>} Currency code (EUR, USD, GBP, MAD, or USD as default)
 */
export const detectUserCurrency = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    
    if (!response.ok) {
      console.warn('Failed to fetch IP location data');
      return 'USD'; // Silently fall back to USD
    }
    
    const data = await response.json();
    const countryCode = data.country_code;
    
    if (!countryCode) {
      return 'USD';
    }
    
    const currency = COUNTRY_TO_CURRENCY[countryCode] || 'USD';
    return currency;
  } catch (error) {
    console.warn('Currency detection failed:', error.message);
    // Silently fail and return USD default
    return 'USD';
  }
};

/**
 * Check if a currency was auto-detected
 * Store this separately so we know when to show the "Auto-detected" badge
 * @returns {boolean} Whether currency was auto-detected (from localStorage)
 */
export const isAutoDetectedCurrency = () => {
  try {
    const detected = localStorage.getItem('smartBudgetPro_currencyAutoDetected');
    return detected === 'true';
  } catch {
    return false;
  }
};

/**
 * Mark currency as auto-detected
 */
export const markCurrencyAsAutoDetected = () => {
  try {
    localStorage.setItem('smartBudgetPro_currencyAutoDetected', 'true');
  } catch {
    // Silently fail
  }
};

/**
 * Clear the auto-detected flag (when user manually selects a currency)
 */
export const clearAutoDetectedFlag = () => {
  try {
    localStorage.removeItem('smartBudgetPro_currencyAutoDetected');
  } catch {
    // Silently fail
  }
};
