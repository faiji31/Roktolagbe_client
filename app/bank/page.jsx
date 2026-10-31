"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import InventoryGrid from "@/components/bank/InventoryGrid";
import RecordDonationModal from "@/components/bank/RecordDonationModal";
import { apiFetch } from "@/lib/api";

export default function BankOverviewPage() {
  const [bank, setBank] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadBank = async () => {
    const res = await apiFetch("/banks/staff/me");
    setBank(res.data);
  };

  useEffect(() => {
    loadBank().catch(() => {});
  }, []);

  if (!bank) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Loading blood bank profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={bank.name}
        subtitle={`License: ${bank.licenseNo} • ${bank.location?.address || ""}`}
        actions={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
          >
            + Record Walk-in Donation
          </button>
        }
      />

      <InventoryGrid
        initialInventory={bank.inventory}
        editable={true}
        onSaved={(updated) => setBank(updated)}
      />

      <RecordDonationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRecorded={loadBank}
      />
    </div>
  );
}