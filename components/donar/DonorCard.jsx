import { MapPin, Phone, ShieldCheck, Calendar, Award } from "lucide-react";
import BloodGroupBadge from "@/components/blood/BloodGroupBadge";
import { formatDate } from "@/lib/utils";

export default function DonorCard({ donor }) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <BloodGroupBadge group={donor.bloodGroup} size="md" />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {donor.name}
              </h3>
              {donor.verifiedBadge && (
                <ShieldCheck
                  className="w-4 h-4 text-emerald-600 shrink-0"
                  title="Verified Donor"
                />
              )}
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>
                {[
                  donor.location?.upazila,
                  donor.location?.district,
                  donor.location?.division,
                ]
                  .filter(Boolean)
                  .join(", ") || "Location not set"}
              </span>
            </p>
          </div>
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
            donor.isEligible && donor.isAvailable
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300"
              : "bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300"
          }`}
        >
          {donor.isEligible && donor.isAvailable
            ? "Eligible Now"
            : donor.remainingDays > 0
            ? `Eligible in ${donor.remainingDays}d`
            : "Unavailable"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono">{donor.maskedPhone || "Hidden"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-rose-500" />
          <span>{donor.totalDonations || 0} Donations</span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Last Donated:{" "}
            {donor.lastDonatedAt ? formatDate(donor.lastDonatedAt) : "Never / Ready"}
          </span>
        </div>
      </div>
    </div>
  );
}