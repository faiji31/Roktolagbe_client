"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function ReportActionModal({ report, onClose, onResolved }) {
  const [status, setStatus] = useState("resolved");
  const [resolutionNote, setResolutionNote] = useState("");
  const [banTargetUser, setBanTargetUser] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!report) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch(`/reports/${report._id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, resolutionNote, banTargetUser }),
      });
      if (onResolved) onResolved();
      onClose();
    } catch (err) {
      alert(err.message || "Failed to update report.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl"
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Moderate Report
        </h3>
        <p className="text-xs text-slate-500">
          Reason: <strong className="text-slate-800 dark:text-slate-200">{report.reason}</strong>
        </p>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Outcome
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
          >
            <option value="resolved">Mark Resolved</option>
            <option value="dismissed">Dismiss Report</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Moderator Note
          </label>
          <textarea
            rows={2}
            value={resolutionNote}
            onChange={(e) => setResolutionNote(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
          />
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-rose-600 cursor-pointer">
          <input
            type="checkbox"
            checked={banTargetUser}
            onChange={(e) => setBanTargetUser(e.target.checked)}
          />
          <span>Also suspend target user account</span>
        </label>

        <div className="flex items-center justify-end gap-2 pt-2">
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
            {saving ? "Saving..." : "Save Decision"}
          </button>
        </div>
      </form>
    </div>
  );
}