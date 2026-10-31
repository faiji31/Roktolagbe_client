"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import CompatibilityChart from "@/components/blood/CompatibilityChart";
import { apiFetch } from "@/lib/api";

export default function AwarenessPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    apiFetch("/admin/articles?publishedOnly=true")
      .then((res) => setArticles(res.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Blood Donation Awareness & Eligibility"
        subtitle="Everything you need to know before and after donating blood."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {articles.map((article) => (
          <article
            key={article._id || article.slug}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              {article.category || "Guide"}
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {article.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {article.content || article.summary}
            </p>
          </article>
        ))}
      </div>

      <CompatibilityChart />
    </div>
  );
}