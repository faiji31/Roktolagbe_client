import { CheckCircle2, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function EligibilityCountdown({ eligibility }) {
  if (!eligibility) return null;

  const { isEligible, remainingDays, eligibleOn } = eligibility;

  if (isEligible) {
    return (
      <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30 flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
        <div>
          <p className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
            You are eligible to donate blood today!
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            Your 90-day recovery window is complete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 flex items-center gap-3">
      <Clock className="w-6 h-6 text-amber-600 shrink-0" />
      <div>
        <p className="text-sm font-bold text-amber-900 dark:text-amber-300">
          Recovery Cooldown: {remainingDays} day(s) remaining
        </p>
        <p className="text-xs text-amber-700 dark:text-amber-400">
          Next eligible donation date: {formatDate(eligibleOn)}
        </p>
      </div>
    </div>
  );
}