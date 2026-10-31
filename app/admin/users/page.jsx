"use client";

import { useEffect, useState, useCallback } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { apiFetch } from "@/lib/api";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async () => {
    const res = await apiFetch("/admin/users");
    setUsers(res.data?.items || []);
  }, []);

  useEffect(() => {
    loadUsers().catch(() => {});
  }, [loadUsers]);

  const handleRoleChange = async (userId, role) => {
    await apiFetch(`/admin/users/${userId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
    loadUsers();
  };

  const handleToggleBan = async (userId, isBanned) => {
    await apiFetch(`/admin/users/${userId}/ban`, {
      method: "PATCH",
      body: JSON.stringify({ isBanned }),
    });
    loadUsers();
  };

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "bloodGroup", header: "Group" },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <select
          value={row.role || "user"}
          onChange={(e) => handleRoleChange(row._id || row.id, e.target.value)}
          className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-xs"
        >
          <option value="user">user</option>
          <option value="bank">bank</option>
          <option value="moderator">moderator</option>
          <option value="admin">admin</option>
        </select>
      ),
    },
    {
      key: "actions",
      header: "Status",
      render: (row) => (
        <button
          type="button"
          onClick={() =>
            handleToggleBan(row._id || row.id, !row.isBanned)
          }
          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            row.isBanned
              ? "bg-emerald-600 text-white"
              : "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300"
          }`}
        >
          {row.isBanned ? "Unban" : "Suspend"}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="User & Role Management"
        subtitle="Assign moderator or blood bank staff roles, or suspend abusive accounts."
      />
      <DataTable columns={columns} data={users} />
    </div>
  );
}