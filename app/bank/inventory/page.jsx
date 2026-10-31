"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import InventoryGrid from "@/components/bank/InventoryGrid";
import { apiFetch } from "@/lib/api";

export default function BankInventoryPage() {
  const [bank, setBank] = useState(null);

  useEffect(() => {
    apiFetch("/banks/staff/me")
      .then((res) => setBank(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Blood Bag Inventory"
        subtitle="Update available units for each blood group. Low stock groups (<5 bags) are highlighted."
      />
      {bank && (
        <InventoryGrid
          initialInventory={bank.inventory}
          editable={true}
          onSaved={setBank}
        />
      )}
    </div>
  );
}