"use client";

import { useEffect, useState } from "react";
import { Users, FileHeart, Building2, ShieldAlert } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import Charts from "@/components/admin/Charts";
import { apiFetch } from "@/lib/api";

export default function AdminOverviewPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    apiFetch("/admin/analytics")
      .then((res) => setAnalytics(res.data))
      .catch(() => {});
  }, []);

  if (!analytics) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Loading platform analytics...
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