"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { BLOOD_GROUPS } from "@/lib/constants";
import { apiFetch } from "@/lib/api";

const ROLES = [
  { id: "user", label: "Donor / User" },
  { id: "bank", label: "Blood Bank Staff" },
  { id: "moderator", label: "Moderator" },
  { id: "admin", label: "Admin" },
];

const SECRET_CODES = {
  admin: "ADMIN_SECRET_2026",
  moderator: "MOD_SECRET_2026",
  bank: "BANK_SECRET_2026",
};

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "O+",
    password: "",
    role: "user",
    secretCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Verify secret passcode if registering as Admin, Moderator, or Bank
    if (form.role !== "user") {
      const expectedCode = SECRET_CODES[form.role];
      if (form.secretCode.trim() !== expectedCode) {
        setError(
          `Incorrect secret passcode for ${form.role.toUpperCase()}. Expected: ${expectedCode}`
        );
        setLoading(false);
        return;
      }
    }

    // 2. Register user in Better Auth WITH the selected role
    const { error: signUpError } = await signUp.email({
      email: form.email.trim(),
      password: form.password,
      name: form.name.trim(),
      phone: form.phone.trim(),
      bloodGroup: form.bloodGroup,
      role: form.role,
    });

    if (signUpError) {
      setError(signUpError.message || "Could not create account.");
      setLoading(false);
      return;
    }

    // 3. Sync donor profile and role on the Express backend
    try {
      await apiFetch("/me/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          bloodGroup: form.bloodGroup,
          role: form.role,
          secretCode: form.secretCode.trim(),
          location: {
            division: "Dhaka",
            district: "Dhaka",
            upazila: "Dhanmondi",
          },
          isAvailable: true,
        }),
      });
    } catch {
      // Non-blocking fallback
    }

    // 4. Redirect to the appropriate portal with a full reload so session refreshes
    const redirectMap = {
      admin: "/admin",
      moderator: "/admin",
      bank: "/bank",
      user: "/dashboard/profile",
    };

    window.location.href = redirectMap[form.role] || "/dashboard";
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Role Radio Selection */}
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          Register As
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ROLES.map((r) => (
            <label
              key={r.id}
              className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-bold border cursor-pointer transition-colors ${
                form.role === r.id
                  ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <input
                type="radio"
                name="registerRole"
                value={r.id}
                checked={form.role === r.id}
                onChange={() => setForm({ ...form, role: r.id, secretCode: "" })}
                className="accent-white"
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Secret Passcode Input for Admin, Moderator, or Bank */}
      {form.role !== "user" && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 space-y-1.5">
          <label className="block text-xs font-bold text-amber-800 dark:text-amber-300">
            Secret Passcode for {form.role.toUpperCase()}
          </label>
          <input
            type="password"
            required
            placeholder={`Enter ${form.role} secret passcode`}
            value={form.secretCode}
            onChange={(e) => setForm({ ...form, secretCode: e.target.value })}
            className={inputClass}
          />
          <p className="text-[11px] text-amber-700 dark:text-amber-400">
            Passcode:{" "}
            <code className="font-mono font-bold">
              {SECRET_CODES[form.role]}
            </code>
          </p>
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          Full Name
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Blood Group
          </label>
          <select
            value={form.bloodGroup}
            onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
            className={inputClass}
          >
            {BLOOD_GROUPS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="017XXXXXXXX"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          Email Address
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          Password (min 6 characters)
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
      >
        {loading
          ? "Creating Account..."
          : `Register as ${form.role.toUpperCase()}`}
      </button>

      <p className="text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-rose-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}