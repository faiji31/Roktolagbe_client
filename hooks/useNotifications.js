"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";

export function useNotifications(enabled = true) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    try {
      const res = await apiFetch("/notifications?limit=20");
      setNotifications(res.data?.items || []);
      setUnreadCount(res.data?.unreadCount || 0);
    } catch {
      // Ignore unauthenticated errors silently in navbar
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const markRead = async (id) => {
    await apiFetch(`/notifications/${id}/read`, { method: "PATCH" });
    await fetchNotifications();
  };

  const markAllRead = async () => {
    await apiFetch("/notifications/read-all", { method: "PATCH" });
    await fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    markRead,
    markAllRead,
    refetch: fetchNotifications,
  };
}