"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function AvailabilityToggle({ initialValue = true, onUpdated }) {
  const [isAvailable, setIsAvailable] = useState(Boolean(initialValue));
  const [saving, setSaving] = useState(false);

  const handleToggle = async () => {
    const nextValue = !isAvailable;
    setSaving(true);
    try {
      await apiFetch("/me/availability", {
        method: "PATCH",
        body: JSON.stringify({ isAvailable: nextValue }),
      });
      setIsAvailable(nextValue);
      if (onUpdated) onUpdated(nextValue);
    } catch (err) {
      alert(err.message || "Please complete your donor profile first.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div>
        <p className="text-sm font-bold text-slate-900 dark:text-white">
          Donor Availability Status
        </p>
        <p className="text-xs text-slate-500">
          {isAvailable
            ? "You are visible in public donor searches and emergency alerts."
            : "You are currently hidden from public donor searches."}
        </p>
      </div>

      <button
        type="button"
        disabled={saving}
        onClick={handleToggle}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
          isAvailable
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
        }`}
      >
        {saving ? "Saving..." : isAvailable ? "Available to Donate" : "Unavailable"}
      </button>
    </div>
  );
}