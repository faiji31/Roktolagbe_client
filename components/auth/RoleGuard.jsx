"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export default function RoleGuard({ allowedRoles = [], children }) {
  const { user, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">
        Verifying session...
      </div>
    );
  }

  if (!user) return null;

  const userRole = user.role || "user";

  // Allow if no specific roles are required, if the user's role is in allowedRoles, or if user is admin
  const hasPermission =
    allowedRoles.length === 0 ||
    allowedRoles.includes(userRole) ||
    userRole === "admin";

  if (!hasPermission) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Access Restricted
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Your account role ({userRole}) does not have permission to view this portal.
        </p>
      </div>
    );
  }

  return children;
}