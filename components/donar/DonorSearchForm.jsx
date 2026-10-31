"use client";

import BloodGroupSelect from "@/components/blood/BloodGroupSelect";
import LocationSelect from "@/components/common/LocationSelect";
import { RotateCcw } from "lucide-react";

export default function DonorSearchForm({ filters, onChange, onReset }) {
  const handleLocationChange = (loc) => {
    onChange({
      ...filters,
      division: loc.division,
      district: loc.district,
      upazila: loc.upazila,
      page: 1,
    });
  };

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
      <BloodGroupSelect
        allowAll
        label="Filter by Blood Group"
        value={filters.bloodGroup || ""}
        onChange={(group) => onChange({ ...filters, bloodGroup: group, page: 1 })}
      />

      <LocationSelect
        allowAll
        value={{
          division: filters.division || "",
          district: filters.district || "",
          upazila: filters.upazila || "",
        }}
        onChange={handleLocationChange}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-700 dark:text-slate-300">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.compatible === "true"}
              onChange={(e) =>
                onChange({
                  ...filters,
                  compatible: e.target.checked ? "true" : "false",
                  page: 1,
                })
              }
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span>Include all compatible donor groups</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onlyEligible !== "false"}
              onChange={(e) =>
                onChange({
                  ...filters,
                  onlyEligible: e.target.checked ? "true" : "false",
                  page: 1,
                })
              }
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span>Only currently eligible donors</span>
          </label>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
}