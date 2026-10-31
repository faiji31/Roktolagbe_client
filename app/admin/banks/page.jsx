"use client";

import { useEffect, useState, useCallback } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import VerifyBankModal from "@/components/admin/VerifyBankModal";
import { apiFetch } from "@/lib/api";

export default function AdminBanksPage() {
  const [banks, setBanks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadBanks = useCallback(async () => {
    const res = await apiFetch("/banks?includeUnverified=true");
    setBanks(res.data?.items || []);
  }, []);

  useEffect(() => {
    loadBanks().catch(() => {});
  }, [loadBanks]);

  const toggleVerify = async (bank) => {
    await apiFetch("/admin/banks", {
      method: "POST",
      body: JSON.stringify({
        bankId: bank._id,
        isVerified: !bank.isVerified,
      }),
    });
    loadBanks();
  };

  const columns = [
    { key: "name", header: "Bank Name" },
    { key: "licenseNo", header: "License" },
    {
      key: "district",
      header: "District",
      render: (row) => row.location?.district || "Dhaka",
    },
    { key: "phone", header: "Phone" },
    {
      key: "isVerified",
      header: "Verification",
      render: (row) => (
        <button
          type="button"
          onClick={() => toggleVerify(row)}
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            row.isVerified
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {row.isVerified ? "Verified" : "Unverified"}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blood Banks Verification"
        subtitle="Onboard and verify licensed hospital and community blood banks."
        actions={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white"
          >
            + Add Blood Bank
          </button>
        }
      />

      <DataTable columns={columns} data={banks} />

      <VerifyBankModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={loadBanks}
      />
    </div>
  );
}