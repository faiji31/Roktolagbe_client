"use client";

import { useEffect, useState, useCallback } from "react";
import PageHeader from "@/components/common/PageHeader";
import CampForm from "@/components/camp/CampForm";
import CampCard from "@/components/camp/CampCard";
import { apiFetch } from "@/lib/api";

export default function DashboardCampsPage() {
  const [camps, setCamps] = useState([]);

  const loadCamps = useCallback(async () => {
    const res = await apiFetch("/camps");
    setCamps(res.data?.items || []);
  }, []);

  useEffect(() => {
    loadCamps();
  }, [loadCamps]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Blood Donation Camps"
        subtitle="Organize a community blood drive or register for an upcoming camp."
      />

      <CampForm onCreated={loadCamps} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {camps.map((camp) => (
          <CampCard key={camp._id} camp={camp} onJoined={loadCamps} />
        ))}
      </div>
    </div>
  );
}