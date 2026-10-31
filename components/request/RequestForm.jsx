"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BloodGroupSelect from "@/components/blood/BloodGroupSelect";
import LocationSelect from "@/components/common/LocationSelect";
import { URGENCY_LEVELS } from "@/lib/constants";
import { validateBloodRequestForm } from "@/lib/validators";
import { apiFetch } from "@/lib/api";

export default function RequestForm({ user }) {
  const router = useRouter();
  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "O+",
    bagsNeeded: 1,
    urgency: "urgent",
    hospitalName: "",
    location: {
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Dhanmondi",
      address: "",
    },
    neededBy: "",
    contactName: user?.name || "",
    contactPhone: user?.phone || "",
    reason: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validation = validateBloodRequestForm(form);
    if (!validation.isValid) {
      setError(Object.values(validation.errors)[0]);
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch("/requests", {
        method: "POST",
        body: JSON.stringify(form),
      });
      router.push(`/dashboard/requests/${res.data._id}`);
    } catch (err) {
      setError(err.message || "Failed to create blood request.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
    >
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Patient Name
          </label>
          <input
            type="text"
            required
            value={form.patientName}
            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Hospital / Clinic Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Dhaka Medical College Hospital"
            value={form.hospitalName}
            onChange={(e) => setForm({ ...form, hospitalName: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <BloodGroupSelect
        label="Required Blood Group"
        value={form.bloodGroup}
        onChange={(group) => setForm({ ...form, bloodGroup: group })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Bags Needed
          </label>
          <input
            type="number"
            min="1"
            max="20"
            required
            value={form.bagsNeeded}
            onChange={(e) => setForm({ ...form, bagsNeeded: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Urgency Level
          </label>
          <select
            value={form.urgency}
            onChange={(e) => setForm({ ...form, urgency: e.target.value })}
            className={inputClass}
          >
            {URGENCY_LEVELS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Needed By (Date & Time)
          </label>
          <input
            type="datetime-local"
            required
            value={form.neededBy}
            onChange={(e) => setForm({ ...form, neededBy: e.target.value })}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Contact Person Name
          </label>
          <input
            type="text"
            required
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Contact Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="017XXXXXXXX"
            value={form.contactPhone}
            onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Medical Reason / Ward Details
          </label>
          <input
            type="text"
            placeholder="e.g. Dengue / Surgery, Ward 4, Bed 12"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Additional Notes for Donors
          </label>
          <input
            type="text"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
      >
        {submitting ? "Posting & Alerting Donors..." : "Publish Blood Request"}
      </button>
    </form>
  );
}