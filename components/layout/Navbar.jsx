"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplet, Bell, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { usePreferences } from "@/components/providers/Providers";
import { useNotifications } from "@/hooks/useNotifications";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t } = usePreferences();
  const { unreadCount } = useNotifications(Boolean(user));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/find-donor", label: t.nav.findDonor },
    { href: "/requests", label: t.nav.requests },
    { href: "/blood-banks", label: t.nav.bloodBanks },
    { href: "/camps", label: t.nav.camps },
    { href: "/awareness", label: t.nav.awareness },
  ];

  const getDashboardHref = () => {
    if (!user) return "/login";
    if (user.role === "admin" || user.role === "moderator") return "/admin";
    if (user.role === "bank") return "/bank";
    return "/dashboard";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-rose-600">
          <span className="p-2 rounded-xl bg-rose-600 text-white">
            <Droplet className="w-5 h-5 fill-current" />
          </span>
          <span>{t.brand}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-rose-600 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-rose-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/notifications"
                className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 px-1.5 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>

              <Link
                href={getDashboardHref()}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100"
              >
                <User className="w-4 h-4" />
                <span>{user.name?.split(" ")[0] || t.nav.dashboard}</span>
              </Link>

              <button
                onClick={logout}
                title="Sign out"
                className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {t.nav.login}
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
              >
                {t.nav.register}
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            {user ? (
              <Link
                href={getDashboardHref()}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white"
              >
                {t.nav.dashboard}
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white"
              >
                {t.nav.login}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}