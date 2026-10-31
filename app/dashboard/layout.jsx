import RoleGuard from "@/components/auth/RoleGuard";
import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <RoleGuard>
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
        <Sidebar section="dashboard" />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader title="Donor & Requester Dashboard" />
          <main className="flex-1 p-6 max-w-6xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}