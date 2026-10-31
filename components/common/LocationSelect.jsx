"use client";

import locationsData from "@/data/locations.json";

export default function LocationSelect({
  value = { division: "", district: "", upazila: "" },
  onChange,
  allowAll = false,
}) {
  const selectedDivisionObj = locationsData.find(
    (d) => d.division === value.division
  );
  const districts = selectedDivisionObj ? selectedDivisionObj.districts : [];

  const selectedDistrictObj = districts.find(
    (d) => d.district === value.district
  );
  const upazilas = selectedDistrictObj ? selectedDistrictObj.upazilas : [];

  const handleDivisionChange = (e) => {
    onChange({
      division: e.target.value,
      district: "",
      upazila: "",
    });
  };

  const handleDistrictChange = (e) => {
    onChange({
      ...value,
      district: e.target.value,
      upazila: "",
    });
  };

  const handleUpazilaChange = (e) => {
    onChange({
      ...value,
      upazila: e.target.value,
    });
  };

  const selectClass =
    "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          Division
        </label>
        <select
          value={value.division || ""}
          onChange={handleDivisionChange}
          className={selectClass}
        >
          <option value="">{allowAll ? "All Divisions" : "Select Division"}</option>
          {locationsData.map((item) => (
            <option key={item.division} value={item.division}>
              {item.division}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          District
        </label>
        <select
          value={value.district || ""}
          onChange={handleDistrictChange}
          disabled={!value.division}
          className={selectClass}
        >
          <option value="">{allowAll ? "All Districts" : "Select District"}</option>
          {districts.map((item) => (
            <option key={item.district} value={item.district}>
              {item.district}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          Upazila / Thana
        </label>
        <select
          value={value.upazila || ""}
          onChange={handleUpazilaChange}
          disabled={!value.district}
          className={selectClass}
        >
          <option value="">{allowAll ? "All Upazilas" : "Select Upazila"}</option>
          {upazilas.map((upazila) => (
            <option key={upazila} value={upazila}>
              {upazila}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}