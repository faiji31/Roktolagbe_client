"use client";

import { usePreferences } from "@/components/providers/Providers";

export default function LanguageSwitcher() {
  const { locale, setLocale } = usePreferences();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "en" ? "bn" : "en")}
      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {locale === "en" ? "বাংলা" : "EN"}
    </button>
  );
}