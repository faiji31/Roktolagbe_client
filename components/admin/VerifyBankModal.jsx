"use client";

import { useState } from "react";
import LocationSelect from "@/components/common/LocationSelect";
import { apiFetch } from "@/lib/api";

export default function VerifyBankModal({ isOpen, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: "",
    licenseNo: "",
    phone: "",
    email: "",
    hours: "24/7 Open",
    location: {
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Dhanmondi",
      address: "",
    },
  });
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch("/admin/banks", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      alert(err.message || "Failed to add blood bank.");
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
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl"
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Add Verified Blood Bank
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Blood Bank Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              DGHS License Number
            </label>
            <input
              type="text"
              required
              value={form.licenseNo}
              onChange={(e) => setForm({ ...form, licenseNo: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Hotline Phone
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Staff Account Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <LocationSelect
          value={form.location}
          onChange={(loc) =>
            setForm({ ...form, location: { ...form.location, ...loc } })
          }
        />

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Street Address
          </label>
          <input
            type="text"
            value={form.location.address}
            onChange={(e) =>
              setForm({
                ...form,
                location: { ...form.location, address: e.target.value },
              })
            }
            className={inputClass}
          />
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
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white"
          >
            {saving ? "Saving..." : "Verify & Create"}
          </button>
        </div>
      </form>
    </div>
  );
}