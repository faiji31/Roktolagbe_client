"use client";

import PageHeader from "@/components/common/PageHeader";
import RequestForm from "@/components/request/RequestForm";
import { useAuth } from "@/components/providers/AuthProvider";

export default function CreateBloodRequestPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create an Emergency Blood Request"
        subtitle="Compatible and eligible donors in the selected district will be notified automatically."
      />
      <RequestForm user={user} />
    </div>
  );
}