"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-slate-500 max-w-md">
        {error?.message || "An unexpected error occurred while loading this page."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
      >
        Try Again
      </button>
    </div>
  );
}