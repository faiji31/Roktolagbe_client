"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { apiFetch } from "@/lib/api";

export default function AdminBanksApprovalPage() {
  const [banks, setBanks] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const loadBanks = useCallback(async () => {
    const res = await apiFetch("/banks?includeUnverified=true");
    setBanks(res.data?.items || []);
  }, []);

  useEffect(() => {
    loadBanks().catch(() => {});
  }, [loadBanks]);

  const handleApprovalChange = async (bank, nextVerifiedState) => {
    setLoadingId(bank._id);
    try {
      await apiFetch("/admin/banks", {
        method: "POST",
        body: JSON.stringify({
          bankId: bank._id,
          isVerified: nextVerifiedState,
        }),
      });
      await loadBanks();
    } catch (err) {
      alert(err.message || "Failed to update bank approval status.");
    } finally {
      setLoadingId(null);
    }
  };

  const columns = [
    {
      key: "name",
      header: "Blood Bank Name",
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-white">{row.name}</p>
          <p className="text-xs text-slate-500">
            {row.address || row.location?.address || ""}
          </p>
        </div>
      ),
    },
    { key: "licenseNo", header: "License No" },
    {
      key: "district",
      header: "Location",
      render: (row) =>
        [row.location?.upazila, row.location?.district]
          .filter(Boolean)
          .join(", ") || "N/A",
    },
    { key: "phone", header: "Phone" },
    {
      key: "status",
      header: "Status",
      render: (row) =>
        row.isVerified ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approved</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Approval</span>
          </span>
        ),
    },
    {
      key: "action",
      header: "Admin / Moderator Decision",
      render: (row) =>
        row.isVerified ? (
          <button
            type="button"
            disabled={loadingId === row._id}
            onClick={() => handleApprovalChange(row, false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-300 hover:bg-rose-100"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Revoke Approval</span>
          </button>
        ) : (
          <button
            type="button"
            disabled={loadingId === row._id}
            onClick={() => handleApprovalChange(row, true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {loadingId === row._id ? "Approving..." : "Approve Bank"}
            </span>
          </button>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blood Bank Approvals"
        subtitle="Review blood banks registered by Blood Bank Staff. Only approved blood banks appear in the public directory."
      />

      <DataTable
        columns={columns}
        data={banks}
        emptyMessage="No blood banks have been submitted by Blood Bank Staff yet."
      />
    </div>
  );
}