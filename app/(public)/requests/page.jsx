"use client";

import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import RequestFilters from "@/components/request/RequestFilters";
import RequestCard from "@/components/request/RequestCard";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/common/EmptyState";
import { useRequests } from "@/hooks/useRequests";

export default function PublicRequestsPage() {
  const { requests, meta, loading, filters, setFilters } = useRequests({
    bloodGroup: "",
    urgency: "",
    division: "",
    district: "",
    upazila: "",
    page: 1,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Blood Requests Feed"
        subtitle="Respond to patients needing blood in your district."
        actions={
          <Link
            href="/dashboard/requests/new"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
          >
            + Post Blood Request
          </Link>
        }
      />

      <RequestFilters filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">
          Loading blood requests...
        </div>
      ) : requests.length === 0 ? (
        <EmptyState
          title="No open requests match your filter"
          description="Clear filters to see requests across all districts."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {requests.map((reqItem) => (
              <RequestCard key={reqItem._id} request={reqItem} />
            ))}
          </div>
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            onPageChange={(nextPage) =>
              setFilters({ ...filters, page: nextPage })
            }
          />
        </>
      )}
    </div>
  );
}