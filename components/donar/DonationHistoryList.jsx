"use client";

import { Download, Award, Calendar, Building2 } from "lucide-react";
import BloodGroupBadge from "@/components/blood/BloodGroupBadge";
import { formatDate } from "@/lib/utils";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function DonationHistoryList({ donations = [] }) {
  if (!donations.length) {
    return (
      <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-sm text-slate-500">
        You have no recorded donations yet. Once a requester or blood bank confirms your donation, your record and PDF certificate will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {donations.map((item) => (
        <div
          key={item._id}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <BloodGroupBadge group={item.bloodGroup} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {item.hospitalName || item.bankName || "Medical Center"}
                </h4>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <Award className="w-3 h-3" />
                  <span>{item.bags || 1} Bag(s)</span>
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(item.donatedAt)}</span>
                </span>
                {item.patientName && (
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Patient: {item.patientName}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <a
            href={`${API_BASE_URL}/donations/${item._id}/certificate`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300 hover:bg-rose-100"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate (PDF)</span>
          </a>
        </div>
      ))}
    </div>
  );
}