"use client";

import { useEffect, useState, useCallback } from "react";
import PageHeader from "@/components/common/PageHeader";
import CampForm from "@/components/camp/CampForm";
import DataTable from "@/components/common/DataTable";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export default function AdminCampsPage() {
  const [camps, setCamps] = useState([]);

  const loadCamps = useCallback(async () => {
    const res = await apiFetch("/camps?upcomingOnly=false");
    setCamps(res.data?.items || []);
  }, []);

  useEffect(() => {
    loadCamps().catch(() => {});
  }, [loadCamps]);

  const columns = [
    { key: "title", header: "Camp Title" },
    { key: "organizer", header: "Organizer" },
    {
      key: "date",
      header: "Date",
      render: (row) => formatDate(row.date),
    },
    { key: "venue", header: "Venue" },
    { key: "participantCount", header: "Registrations" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Blood Donation Camps"
        subtitle="Create and oversee community blood donation events."
      />
      <CampForm onCreated={loadCamps} />
      <DataTable columns={columns} data={camps} />
    </div>
  );
}