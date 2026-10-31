import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-rose-600">
        404 Error
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
        Page Not Found
      </h1>
      <p className="mt-2 text-sm text-slate-500 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700"
      >
        Back to Home
      </Link>
    </div>
  );
}