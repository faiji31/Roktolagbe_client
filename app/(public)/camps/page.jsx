"use client";

import { useEffect, useState, useCallback } from "react";
import PageHeader from "@/components/common/PageHeader";
import CampCard from "@/components/camp/CampCard";
import EmptyState from "@/components/common/EmptyState";
import { apiFetch } from "@/lib/api";

export default function PublicCampsPage() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCamps = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/camps");
      setCamps(res.data?.items || []);
    } catch {
      setCamps([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCamps();
  }, [loadCamps]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Upcoming Blood Donation Camps"
        subtitle="Join community blood drives organized by universities, clubs, and hospitals."
      />

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">
          Loading upcoming camps...
        </div>
      ) : camps.length === 0 ? (
        <EmptyState
          title="No upcoming blood camps scheduled"
          description="Log in to your dashboard to organize a new community blood donation drive."
          actionLabel="Organize a Camp"
          actionHref="/dashboard/camps"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {camps.map((camp) => (
            <CampCard key={camp._id} camp={camp} onJoined={loadCamps} />
          ))}
        </div>
      )}
    </div>
  );
}