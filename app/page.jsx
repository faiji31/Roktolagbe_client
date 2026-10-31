"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Siren,
  Users,
  CheckCircle2,
  Building2,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmergencyButton from "@/components/layout/EmergencyButton";
import StatCard from "@/components/common/StatCard";
import RequestCard from "@/components/request/RequestCard";
import CompatibilityChart from "@/components/blood/CompatibilityChart";
import { apiFetch } from "@/lib/api";

export default function LandingPage() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    fulfilledRequests: 0,
    openRequests: 0,
    verifiedBanks: 0,
  });
  const [urgentRequests, setUrgentRequests] = useState([]);

  useEffect(() => {
    apiFetch("/meta/stats")
      .then((res) => {
        if (res?.data) setStats(res.data);
      })
      .catch(() => {});

    apiFetch("/requests?limit=6")
      .then((res) => {
        setUrgentRequests(res.data?.items || []);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 to-transparent dark:from-rose-950/20 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
              <span>🇧🇩 Bangladesh Community Blood Network</span>
            </span>

            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto">
              Every Drop Counts.{" "}
              <span className="text-rose-600">Save a Life Today.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Search verified voluntary blood donors by division, district, and upazila, or post an emergency request to alert compatible donors near your hospital.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/find-donor"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-600/25"
              >
                <Search className="w-4 h-4" />
                <span>Find a Blood Donor</span>
              </Link>

              <Link
                href="/dashboard/requests/new"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:border-rose-500"
              >
                <Siren className="w-4 h-4 text-rose-600" />
                <span>Post Emergency Request</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Live Platform Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Available Donors"
              value={stats.totalDonors}
              subtitle="Ready to donate across BD"
              icon={Users}
              color="rose"
            />
            <StatCard
              label="Open Blood Requests"
              value={stats.openRequests}
              subtitle="Patients currently waiting"
              icon={HeartHandshake}
              color="amber"
            />
            <StatCard
              label="Lives Impacted"
              value={stats.fulfilledRequests}
              subtitle="Fulfilled blood requests"
              icon={CheckCircle2}
              color="emerald"
            />
            <StatCard
              label="Verified Blood Banks"
              value={stats.verifiedBanks}
              subtitle="Live bag stock directory"
              icon={Building2}
              color="blue"
            />
          </div>
        </section>

        {/* Urgent Blood Requests Feed */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Active Emergency Blood Requests
              </h2>
              <p className="text-sm text-slate-500">
                Patients who urgently need blood right now.
              </p>
            </div>
            <Link
              href="/requests"
              className="inline-flex items-center gap-1 text-sm font-bold text-rose-600 hover:underline"
            >
              <span>View All Requests</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {urgentRequests.length === 0 ? (
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-sm text-slate-500">
              No active blood requests at this moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {urgentRequests.map((reqItem) => (
                <RequestCard key={reqItem._id} request={reqItem} />
              ))}
            </div>
          )}
        </section>

        {/* Compatibility Reference */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <CompatibilityChart />
        </section>
      </main>

      <EmergencyButton />
      <Footer />
    </div>
  );
}