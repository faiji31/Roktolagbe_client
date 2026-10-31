"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ShareRequestCard({ request }) {
  const [copied, setCopied] = useState(false);

  if (!request) return null;

  const shareText = `🩸 URGENT ${request.bloodGroup} BLOOD NEEDED 🩸\nPatient: ${
    request.patientName
  }\nBags: ${request.bagsNeeded}\nHospital: ${request.hospitalName}, ${
    request.location?.upazila
  }, ${request.location?.district}\nNeeded By: ${formatDate(
    request.neededBy,
    true
  )}\nView & Help on RoktoLagbe: ${
    typeof window !== "undefined" ? window.location.origin : ""
  }/requests/${request._id}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-rose-700 dark:text-rose-300">
          <Share2 className="w-4 h-4" />
          <span>Share Emergency Appeal</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied Post!" : "Copy Appeal Text"}</span>
        </button>
      </div>
      <pre className="text-xs whitespace-pre-wrap font-sans text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
        {shareText}
      </pre>
    </div>
  );
}