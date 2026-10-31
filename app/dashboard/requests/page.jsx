"use client";

import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import RequestCard from "@/components/request/RequestCard";
import EmptyState from "@/components/common/EmptyState";
import { useRequests } from "@/hooks/useRequests";

export default function MyRequestsPage() {
  const { requests, loading } = useRequests({}, true);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Blood Requests"
        subtitle="Manage your posted blood requests, reveal donor contacts, and confirm donations."
        actions={
          <Link
            href="/dashboard/requests/new"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
          >
            + New Blood Request
          </Link>
        }
      />

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">
          Loading your requests...
        </div>
      ) : requests.length === 0 ? (
        <EmptyState
          title="You haven't posted any blood requests"
          description="Need blood for a patient? Post a request and compatible donors in that district will be notified immediately."
          actionLabel="Create Request"
          actionHref="/dashboard/requests/new"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {requests.map((reqItem) => (
            <RequestCard
              key={reqItem._id}
              request={reqItem}
              manageHref={`/dashboard/requests/${reqItem._id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}