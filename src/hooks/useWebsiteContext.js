'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS, DEFAULT_USER_CUSTOMIZATION } from '@/utils/localStorage';
import { getTemplateById } from '@/data/templates';

// Create context
const WebsiteContext = createContext();

export function WebsiteProvider({ children }) {
  // State for user customization data
  const [customization, setCustomization] = useState(DEFAULT_USER_CUSTOMIZATION);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const storedCustomization = getStorageItem(STORAGE_KEYS.USER_CUSTOMIZATION, DEFAULT_USER_CUSTOMIZATION);
    setCustomization(storedCustomization);
    setIsLoading(false);
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      setStorageItem(STORAGE_KEYS.USER_CUSTOMIZATION, customization);
    }
  }, [customization, isLoading]);
  
  // Update business name
  const updateBusinessName = (name) => {
    setCustomization(prev => ({
      ...prev,
      businessName: name
    }));
  };
  
  // Update logo
  const updateLogo = (logoUrl) => {
    setCustomization(prev => ({
      ...prev,
      logo: logoUrl
    }));
  };
  
  // Select template
  const selectTemplate = (templateId) => {
    const template = getTemplateById(templateId);
    
    setCustomization(prev => ({
      ...prev,
      selectedTemplate: templateId,
      customizations: {
        ...prev.customizations,
        colors: {
          primary: template.colors.primary,
          secondary: template.colors.secondary,
        }
      }
    }));
  };
  
  // Update color
  const updateColor = (colorKey, value) => {
    setCustomization(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        colors: {
          ...prev.customizations.colors,
          [colorKey]: value
        }
      }
    }));
  };
  
  // Update font
  const updateFont = (fontKey, value) => {
    setCustomization(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        fonts: {
          ...prev.customizations.fonts,
          [fontKey]: value
        }
      }
    }));
  };
  
  // Toggle section visibility
  const toggleSection = (sectionKey) => {
    setCustomization(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        sections: {
          ...prev.customizations.sections,
          [sectionKey]: !prev.customizations.sections[sectionKey]
        }
      }
    }));
  };
  
  // Reset to defaults
  const resetCustomization = () => {
    setCustomization(DEFAULT_USER_CUSTOMIZATION);
  };
  
  // Context value
  const value = {
    customization,
    isLoading,
    updateBusinessName,
    updateLogo,
    selectTemplate,
    updateColor,
    updateFont,
    toggleSection,
    resetCustomization
  };
  
  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
}

// Custom hook to use the context
export function useWebsiteContext() {
  const context = useContext(WebsiteContext);
  
  if (context === undefined) {
    throw new Error('useWebsiteContext must be used within a WebsiteProvider');
  }
  
  return context;
}
