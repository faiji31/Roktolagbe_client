"use client";

import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import { useNotifications } from "@/hooks/useNotifications";
import { formatRelativeTime } from "@/lib/utils";

export default function NotificationsPage() {
  const { notifications, unreadCount, markRead, markAllRead } =
    useNotifications(true);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle={`You have ${unreadCount} unread alert(s).`}
        actions={
          unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900"
            >
              Mark All as Read
            </button>
          )
        }
      />

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-sm text-slate-500">
            No notifications yet.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                n.isRead
                  ? "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  : "border-rose-200 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/20"
              }`}
            >
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {n.title}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {n.message}
                </p>
                <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                  <span>{formatRelativeTime(n.createdAt)}</span>
                  {n.link && (
                    <Link
                      href={n.link}
                      className="font-semibold text-rose-600 hover:underline"
                    >
                      Open Link
                    </Link>
                  )}
                </div>
              </div>

              {!n.isRead && (
                <button
                  type="button"
                  onClick={() => markRead(n._id)}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}