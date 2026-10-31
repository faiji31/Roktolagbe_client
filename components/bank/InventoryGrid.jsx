"use client";

import { useState } from "react";
import { BLOOD_GROUPS } from "@/lib/constants";
import { apiFetch } from "@/lib/api";

export default function InventoryGrid({
  initialInventory = {},
  editable = false,
  onSaved,
}) {
  const [inventory, setInventory] = useState(initialInventory);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (group, val) => {
    setInventory({
      ...inventory,
      [group]: Math.max(0, parseInt(val, 10) || 0),
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await apiFetch("/banks/staff/inventory", {
        method: "PUT",
        body: JSON.stringify({ inventory }),
      });
      setMessage("Inventory saved!");
      if (onSaved) onSaved(res.data);
    } catch (err) {
      alert(err.message || "Failed to update inventory.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {BLOOD_GROUPS.map((group) => {
          const count = inventory?.[group] ?? 0;
          const isLow = count < 5;
          return (
            <div
              key={group}
              className={`p-4 rounded-2xl border bg-white dark:bg-slate-900 ${
                isLow
                  ? "border-amber-300 dark:border-amber-800"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-extrabold text-rose-600">
                  {group}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    isLow
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  }`}
                >
                  {isLow ? "Low Stock" : "Available"}
                </span>
              </div>

              {editable ? (
                <input
                  type="number"
                  min="0"
                  value={count}
                  onChange={(e) => handleChange(group, e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-lg font-bold"
                />
              ) : (
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {count} <span className="text-xs font-normal text-slate-500">bags</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {editable && (
        <div className="flex items-center gap-4">
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {saving ? "Updating Stock..." : "Save Stock Inventory"}
          </button>
          {message && (
            <span className="text-xs font-semibold text-emerald-600">
              {message}
            </span>
          )}
        </div>
      )}
    </div>
  );
}