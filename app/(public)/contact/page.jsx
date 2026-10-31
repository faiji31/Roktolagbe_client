import PageHeader from "@/components/common/PageHeader";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="Contact & Blood Bank Onboarding"
        subtitle="Reach out to verify your hospital blood bank or report an issue."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <Mail className="w-5 h-5 text-rose-600" />
          <p className="text-xs text-slate-500">Email Support</p>
          <p className="text-sm font-bold">support@roktolagbe.org</p>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <Phone className="w-5 h-5 text-rose-600" />
          <p className="text-xs text-slate-500">Coordinator Helpline</p>
          <p className="text-sm font-bold">+880 1700-000000</p>
        </div>
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
          <MapPin className="w-5 h-5 text-rose-600" />
          <p className="text-xs text-slate-500">Location</p>
          <p className="text-sm font-bold">Dhanmondi, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
}