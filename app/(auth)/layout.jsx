import Link from "next/link";
import { Droplet } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <Link
        href="/"
        className="flex items-center gap-2 font-bold text-2xl text-rose-600 mb-6"
      >
        <span className="p-2 rounded-xl bg-rose-600 text-white">
          <Droplet className="w-5 h-5 fill-current" />
        </span>
        <span>RoktoLagbe</span>
      </Link>

      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        {children}
      </div>
    </div>
  );
}