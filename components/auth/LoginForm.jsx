"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn, signOut } from "@/lib/auth-client";

const LOGIN_ROLES = [
  { id: "user", label: "Donor / User", redirect: "/dashboard" },
  { id: "bank", label: "Blood Bank Staff", redirect: "/bank" },
  { id: "moderator", label: "Moderator", redirect: "/admin" },
  { id: "admin", label: "Admin", redirect: "/admin" },
];

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [selectedRole, setSelectedRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await signIn.email({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(authError.message || "Invalid email or password.");
      setLoading(false);
      return;
    }

    const actualRole = data?.user?.role || "user";

    // Check if the account has permission for the selected radio option
    if (
      selectedRole !== "user" &&
      actualRole !== selectedRole &&
      actualRole !== "admin"
    ) {
      await signOut();
      setError(
        `Access denied: This account is registered as "${actualRole}", not "${selectedRole}".`
      );
      setLoading(false);
      return;
    }

    const roleObj = LOGIN_ROLES.find((r) => r.id === selectedRole);
    const targetUrl = callbackUrl || roleObj?.redirect || "/dashboard";

    window.location.href = targetUrl;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Role Radio Selector */}
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          Login As
        </label>
        <div className="grid grid-cols-2 gap-2">
          {LOGIN_ROLES.map((r) => (
            <label
              key={r.id}
              className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-bold border cursor-pointer transition-colors ${
                selectedRole === r.id
                  ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <input
                type="radio"
                name="loginRole"
                value={r.id}
                checked={selectedRole === r.id}
                onChange={() => setSelectedRole(r.id)}
                className="accent-white"
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          Email Address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-rose-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
      >
        {loading
          ? "Signing In..."
          : `Sign In as ${selectedRole.toUpperCase()}`}
      </button>

      <p className="text-center text-xs text-slate-500">
        New to RoktoLagbe?{" "}
        <Link
          href="/register"
          className="font-semibold text-rose-600 hover:underline"
        >
          Create an Account
        </Link>
      </p>
    </form>
  );
}