import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Sign in to manage your donor profile and emergency requests.
        </p>
      </div>
      <Suspense fallback={<div className="text-xs text-center">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}