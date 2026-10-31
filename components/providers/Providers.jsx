"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { AuthProvider } from "./AuthProvider";
import enMessages from "@/messages/en.json";
import bnMessages from "@/messages/bn.json";

const AppPreferencesContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  locale: "en",
  setLocale: () => {},
  t: enMessages,
});

export function Providers({ children }) {
  const [theme, setTheme] = useState("light");
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const savedTheme = localStorage.getItem("rl_theme") || "light";
    const savedLocale = localStorage.getItem("rl_locale") || "en";
    setTheme(savedTheme);
    setLocale(savedLocale);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("rl_theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.setAttribute("data-theme", next);
  };

  const changeLocale = (nextLocale) => {
    setLocale(nextLocale);
    localStorage.setItem("rl_locale", nextLocale);
  };

  const t = locale === "bn" ? bnMessages : enMessages;

  return (
    <AppPreferencesContext.Provider
      value={{ theme, toggleTheme, locale, setLocale: changeLocale, t }}
    >
      <AuthProvider>{children}</AuthProvider>
    </AppPreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(AppPreferencesContext);
}