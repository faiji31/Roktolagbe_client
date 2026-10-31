"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Charts from "@/components/admin/Charts";
import { apiFetch } from "@/lib/api";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiFetch("/admin/analytics")
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Analytics"
        subtitle="Distribution of registered blood groups and request fulfillment metrics."
      />
      {data && (
        <Charts
          donorsByBloodGroup={data.donorsByBloodGroup}
          requestsByStatus={data.requestsByStatus}
        />
      )}
    </div>
  );
}