"use client";

import { BLOOD_GROUPS } from "@/lib/constants";

export default function BloodGroupSelect({
  value,
  onChange,
  allowAll = false,
  label = "Blood Group",
}) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {allowAll && (
          <button
            type="button"
            onClick={() => onChange("")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              !value
                ? "bg-rose-600 text-white border-rose-600"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-500"
            }`}
          >
            All
          </button>
        )}
        {BLOOD_GROUPS.map((group) => {
          const active = value === group;
          return (
            <button
              key={group}
              type="button"
              onClick={() => onChange(group)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                active
                  ? "bg-rose-600 text-white border-rose-600"
                  : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-500"
              }`}
            >
              {group}
            </button>
          );
        })}
      </div>
    </div>
  );
}