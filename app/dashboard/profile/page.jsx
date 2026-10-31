"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import EligibilityCountdown from "@/components/blood/EligibilityCountdown";
import AvailabilityToggle from "@/components/blood/AvailabilityToggle";
import { apiFetch } from "@/lib/api";
import DonorProfileForm from "@/components/donar/DonorProfileForm";

export default function DashboardProfilePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/me/profile");
      setData(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Loading donor profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Donor Profile & Availability"
        subtitle="Keep your location and last donation date accurate for emergency matching."
      />

      <EligibilityCountdown eligibility={data?.eligibility} />

      {data?.donorProfile && (
        <AvailabilityToggle initialValue={data.donorProfile.isAvailable} />
      )}

      <DonorProfileForm initialData={data} onSaved={fetchProfile} />
    </div>
  );
}