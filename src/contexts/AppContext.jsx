import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTheme } from "@/utils/theme";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(true);

  // Load saved preferences
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      const savedLanguage = await AsyncStorage.getItem("language");

      if (savedTheme) {
        setIsDarkMode(savedTheme === "dark");
      }

      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error("Failed to load preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    try {
      await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  const changeLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    try {
      await AsyncStorage.setItem("language", newLanguage);
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
  };

  const theme = getTheme(isDarkMode);

  const value = {
    // Theme
    isDarkMode,
    theme,
    toggleTheme,

    // Language
    language,
    changeLanguage,

    // Loading state
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
