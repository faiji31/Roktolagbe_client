"use client";

import { useState } from "react";
import { Phone, Eye, CheckCircle2 } from "lucide-react";
import BloodGroupBadge from "@/components/blood/BloodGroupBadge";
import { apiFetch } from "@/lib/api";

export default function RequestResponses({
  requestId,
  requestStatus,
  responses = [],
  onUpdated,
}) {
  const [loadingId, setLoadingId] = useState(null);

  const handleReveal = async (responseId) => {
    setLoadingId(responseId);
    try {
      await apiFetch(`/requests/${requestId}/responses/${responseId}/reveal`, {
        method: "POST",
      });
      if (onUpdated) onUpdated();
    } catch (err) {
      alert(err.message || "Could not reveal contact.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleMarkFulfilled = async (donorId) => {
    setLoadingId(donorId);
    try {
      await apiFetch(`/requests/${requestId}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "fulfilled",
          fulfilledDonorId: donorId,
        }),
      });
      if (onUpdated) onUpdated();
    } catch (err) {
      alert(err.message || "Failed to mark request as fulfilled.");
    } finally {
      setLoadingId(null);
    }
  };

  if (!responses.length) {
    return (
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-500">
        No donors have responded yet. Nearby compatible donors have been notified.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {responses.map((resp) => (
        <div
          key={resp._id}
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <BloodGroupBadge group={resp.bloodGroup} size="sm" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {resp.donorName}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {resp.donorPhone}
                </span>
              </p>
              {resp.note && (
                <p className="mt-1 text-xs italic text-slate-500">
                  &ldquo;{resp.note}&rdquo;
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!resp.contactRevealed && resp.status === "accepted" && (
              <button
                type="button"
                disabled={loadingId === resp._id}
                onClick={() => handleReveal(resp._id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 hover:bg-amber-100"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>
                  {loadingId === resp._id ? "Revealing..." : "Reveal Phone"}
                </span>
              </button>
            )}

            {requestStatus !== "fulfilled" && resp.status === "accepted" && (
              <button
                type="button"
                disabled={loadingId === resp.donorId}
                onClick={() => handleMarkFulfilled(resp.donorId)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirm Donation</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}