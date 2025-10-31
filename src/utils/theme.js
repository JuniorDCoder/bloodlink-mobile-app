// Theme system for light and dark modes
export const lightTheme = {
  // Background colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F8F9FA",
    tertiary: "#F1F3F4",
    modal: "#FFFFFF",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  // Text colors
  text: {
    primary: "#1A1A1A",
    secondary: "#4A5568",
    tertiary: "#718096",
    inverse: "#FFFFFF",
    placeholder: "rgba(26, 26, 26, 0.4)",
  },

  // Card and surface colors
  surface: {
    primary: "#FFFFFF",
    secondary: "#F7FAFC",
    elevated: "#FFFFFF",
    border: "rgba(26, 26, 26, 0.1)",
    input: "rgba(26, 26, 26, 0.05)",
  },

  // Brand colors (consistent across themes)
  brand: {
    primary: "#DC143C",
    secondary: "#8A2BE2",
    accent: "#22C55E",
    warning: "#FFA500",
    success: "#22C55E",
    error: "#DC143C",
  },

  // Gradients
  gradient: {
    primary: ["#FFFFFF", "#F8F9FA", "#FFFFFF"],
    brand: ["rgba(220, 20, 60, 0.1)", "rgba(138, 43, 226, 0.1)"],
    surface: ["rgba(255, 255, 255, 0.9)", "rgba(248, 249, 250, 0.9)"],
  },

  // Shadow colors
  shadow: {
    primary: "rgba(0, 0, 0, 0.1)",
    elevated: "rgba(0, 0, 0, 0.15)",
    brand: "rgba(220, 20, 60, 0.2)",
  },
};

export const darkTheme = {
  // Background colors
  background: {
    primary: "#0D0D0D",
    secondary: "#1A1A1A",
    tertiary: "#2D2D2D",
    modal: "#1A1A1A",
    overlay: "rgba(0, 0, 0, 0.8)",
  },

  // Text colors
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.7)",
    tertiary: "rgba(255, 255, 255, 0.6)",
    inverse: "#1A1A1A",
    placeholder: "rgba(255, 255, 255, 0.4)",
  },

  // Card and surface colors
  surface: {
    primary: "rgba(255, 255, 255, 0.03)",
    secondary: "rgba(255, 255, 255, 0.05)",
    elevated: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.1)",
    input: "rgba(255, 255, 255, 0.05)",
  },

  // Brand colors (consistent across themes)
  brand: {
    primary: "#DC143C",
    secondary: "#8A2BE2",
    accent: "#22C55E",
    warning: "#FFA500",
    success: "#22C55E",
    error: "#DC143C",
  },

  // Gradients
  gradient: {
    primary: ["#0D0D0D", "#1A1A1A", "#0D0D0D"],
    brand: ["rgba(220, 20, 60, 0.2)", "rgba(138, 43, 226, 0.2)"],
    surface: ["rgba(13, 13, 13, 0.95)", "rgba(26, 26, 26, 0.95)"],
  },

  // Shadow colors
  shadow: {
    primary: "rgba(0, 0, 0, 0.3)",
    elevated: "rgba(0, 0, 0, 0.5)",
    brand: "rgba(220, 20, 60, 0.3)",
  },
};

// Theme utilities
export const getTheme = (isDark) => (isDark ? darkTheme : lightTheme);
