"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import RequestResponses from "@/components/request/RequestResponses";
import ShareRequestCard from "@/components/request/ShareRequestCard";
import { apiFetch } from "@/lib/api";
import DonorCard from "@/components/donar/DonorCard";

export default function ManageRequestDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/requests/${id}`);
      setRequest(res.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadDetails();
  }, [id, loadDetails]);

  const handleCancelRequest = async () => {
    if (!confirm("Cancel this blood request?")) return;
    await apiFetch(`/requests/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: "cancelled" }),
    });
    loadDetails();
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Loading request management...
      </div>
    );
  }

  if (!request) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Request not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Manage Request: ${request.patientName} (${request.bloodGroup})`}
        subtitle={`${request.hospitalName} • Status: ${request.status.toUpperCase()}`}
        actions={
          request.status === "open" || request.status === "in_progress" ? (
            <button
              type="button"
              onClick={handleCancelRequest}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:text-rose-600"
            >
              Cancel Request
            </button>
          ) : null
        }
      />

      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Responding Donors ({request.responses?.length || 0})
        </h2>
        <RequestResponses
          requestId={request._id}
          requestStatus={request.status}
          responses={request.responses || []}
          onUpdated={loadDetails}
        />
      </div>

      <ShareRequestCard request={request} />

      {request.matchedDonorsPreview?.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Notified Compatible Donors in {request.location?.district}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {request.matchedDonorsPreview.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}