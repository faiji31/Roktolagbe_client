"use client";

import { useEffect, useState, useCallback } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { apiFetch } from "@/lib/api";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "Eligibility",
    summary: "",
    content: "",
  });

  const loadArticles = useCallback(async () => {
    const res = await apiFetch("/admin/articles");
    setArticles(res.data || []);
  }, []);

  useEffect(() => {
    loadArticles().catch(() => {});
  }, [loadArticles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiFetch("/admin/articles", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({ title: "", category: "Eligibility", summary: "", content: "" });
    loadArticles();
  };

  const columns = [
    { key: "title", header: "Title" },
    { key: "category", header: "Category" },
    { key: "slug", header: "Slug" },
  ];

  const inputClass =
    "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Awareness Articles"
        subtitle="Publish educational guides for blood donors and patients."
      />

      <form
        onSubmit={handleSubmit}
        className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Article Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Category (e.g. Eligibility, Preparation)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputClass}
          />
        </div>
        <textarea
          rows={3}
          required
          placeholder="Article Content..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className={inputClass}
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white"
        >
          Publish Article
        </button>
      </form>

      <DataTable columns={columns} data={articles} />
    </div>
  );
}