"use client";

import { useEffect, useState, useCallback } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import ReportActionModal from "@/components/admin/ReportActionModal";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null);

  const loadReports = useCallback(async () => {
    const res = await apiFetch("/reports");
    setReports(res.data?.items || []);
  }, []);

  useEffect(() => {
    loadReports().catch(() => {});
  }, [loadReports]);

  const columns = [
    { key: "targetType", header: "Type" },
    { key: "reason", header: "Reason" },
    { key: "reporterName", header: "Reported By" },
    { key: "status", header: "Status" },
    {
      key: "createdAt",
      header: "Submitted",
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: "action",
      header: "Action",
      render: (row) =>
        row.status === "pending" ? (
          <button
            type="button"
            onClick={() => setActiveReport(row)}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-rose-600 text-white"
          >
            Review
          </button>
        ) : (
          <span className="text-xs text-slate-400">Closed</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Moderation Reports"
        subtitle="Investigate reported requests or users and take enforcement action."
      />
      <DataTable columns={columns} data={reports} />
      <ReportActionModal
        report={activeReport}
        onClose={() => setActiveReport(null)}
        onResolved={loadReports}
      />
    </div>
  );
}