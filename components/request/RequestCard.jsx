import Link from "next/link";
import { MapPin, Calendar, Hospital, Users, ArrowRight } from "lucide-react";
import BloodGroupBadge from "@/components/blood/BloodGroupBadge";
import UrgencyChip from "@/components/blood/UrgencyChip";
import { formatDate } from "@/lib/utils";
import { REQUEST_STATUS_LABELS } from "@/lib/constants";

export default function RequestCard({ request, manageHref }) {
  const detailHref = manageHref || `/requests/${request._id}`;

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between gap-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <BloodGroupBadge group={request.bloodGroup} size="md" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {request.patientName}
              </h3>
              <p className="text-xs text-slate-500">
                {request.bagsNeeded} Bag(s) Needed •{" "}
                <span className="font-semibold text-rose-600">
                  {REQUEST_STATUS_LABELS[request.status] || request.status}
                </span>
              </p>
            </div>
          </div>
          <UrgencyChip urgency={request.urgency} />
        </div>

        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <p className="flex items-center gap-2">
            <Hospital className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {request.hospitalName}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {[
                request.location?.upazila,
                request.location?.district,
                request.location?.division,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Needed By: {formatDate(request.neededBy, true)}</span>
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          <span>{request.responseCount || 0} donor(s) accepted</span>
        </span>

        <Link
          href={detailHref}
          className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700"
        >
          <span>{manageHref ? "Manage Request" : "View & Help"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}