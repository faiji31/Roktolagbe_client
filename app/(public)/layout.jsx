import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmergencyButton from "@/components/layout/EmergencyButton";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <EmergencyButton />
      <Footer />
    </div>
  );
}