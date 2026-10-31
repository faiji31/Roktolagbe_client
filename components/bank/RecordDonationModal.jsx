"use client";

import { useState } from "react";
import { BLOOD_GROUPS } from "@/lib/constants";
import { apiFetch } from "@/lib/api";

export default function RecordDonationModal({ isOpen, onClose, onRecorded }) {
  const [form, setForm] = useState({
    donorName: "",
    donorPhone: "",
    donorEmail: "",
    bloodGroup: "O+",
    bags: 1,
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await apiFetch("/banks/staff/donations", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (onRecorded) onRecorded(res.data);
      onClose();
    } catch (err) {
      alert(err.message || "Failed to record donation.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl"
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Record Walk-in / Voluntary Donation
        </h3>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Donor Name
          </label>
          <input
            type="text"
            required
            value={form.donorName}
            onChange={(e) => setForm({ ...form, donorName: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Donor Phone
            </label>
            <input
              type="tel"
              placeholder="017XXXXXXXX"
              value={form.donorPhone}
              onChange={(e) => setForm({ ...form, donorPhone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Donor Email (Optional)
            </label>
            <input
              type="email"
              value={form.donorEmail}
              onChange={(e) => setForm({ ...form, donorEmail: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Blood Group
            </label>
            <select
              value={form.bloodGroup}
              onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
              className={inputClass}
            >
              {BLOOD_GROUPS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Bags Collected
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={form.bags}
              onChange={(e) => setForm({ ...form, bags: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
          >
            {saving ? "Recording..." : "Save & Increment Stock"}
          </button>
        </div>
      </form>
    </div>
  );
}