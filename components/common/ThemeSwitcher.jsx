"use client";

import { Sun, Moon } from "lucide-react";
import { usePreferences } from "@/components/providers/Providers";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = usePreferences();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      title="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}