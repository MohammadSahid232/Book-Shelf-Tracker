import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      root.style.setProperty("--color-primary", "#3b82f6");
      root.style.setProperty("--color-primary-hover", "#2563eb");
      root.style.setProperty("--color-secondary", "#60a5fa");
      root.style.setProperty("--color-bg", "#0b1120");
      root.style.setProperty("--color-surface", "#111827");
      root.style.setProperty("--color-border", "#1e3a5f");
      root.style.setProperty("--color-text", "#e2e8f0");
      root.style.setProperty("--color-text-muted", "#94a3b8");
      root.style.setProperty("--color-badge-bg", "#1e3a5f");
      root.style.setProperty("--color-badge-text", "#93c5fd");
      root.style.setProperty("--color-card-hover", "#1a2744");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      root.style.setProperty("--color-primary", "#1d4ed8");
      root.style.setProperty("--color-primary-hover", "#1e40af");
      root.style.setProperty("--color-secondary", "#3b82f6");
      root.style.setProperty("--color-bg", "#f0f4ff");
      root.style.setProperty("--color-surface", "#ffffff");
      root.style.setProperty("--color-border", "#c7d4f0");
      root.style.setProperty("--color-text", "#1e2a4a");
      root.style.setProperty("--color-text-muted", "#64748b");
      root.style.setProperty("--color-badge-bg", "#dbeafe");
      root.style.setProperty("--color-badge-text", "#1d4ed8");
      root.style.setProperty("--color-card-hover", "#eff6ff");
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
