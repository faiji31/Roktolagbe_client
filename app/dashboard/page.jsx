"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, FileHeart, Sparkles, UserCheck } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import EligibilityCountdown from "@/components/blood/EligibilityCountdown";
import AvailabilityToggle from "@/components/blood/AvailabilityToggle";
import { apiFetch } from "@/lib/api";

export default function DashboardOverviewPage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/me/profile")
      .then((res) => setProfileData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="My Total Donations"
          value={profileData?.stats?.totalDonations || 0}
          subtitle="Verified life-saving donations"
          icon={Award}
          color="rose"
        />
        <StatCard
          label="Compatible Nearby Requests"
          value={profileData?.stats?.matchingRequestsCount || 0}
          subtitle="Patients you can help in your district"
          icon={Sparkles}
          color="emerald"
        />
        <StatCard
          label="My Blood Requests"
          value={profileData?.stats?.myRequestsCount || 0}
          subtitle="Requests posted by you"
          icon={FileHeart}
          color="blue"
        />
      </div>

      <EligibilityCountdown eligibility={profileData?.eligibility} />

      {profileData?.donorProfile ? (
        <AvailabilityToggle
          initialValue={profileData.donorProfile.isAvailable}
        />
      ) : (
        <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/30 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Complete your Donor Profile
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Add your blood group and upazila so patients near you can alert you in emergencies.
            </p>
          </div>
          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white"
          >
            <UserCheck className="w-4 h-4" />
            <span>Setup Profile</span>
          </Link>
        </div>
      )}
    </div>
  );
}