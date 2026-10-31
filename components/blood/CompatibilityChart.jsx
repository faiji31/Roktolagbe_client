import { COMPATIBILITY_MAP } from "@/lib/bloodCompatibility";
import { BLOOD_GROUPS } from "@/lib/constants";

export default function CompatibilityChart() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Blood Group Compatibility Reference
        </h3>
        <p className="text-xs text-slate-500">
          Check who can donate to or receive from each blood group.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500">
            <tr>
              <th className="py-3 px-4">Blood Group</th>
              <th className="py-3 px-4">Can Donate To</th>
              <th className="py-3 px-4">Can Receive From</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {BLOOD_GROUPS.map((group) => (
              <tr key={group}>
                <td className="py-3 px-4 font-bold text-rose-600">{group}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {COMPATIBILITY_MAP[group].canDonateTo.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {COMPATIBILITY_MAP[group].canReceiveFrom.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded-md text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}