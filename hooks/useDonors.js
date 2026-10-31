"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api";

export function useDonors(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);
  const [donors, setDonors] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDonors = useCallback(async (overrideFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const merged = { ...filters, ...overrideFilters };
      const params = new URLSearchParams();
      Object.entries(merged).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          params.set(key, String(val));
        }
      });

      const res = await apiFetch(`/donors?${params.toString()}`);
      setDonors(res.data?.items || []);
      setMeta(res.data?.meta || { total: 0, page: 1, totalPages: 1 });
    } catch (err) {
      setError(err.message || "Failed to load donors.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  return {
    donors,
    meta,
    loading,
    error,
    filters,
    setFilters,
    refetch: fetchDonors,
  };
}