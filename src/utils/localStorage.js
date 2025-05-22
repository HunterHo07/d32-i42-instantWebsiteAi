// Utility functions for working with localStorage

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

/**
 * Get an item from localStorage
 * @param {string} key - The key to retrieve
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} The stored value or defaultValue
 */
export const getStorageItem = (key, defaultValue = null) => {
  if (!isBrowser) return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Set an item in localStorage
 * @param {string} key - The key to set
 * @param {any} value - The value to store
 * @returns {boolean} Success status
 */
export const setStorageItem = (key, value) => {
  if (!isBrowser) return false;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
    return false;
  }
};

/**
 * Remove an item from localStorage
 * @param {string} key - The key to remove
 * @returns {boolean} Success status
 */
export const removeStorageItem = (key) => {
  if (!isBrowser) return false;
  
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
    return false;
  }
};

/**
 * Clear all items from localStorage
 * @returns {boolean} Success status
 */
export const clearStorage = () => {
  if (!isBrowser) return false;
  
  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Storage keys
export const STORAGE_KEYS = {
  USER_CUSTOMIZATION: 'instantWebsiteAi_userCustomization',
  SELECTED_TEMPLATE: 'instantWebsiteAi_selectedTemplate',
  BUSINESS_INFO: 'instantWebsiteAi_businessInfo',
};

// Default user customization data
export const DEFAULT_USER_CUSTOMIZATION = {
  businessName: 'Your Business',
  logo: null,
  selectedTemplate: 'modern-business',
  customizations: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
    },
    fonts: {
      heading: 'Inter',
      body: 'Roboto',
    },
    sections: {
      hero: true,
      features: true,
      testimonials: true,
      contact: true,
    },
  },
};
