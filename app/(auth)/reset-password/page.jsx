"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password updated! Please sign in.");
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white text-center">
        Choose a New Password
      </h1>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">
          New Password
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 rounded-xl text-sm font-semibold bg-rose-600 text-white"
      >
        Update Password
      </button>
    </form>
  );
}