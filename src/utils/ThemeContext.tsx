import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ThemeConfig {
  // Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  
  // Fonts
  fontFamily: string;
  fontSize: string;
  
  // UI Elements
  borderRadius: string;
  cardStyle: "glass" | "solid" | "minimal";
  
  // Chat
  chatBubbleStyle: "rounded" | "square" | "bubble";
  chatMyMessageBg: string;
  chatOtherMessageBg: string;
}

const defaultTheme: ThemeConfig = {
  primaryColor: "#d4756f",
  secondaryColor: "#c9a28f",
  accentColor: "#fce4da",
  backgroundColor: "#fef9f5",
  textColor: "#2d2424",
  fontFamily: "system-ui",
  fontSize: "16px",
  borderRadius: "1rem",
  cardStyle: "glass",
  chatBubbleStyle: "rounded",
  chatMyMessageBg: "#d4756f",
  chatOtherMessageBg: "#ffffff",
};

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("smileArtistTheme");
      return saved ? JSON.parse(saved) : defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("smileArtistTheme", JSON.stringify(theme));
      applyThemeToDocument(theme);
    }
  }, [theme]);

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

function applyThemeToDocument(theme: ThemeConfig) {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Apply CSS variables
  root.style.setProperty("--theme-primary", theme.primaryColor);
  root.style.setProperty("--theme-secondary", theme.secondaryColor);
  root.style.setProperty("--theme-accent", theme.accentColor);
  root.style.setProperty("--theme-background", theme.backgroundColor);
  root.style.setProperty("--theme-text", theme.textColor);
  root.style.setProperty("--theme-font-family", theme.fontFamily);
  root.style.setProperty("--theme-font-size", theme.fontSize);
  root.style.setProperty("--theme-border-radius", theme.borderRadius);
  root.style.setProperty("--theme-chat-my-bg", theme.chatMyMessageBg);
  root.style.setProperty("--theme-chat-other-bg", theme.chatOtherMessageBg);
  
  // Set card background based on whether we're in dark mode
  // Check if background is dark (assuming dark backgrounds have low luminance)
  const isDark = root.classList.contains('dark');
  root.style.setProperty("--theme-card-bg", isDark ? "#2d2424" : "#ffffff");
}