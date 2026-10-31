"use client";

import Link from "next/link";
import { PlusCircle, LogOut, Home } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import BloodGroupBadge from "@/components/blood/BloodGroupBadge";

export default function DashboardHeader({ title = "Dashboard" }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h1>
        {user?.bloodGroup && <BloodGroupBadge group={user.bloodGroup} size="sm" />}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/requests/new"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Request Blood</span>
        </Link>

        <Link
          href="/"
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Public Home"
        >
          <Home className="w-4 h-4" />
        </Link>

        <ThemeSwitcher />

        <button
          onClick={logout}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}