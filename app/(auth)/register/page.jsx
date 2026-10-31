import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Become a Voluntary Blood Donor
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Join Bangladesh&apos;s community blood network in under a minute.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}