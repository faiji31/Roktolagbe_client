"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    apiFetch("/admin/audit-logs")
      .then((res) => setLogs(res.data?.items || []))
      .catch(() => {});
  }, []);

  const columns = [
    { key: "action", header: "Action" },
    { key: "actorName", header: "Admin / Moderator" },
    { key: "targetType", header: "Target" },
    { key: "details", header: "Details" },
    {
      key: "createdAt",
      header: "Timestamp",
      render: (row) => formatDate(row.createdAt, true),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="System Audit Logs"
        subtitle="Immutable record of administrative actions, role changes, and moderation decisions."
      />
      <DataTable columns={columns} data={logs} />
    </div>
  );
}