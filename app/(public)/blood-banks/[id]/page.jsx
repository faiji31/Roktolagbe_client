"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Phone, ShieldCheck, Clock } from "lucide-react";
import InventoryGrid from "@/components/bank/InventoryGrid";
import { apiFetch } from "@/lib/api";

export default function BloodBankDetailPage() {
  const { id } = useParams();
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/banks/${id}`)
      .then((res) => setBank(res.data))
      .catch(() => setBank(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Loading blood bank details...
      </div>
    );
  }

  if (!bank) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Blood bank not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {bank.name}
            </h1>
            {bank.isVerified && (
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            )}
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <Clock className="w-3.5 h-3.5" />
            <span>{bank.hours || "24/7 Open"}</span>
          </span>
        </div>

        <p className="text-xs text-slate-500">
          DGHS License No: <strong>{bank.licenseNo}</strong>
        </p>

        <div className="flex flex-wrap gap-6 pt-2 text-sm text-slate-600 dark:text-slate-300">
          <p className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>
              {[
                bank.location?.address,
                bank.location?.upazila,
                bank.location?.district,
                bank.location?.division,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>
          </p>
          <p className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span className="font-mono font-bold">{bank.phone}</span>
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
          Current Blood Bag Stock
        </h2>
        <InventoryGrid initialInventory={bank.inventory} editable={false} />
      </div>
    </div>
  );
}