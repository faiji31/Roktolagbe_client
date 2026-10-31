"use client";

import { useState } from "react";
import BloodGroupSelect from "@/components/blood/BloodGroupSelect";
import LocationSelect from "@/components/common/LocationSelect";
import { apiFetch } from "@/lib/api";

export default function DonorProfileForm({ initialData, onSaved }) {
  const [form, setForm] = useState({
    name: initialData?.user?.name || initialData?.donorProfile?.name || "",
    bloodGroup:
      initialData?.donorProfile?.bloodGroup ||
      initialData?.user?.bloodGroup ||
      "O+",
    phone: initialData?.donorProfile?.phone || initialData?.user?.phone || "",
    gender: initialData?.donorProfile?.gender || "",
    weightKg: initialData?.donorProfile?.weightKg || 55,
    lastDonatedAt: initialData?.donorProfile?.lastDonatedAt
      ? new Date(initialData.donorProfile.lastDonatedAt)
          .toISOString()
          .slice(0, 10)
      : "",
    location: {
      division: initialData?.donorProfile?.location?.division || "Dhaka",
      district: initialData?.donorProfile?.location?.district || "Dhaka",
      upazila: initialData?.donorProfile?.location?.upazila || "Dhanmondi",
      address: initialData?.donorProfile?.location?.address || "",
    },
    bio: initialData?.donorProfile?.bio || "",
    isAvailable:
      typeof initialData?.donorProfile?.isAvailable === "boolean"
        ? initialData.donorProfile.isAvailable
        : true,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await apiFetch("/me/profile", {
        method: "PUT",
        body: JSON.stringify({
          ...form,
          lastDonatedAt: form.lastDonatedAt || null,
        }),
      });
      setMessage("Donor profile saved successfully!");
      if (onSaved) onSaved(res.data);
    } catch (err) {
      setError(err.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
    >
      {message && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          {message}
        </div>
      )}
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Full Name
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
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Mobile Number (Masked in public search)
          </label>
          <input
            type="tel"
            required
            placeholder="017XXXXXXXX"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <BloodGroupSelect
        label="Your Blood Group"
        value={form.bloodGroup}
        onChange={(group) => setForm({ ...form, bloodGroup: group })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Gender
          </label>
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            className={inputClass}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            min="45"
            max="160"
            value={form.weightKg}
            onChange={(e) => setForm({ ...form, weightKg: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Last Donation Date (Leave blank if none)
          </label>
          <input
            type="date"
            value={form.lastDonatedAt}
            onChange={(e) => setForm({ ...form, lastDonatedAt: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <LocationSelect
        value={form.location}
        onChange={(loc) =>
          setForm({
            ...form,
            location: { ...form.location, ...loc },
          })
        }
      />

      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          Street Address / Landmark (Optional)
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

      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          Short Note (Preferred donation hours or hospital area)
        </label>
        <textarea
          rows={2}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
      >
        {saving ? "Saving Profile..." : "Save Donor Profile"}
      </button>
    </form>
  );
}