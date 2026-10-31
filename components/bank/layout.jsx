import RoleGuard from "@/components/auth/RoleGuard";
import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";

export default function BankPortalLayout({ children }) {
  return (
    <RoleGuard allowedRoles={["bank"]}>
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
        <Sidebar section="bank" />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader title="Blood Bank Staff Portal" />
          <main className="flex-1 p-6 max-w-6xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </RoleGuard>
  );
}