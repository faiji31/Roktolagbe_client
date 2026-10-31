"use client";

import { useState } from "react";
import LocationSelect from "@/components/common/LocationSelect";
import { apiFetch } from "@/lib/api";

export default function CampForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    organizer: "",
    date: "",
    startTime: "09:00 AM",
    endTime: "04:00 PM",
    venue: "",
    location: {
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Dhanmondi",
    },
    contactPhone: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await apiFetch("/camps", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({
        ...form,
        title: "",
        organizer: "",
        venue: "",
        description: "",
      });
      if (onCreated) onCreated(res.data);
    } catch (err) {
      alert(err.message || "Could not create camp.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
    >
      <h3 className="text-base font-bold text-slate-900 dark:text-white">
        Organize a Blood Donation Camp
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Camp Title
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Organizer Club / Institution
          </label>
          <input
            type="text"
            required
            value={form.organizer}
            onChange={(e) => setForm({ ...form, organizer: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Camp Date
          </label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Venue Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. TSC Auditorium"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Coordinator Phone
          </label>
          <input
            type="tel"
            required
            value={form.contactPhone}
            onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <LocationSelect
        value={form.location}
        onChange={(loc) => setForm({ ...form, location: loc })}
      />

      <button
        type="submit"
        disabled={saving}
        className="px-5 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
      >
        {saving ? "Publishing..." : "Publish Camp"}
      </button>
    </form>
  );
}