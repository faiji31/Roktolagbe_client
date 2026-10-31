"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";

import { apiFetch } from "@/lib/api";
import DonationHistoryList from "@/components/donar/DonationHistoryList";

export default function MyDonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/me/donations")
      .then((res) => setDonations(res.data?.items || []))
      .catch(() => setDonations([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Donation History & Certificates"
        subtitle="Download official PDF appreciation certificates for your verified donations."
      />
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">
          Loading donation history...
        </div>
      ) : (
        <DonationHistoryList donations={donations} />
      )}
    </div>
  );
}