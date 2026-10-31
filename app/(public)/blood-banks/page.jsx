"use client";

import { useEffect, useState, useCallback } from "react";
import PageHeader from "@/components/common/PageHeader";
import LocationSelect from "@/components/common/LocationSelect";
import BloodGroupSelect from "@/components/blood/BloodGroupSelect";
import BankCard from "@/components/bank/BankCard";
import EmptyState from "@/components/common/EmptyState";
import { apiFetch } from "@/lib/api";

export default function BloodBanksDirectoryPage() {
  const [filters, setFilters] = useState({
    bloodGroup: "",
    division: "",
    district: "",
    upazila: "",
  });
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBanks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });
      const res = await apiFetch(`/banks?${params.toString()}`);
      setBanks(res.data?.items || []);
    } catch {
      setBanks([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadBanks();
  }, [loadBanks]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verified Blood Bank Directory"
        subtitle="Check real-time blood bag availability across licensed blood banks in Bangladesh."
      />

      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <BloodGroupSelect
          allowAll
          label="Filter by Available Stock Group"
          value={filters.bloodGroup}
          onChange={(group) => setFilters({ ...filters, bloodGroup: group })}
        />
        <LocationSelect
          allowAll
          value={filters}
          onChange={(loc) => setFilters({ ...filters, ...loc })}
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">
          Loading blood banks...
        </div>
      ) : banks.length === 0 ? (
        <EmptyState
          title="No matching blood banks found"
          description="Try clearing the blood group or district filter."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {banks.map((bank) => (
            <BankCard key={bank._id} bank={bank} />
          ))}
        </div>
      )}
    </div>
  );
}