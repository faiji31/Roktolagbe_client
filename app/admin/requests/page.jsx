"use client";

import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import UrgencyChip from "@/components/blood/UrgencyChip";
import { useRequests } from "@/hooks/useRequests";
import { formatDate } from "@/lib/utils";

export default function AdminRequestsPage() {
  const { requests } = useRequests({ limit: 30 });

  const columns = [
    { key: "patientName", header: "Patient" },
    { key: "bloodGroup", header: "Group" },
    { key: "hospitalName", header: "Hospital" },
    {
      key: "urgency",
      header: "Urgency",
      render: (row) => <UrgencyChip urgency={row.urgency} />,
    },
    { key: "status", header: "Status" },
    {
      key: "neededBy",
      header: "Needed By",
      render: (row) => formatDate(row.neededBy, true),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Blood Requests"
        subtitle="Monitor active and fulfilled blood requests across the platform."
      />
      <DataTable columns={columns} data={requests} />
    </div>
  );
}