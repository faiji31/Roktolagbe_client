import Link from "next/link";
import { MapPin, Phone, ShieldCheck, Clock } from "lucide-react";
import { BLOOD_GROUPS } from "@/lib/constants";

export default function BankCard({ bank }) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {bank.name}
              </h3>
              {bank.isVerified && (
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
            </div>
            <p className="text-xs text-slate-500">License: {bank.licenseNo}</p>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
            <Clock className="w-3 h-3" />
            <span>{bank.hours || "24/7"}</span>
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>
            {[
              bank.location?.address,
              bank.location?.upazila,
              bank.location?.district,
            ]
              .filter(Boolean)
              .join(", ")}
          </span>
        </p>

        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{bank.phone}</span>
        </p>
      </div>

      <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
        {BLOOD_GROUPS.map((group) => {
          const units = bank.inventory?.[group] ?? 0;
          return (
            <div
              key={group}
              className={`p-1.5 rounded-lg text-center border ${
                units > 0
                  ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/30"
                  : "border-slate-200 dark:border-slate-800 opacity-50"
              }`}
            >
              <p className="text-[11px] font-bold text-rose-600">{group}</p>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {units}
              </p>
            </div>
          );
        })}
      </div>

      <Link
        href={`/blood-banks/${bank._id}`}
        className="text-center py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white transition-colors"
      >
        View Full Stock Details
      </Link>
    </div>
  );
}