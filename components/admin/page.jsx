"use client";

import { useEffect, useState, useCallback } from "react";
import { Users, FileHeart, Building2, ShieldAlert, RefreshCw } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import Charts from "@/components/admin/Charts";
import { apiFetch } from "@/lib/api";

export default function AdminOverviewPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/admin/analytics");
      setAnalytics(res.data);
    } catch (err) {
      setError(err.message || "Failed to load analytics from server (port 5000).");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Loading platform analytics...
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="p-6 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 text-center space-y-3">
        <p className="text-sm font-bold text-rose-600 dark:text-rose-400">
          Could not load Admin Analytics
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {error}
        </p>
        <button
          type="button"
          onClick={loadAnalytics}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  const { counts, donorsByBloodGroup, requestsByStatus } = analytics;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Registered Users"
          value={counts.totalUsers}
          subtitle={`${counts.totalDonors} active donor profiles`}
          icon={Users}
          color="rose"
        />
        <StatCard
          label="Total Blood Requests"
          value={counts.totalRequests}
          subtitle={`${counts.totalDonations} recorded donations`}
          icon={FileHeart}
          color="emerald"
        />
        <StatCard
          label="Blood Banks"
          value={counts.totalBanks}
          subtitle="Verified partner centers"
          icon={Building2}
          color="blue"
        />
        <StatCard
          label="Pending Reports"
          value={counts.pendingReports}
          subtitle="Awaiting moderation"
          icon={ShieldAlert}
          color="amber"
        />
      </div>

      <Charts
        donorsByBloodGroup={donorsByBloodGroup}
        requestsByStatus={requestsByStatus}
      />
    </div>
  );
}