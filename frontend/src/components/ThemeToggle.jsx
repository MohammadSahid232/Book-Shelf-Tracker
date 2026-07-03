import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      // Dark: BookShelf image — dark forest olive green + orange accents
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      root.style.setProperty("--color-bg",            "#1a2415");
      root.style.setProperty("--color-surface",        "#243020");
      root.style.setProperty("--color-border",         "#3a5030");
      root.style.setProperty("--color-text",           "#f0ede5");
      root.style.setProperty("--color-text-muted",     "#9aac80");
      root.style.setProperty("--color-primary",        "#e8843a");
      root.style.setProperty("--color-primary-hover",  "#c8601a");
      root.style.setProperty("--color-secondary",      "#f0a060");
      root.style.setProperty("--color-accent",         "#f5b880");
      root.style.setProperty("--color-badge-bg",       "#3a5030");
      root.style.setProperty("--color-badge-text",     "#f0a060");
      root.style.setProperty("--color-card-hover",     "#2e3e28");
      root.style.setProperty("--color-star",           "#f5c040");
      root.style.setProperty("--color-danger",         "#e05050");
      root.style.setProperty("--color-danger-hover",   "#1f0f0f");
    } else {
      // Light: warm off-white + olive green + orange accents
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      root.style.setProperty("--color-bg",            "#f5f0e8");
      root.style.setProperty("--color-surface",        "#ffffff");
      root.style.setProperty("--color-border",         "#d6c9a8");
      root.style.setProperty("--color-text",           "#1a1f0f");
      root.style.setProperty("--color-text-muted",     "#5a6a40");
      root.style.setProperty("--color-primary",        "#c8601a");
      root.style.setProperty("--color-primary-hover",  "#a84e14");
      root.style.setProperty("--color-secondary",      "#e8843a");
      root.style.setProperty("--color-accent",         "#f0a060");
      root.style.setProperty("--color-badge-bg",       "#fde9d4");
      root.style.setProperty("--color-badge-text",     "#c8601a");
      root.style.setProperty("--color-card-hover",     "#fdf3e7");
      root.style.setProperty("--color-star",           "#e8a020");
      root.style.setProperty("--color-danger",         "#c0392b");
      root.style.setProperty("--color-danger-hover",   "#fdf0ee");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="theme-toggle-btn"
    >
      {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
