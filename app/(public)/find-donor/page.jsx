"use client";

import PageHeader from "@/components/common/PageHeader";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/common/EmptyState";
import { useDonors } from "@/hooks/useDonors";
import DonorCard from "@/components/donar/DonorCard";
import DonorSearchForm from "@/components/donar/DonorSearchForm";

const DEFAULT_FILTERS = {
  bloodGroup: "",
  division: "",
  district: "",
  upazila: "",
  compatible: "false",
  onlyEligible: "true",
  page: 1,
};

export default function FindDonorPage() {
  const { donors, meta, loading, filters, setFilters } =
    useDonors(DEFAULT_FILTERS);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Find Verified Blood Donors"
        subtitle="Phone numbers are masked to protect donor privacy. Post a blood request to alert and unlock donor contact numbers."
      />

      <DonorSearchForm
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">
          Searching eligible donors...
        </div>
      ) : donors.length === 0 ? (
        <EmptyState
          title="No matching donors found"
          description="Try broadening your location filter or enabling compatible blood groups."
          actionLabel="Create an Emergency Request"
          actionHref="/dashboard/requests/new"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donors.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
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