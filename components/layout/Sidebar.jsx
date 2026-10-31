"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  FileHeart,
  Sparkles,
  Award,
  Tent,
  Bell,
  Building2,
  Users,
  ShieldAlert,
  BarChart3,
  BookOpen,
  ScrollText,
  Droplet,
} from "lucide-react";

const MENU_BY_SECTION = {
  dashboard: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Donor Profile", icon: UserCheck },
    { href: "/dashboard/requests", label: "My Requests", icon: FileHeart },
    { href: "/dashboard/matches", label: "Requests I Can Help", icon: Sparkles },
    { href: "/dashboard/donations", label: "Donations & Certificates", icon: Award },
    { href: "/dashboard/camps", label: "Donation Camps", icon: Tent },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  ],
  bank: [
    { href: "/bank", label: "Bank Overview", icon: LayoutDashboard },
    { href: "/bank/inventory", label: "Stock Inventory", icon: Building2 },
    { href: "/bank/donations", label: "Recorded Donations", icon: Award },
    { href: "/bank/requests", label: "Nearby Requests", icon: FileHeart },
  ],
  admin: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "Manage Users", icon: Users },
    { href: "/admin/banks", label: "Blood Banks", icon: Building2 },
    { href: "/admin/requests", label: "All Requests", icon: FileHeart },
    { href: "/admin/reports", label: "Moderation Reports", icon: ShieldAlert },
    { href: "/admin/camps", label: "Camps", icon: Tent },
    { href: "/admin/articles", label: "Awareness Articles", icon: BookOpen },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
  ],
};

export default function Sidebar({ section = "dashboard" }) {
  const pathname = usePathname();
  const items = MENU_BY_SECTION[section] || MENU_BY_SECTION.dashboard;

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-screen">
      <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-rose-600">
          <span className="p-1.5 rounded-lg bg-rose-600 text-white">
            <Droplet className="w-4 h-4 fill-current" />
          </span>
          <span>RoktoLagbe</span>
        </Link>
        <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          {section}
        </span>
      </div>

      <nav className="p-4 space-y-1 flex-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== `/${section}` && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}