import Link from "next/link";
import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Nothing found",
  description = "Try adjusting your search filters or check back soon.",
  actionLabel,
  actionHref,
}) {
  return (
    <div className="p-10 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 text-center max-w-lg mx-auto my-6">
      <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto mb-3">
        <Inbox className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-4 inline-block px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}