"use client";

import Link from "next/link";
import { Siren } from "lucide-react";

export default function EmergencyButton() {
  return (
    <Link
      href="/dashboard/requests/new"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-lg shadow-rose-600/30 transition-transform hover:scale-105"
    >
      <Siren className="w-5 h-5 animate-pulse" />
      <span>Request Blood</span>
    </Link>
  );
}