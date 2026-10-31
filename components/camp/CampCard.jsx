"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Tent } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { apiFetch } from "@/lib/api";

export default function CampCard({ camp, onJoined }) {
  const [joining, setJoining] = useState(false);

  const handleJoin = async () => {
    setJoining(true);
    try {
      await apiFetch(`/camps/${camp._id}/register`, { method: "POST" });
      alert("You are registered for this blood donation camp!");
      if (onJoined) onJoined();
    } catch (err) {
      alert(err.message || "Please log in to register for a camp.");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between gap-4">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-rose-600 font-semibold">
          <span className="inline-flex items-center gap-1">
            <Tent className="w-3.5 h-3.5" />
            <span>{camp.organizer}</span>
          </span>
          <span>{formatDate(camp.date)}</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {camp.title}
        </h3>

        {camp.description && (
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {camp.description}
          </p>
        )}

        <div className="space-y-1 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {camp.startTime} – {camp.endTime}
            </span>
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>
              {[
                camp.venue,
                camp.location?.upazila,
                camp.location?.district,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          <span>{camp.participantCount || 0} registered</span>
        </span>

        <button
          type="button"
          disabled={joining}
          onClick={handleJoin}
          className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
        >
          {joining ? "Joining..." : "Join Camp"}
        </button>
      </div>
    </div>
  );
}