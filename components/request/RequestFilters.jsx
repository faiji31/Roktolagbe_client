"use client";

import BloodGroupSelect from "@/components/blood/BloodGroupSelect";
import LocationSelect from "@/components/common/LocationSelect";
import { URGENCY_LEVELS } from "@/lib/constants";

export default function RequestFilters({ filters, onChange }) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <BloodGroupSelect
          allowAll
          label="Blood Group"
          value={filters.bloodGroup || ""}
          onChange={(group) =>
            onChange({ ...filters, bloodGroup: group, page: 1 })
          }
        />

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Urgency
          </label>
          <select
            value={filters.urgency || ""}
            onChange={(e) =>
              onChange({ ...filters, urgency: e.target.value, page: 1 })
            }
            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium"
          >
            <option value="">All Urgencies</option>
            {URGENCY_LEVELS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <LocationSelect
        allowAll
        value={{
          division: filters.division || "",
          district: filters.district || "",
          upazila: filters.upazila || "",
        }}
        onChange={(loc) =>
          onChange({
            ...filters,
            division: loc.division,
            district: loc.district,
            upazila: loc.upazila,
            page: 1,
          })
        }
      />
    </div>
  );
}