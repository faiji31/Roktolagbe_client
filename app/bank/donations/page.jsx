"use client";

import { useEffect, useState, useCallback } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import RecordDonationModal from "@/components/bank/RecordDonationModal";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export default function BankDonationsPage() {
  const [donations, setDonations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadDonations = useCallback(async () => {
    const res = await apiFetch("/banks/staff/donations");
    setDonations(res.data?.items || []);
  }, []);

  useEffect(() => {
    loadDonations().catch(() => {});
  }, [loadDonations]);

  const columns = [
    { key: "donorName", header: "Donor Name" },
    { key: "bloodGroup", header: "Blood Group" },
    { key: "bags", header: "Bags" },
    { key: "donorPhone", header: "Phone" },
    {
      key: "donatedAt",
      header: "Date",
      render: (row) => formatDate(row.donatedAt, true),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recorded Walk-in Donations"
        subtitle="Donations recorded at your blood bank automatically update stock and issue donor certificates."
        actions={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white"
          >
            + Record Donation
          </button>
        }
      />

      <DataTable columns={columns} data={donations} />

      <RecordDonationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRecorded={loadDonations}
      />
    </div>
  );
}