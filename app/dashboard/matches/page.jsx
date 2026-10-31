"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import RequestCard from "@/components/request/RequestCard";
import EmptyState from "@/components/common/EmptyState";
import { apiFetch } from "@/lib/api";

export default function MatchingRequestsPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/me/matches")
      .then((res) => setMatches(res.data?.items || []))
      .catch(() => setMatches([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Requests I Can Help With"
        subtitle="Open blood requests in your district that are compatible with your blood group."
      />

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">
          Finding compatible patients near you...
        </div>
      ) : matches.length === 0 ? (
        <EmptyState
          title="No matching requests in your district right now"
          description="Make sure your blood group and district are saved in your Donor Profile."
          actionLabel="Update Donor Profile"
          actionHref="/dashboard/profile"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {matches.map((reqItem) => (
            <RequestCard key={reqItem._id} request={reqItem} />
          ))}
        </div>
      )}
    </div>
  );
}