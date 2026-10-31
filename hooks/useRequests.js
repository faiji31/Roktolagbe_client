"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";

export function useRequests(initialFilters = {}, mineOnly = false) {
  const [filters, setFilters] = useState(initialFilters);
  const [requests, setRequests] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          params.set(key, String(val));
        }
      });

      const endpoint = mineOnly
        ? `/requests/mine?${params.toString()}`
        : `/requests?${params.toString()}`;

      const res = await apiFetch(endpoint);
      setRequests(res.data?.items || []);
      setMeta(res.data?.meta || { total: 0, page: 1, totalPages: 1 });
    } catch (err) {
      setError(err.message || "Failed to load blood requests.");
    } finally {
      setLoading(false);
    }
  }, [filters, mineOnly]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    meta,
    loading,
    error,
    filters,
    setFilters,
    refetch: fetchRequests,
  };
}