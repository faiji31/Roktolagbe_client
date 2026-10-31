"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Hospital,
  MapPin,
  Calendar,
  Phone,
  User,
  Flag,
  HeartHandshake,
} from "lucide-react";
import BloodGroupBadge from "@/components/blood/BloodGroupBadge";
import UrgencyChip from "@/components/blood/UrgencyChip";
import RespondModal from "@/components/request/RespondModal";
import ShareRequestCard from "@/components/request/ShareRequestCard";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { REQUEST_STATUS_LABELS } from "@/lib/constants";

export default function PublicRequestDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [respondOpen, setRespondOpen] = useState(false);

  const loadRequest = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/requests/${id}`);
      setRequest(res.data);
    } catch {
      setRequest(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadRequest();
  }, [id, loadRequest]);

  const handleReport = async () => {
    const reason = prompt("Why are you reporting this request?");
    if (!reason) return;
    try {
      await apiFetch("/reports", {
        method: "POST",
        body: JSON.stringify({
          targetType: "request",
          targetId: id,
          reason,
        }),
      });
      alert("Report submitted to moderators.");
    } catch (err) {
      alert(err.message || "Please log in to submit a report.");
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Loading request details...
      </div>
    );
  }

  if (!request) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Blood request not found.
      </div>
    );
  }

  const isOwner = user && String(user.id) === String(request.requesterId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <BloodGroupBadge group={request.bloodGroup} size="lg" />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Patient: {request.patientName}
                </h1>
                <UrgencyChip urgency={request.urgency} />
              </div>
              <p className="text-sm text-slate-500 mt-1">
                {request.bagsNeeded} Bag(s) Required • Status:{" "}
                <strong className="text-rose-600">
                  {REQUEST_STATUS_LABELS[request.status] || request.status}
                </strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOwner ? (
              <Link
                href={`/dashboard/requests/${request._id}`}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900"
              >
                Manage Request & Responses
              </Link>
            ) : user ? (
              <button
                type="button"
                onClick={() => setRespondOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>
                  {request.myResponse
                    ? `Responded (${request.myResponse.status})`
                    : "I Can Donate"}
                </span>
              </button>
            ) : (
              <Link
                href={`/login?callbackUrl=/requests/${request._id}`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700"
              >
                Log In to Donate
              </Link>
            )}

            <button
              type="button"
              onClick={handleReport}
              title="Report suspicious request"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
            <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Hospital className="w-4 h-4 text-rose-600" />
              <span className="font-semibold">{request.hospitalName}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>
                {[
                  request.location?.address,
                  request.location?.upazila,
                  request.location?.district,
                  request.location?.division,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </p>
            <p className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Needed By: {formatDate(request.neededBy, true)}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
            <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <User className="w-4 h-4 text-rose-600" />
              <span>Contact: {request.contactName}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span className="font-mono font-bold">{request.contactPhone}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              Full contact number unlocks automatically once you accept the request.
            </p>
          </div>
        </div>

        {(request.reason || request.notes) && (
          <div className="space-y-2 text-sm border-t border-slate-100 dark:border-slate-800 pt-4">
            {request.reason && (
              <p>
                <strong className="text-slate-700 dark:text-slate-300">
                  Medical Reason:{" "}
                </strong>
                <span className="text-slate-600 dark:text-slate-400">
                  {request.reason}
                </span>
              </p>
            )}
            {request.notes && (
              <p>
                <strong className="text-slate-700 dark:text-slate-300">
                  Notes:{" "}
                </strong>
                <span className="text-slate-600 dark:text-slate-400">
                  {request.notes}
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      <ShareRequestCard request={request} />

      <RespondModal
        isOpen={respondOpen}
        requestId={request._id}
        onClose={() => setRespondOpen(false)}
        onSuccess={loadRequest}
      />
    </div>
  );
}