"use client";

import { useTheme } from "next-themes";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColors = {
  [key: string]: string;
};

interface ThemeContextProps {
  colors: ThemeColors;
  updateColor: (name: string, value: string) => void;
  isReady: boolean;
}

const lightThemeDefaults = {
  foreground: "oklch(0.141 0.005 285.823)",
  background: "oklch(1 0 0)",
  primary: "oklch(0.21 0.006 285.885)",
  secondary: "oklch(0.967 0.001 286.375)",
  accent: "oklch(0.967 0.001 286.375)",
};

const darkThemeDefaults = {
  foreground: "oklch(0.985 0 0)",
  background: "oklch(0.141 0.005 285.823)",
  primary: "oklch(0.92 0.004 286.32)",
  secondary: "oklch(0.274 0.006 286.033)",
  accent: "oklch(0.274 0.006 286.033)",
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeColorsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, resolvedTheme } = useTheme();
  const [colors, setColors] = useState<ThemeColors>(
    resolvedTheme === "dark" ? darkThemeDefaults : lightThemeDefaults,
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const style = getComputedStyle(root);

    try {
      const initialColors = {
        foreground:
          style.getPropertyValue("--foreground").trim() ||
          (resolvedTheme === "dark"
            ? darkThemeDefaults.foreground
            : lightThemeDefaults.foreground),
        background:
          style.getPropertyValue("--background").trim() ||
          (resolvedTheme === "dark"
            ? darkThemeDefaults.background
            : lightThemeDefaults.background),
        primary:
          style.getPropertyValue("--primary").trim() ||
          (resolvedTheme === "dark"
            ? darkThemeDefaults.primary
            : lightThemeDefaults.primary),
        secondary:
          style.getPropertyValue("--secondary").trim() ||
          (resolvedTheme === "dark"
            ? darkThemeDefaults.secondary
            : lightThemeDefaults.secondary),
        accent:
          style.getPropertyValue("--accent").trim() ||
          (resolvedTheme === "dark"
            ? darkThemeDefaults.accent
            : lightThemeDefaults.accent),
      };

      setColors(initialColors);
      setIsReady(true);
    } catch (e) {
      console.error("Error loading initial colors:", e);
      setColors(
        resolvedTheme === "dark" ? darkThemeDefaults : lightThemeDefaults,
      );
      setIsReady(true);
    }
  }, [theme, resolvedTheme]);

  const updateColor = (name: string, value: string) => {
    setColors((prev) => ({ ...prev, [name]: value }));

    document.documentElement.style.setProperty(`--${name}`, value);

    if (name === "primary") {
      document.documentElement.style.setProperty(
        `--primary-foreground`,
        getContrastColor(value),
      );
    } else if (name === "secondary") {
      document.documentElement.style.setProperty(
        `--secondary-foreground`,
        getContrastColor(value),
      );
    } else if (name === "accent") {
      document.documentElement.style.setProperty(
        `--accent-foreground`,
        getContrastColor(value),
      );
    }
  };

  const getContrastColor = (hex: string) => {
    if (hex.startsWith("oklch")) {
      const match = hex.match(/oklch\(\s*([0-9.]+)/);
      if (match && match[1]) {
        const lightness = parseFloat(match[1]);
        return lightness > 0.5 ? "oklch(0.2 0 0)" : "oklch(0.95 0 0)";
      }
      return "oklch(0.95 0 0)";
    }

    try {
      let hexColor = hex;
      if (hex.startsWith("#")) {
        hexColor = hex.slice(1);
      }

      const r = parseInt(hexColor.slice(0, 2), 16);
      const g = parseInt(hexColor.slice(2, 4), 16);
      const b = parseInt(hexColor.slice(4, 6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? "#000000" : "#ffffff";
    } catch (e) {
      console.log(e);
      return "#ffffff";
    }
  };

  return (
    <ThemeContext.Provider value={{ colors, updateColor, isReady }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeColors = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeColors must be used within a ThemeColorsProvider");
  }
  return context;
};
