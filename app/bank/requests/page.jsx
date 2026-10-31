"use client";

import PageHeader from "@/components/common/PageHeader";
import RequestCard from "@/components/request/RequestCard";
import { useRequests } from "@/hooks/useRequests";

export default function BankRequestsPage() {
  const { requests, loading } = useRequests({ limit: 18 });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Active Patient Blood Requests"
        subtitle="Coordinate with patients needing blood units from your bank."
      />
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">
          Loading requests...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {requests.map((r) => (
            <RequestCard key={r._id} request={r} />
          ))}
        </div>
      )}
    </div>
  );
}