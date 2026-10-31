"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function RespondModal({
  isOpen,
  requestId,
  onClose,
  onSuccess,
}) {
  const [status, setStatus] = useState("accepted");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await apiFetch(`/requests/${requestId}/respond`, {
        method: "POST",
        body: JSON.stringify({ status, note }),
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || "Could not submit your response.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl"
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Respond to Blood Request
        </h3>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setStatus("accepted")}
            className={`py-2.5 rounded-xl text-xs font-bold border ${
              status === "accepted"
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-slate-300 dark:border-slate-700"
            }`}
          >
            I Can Donate
          </button>
          <button
            type="button"
            onClick={() => setStatus("declined")}
            className={`py-2.5 rounded-xl text-xs font-bold border ${
              status === "declined"
                ? "bg-slate-700 text-white border-slate-700"
                : "border-slate-300 dark:border-slate-700"
            }`}
          >
            Unavailable Now
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Short Note for Requester (e.g. arrival time)
          </label>
          <textarea
            rows={3}
            placeholder="I can reach the hospital by 5:00 PM..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm"
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
            disabled={submitting}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Response"}
          </button>
        </div>
      </form>
    </div>
  );
}