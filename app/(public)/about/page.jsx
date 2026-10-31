import PageHeader from "@/components/common/PageHeader";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="About RoktoLagbe"
        subtitle="Bridging the gap between voluntary blood donors, patients, and blood banks across Bangladesh."
      />
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          <strong>RoktoLagbe</strong> was built to solve the critical delay families face when searching for compatible blood during medical emergencies, surgeries, thalassemia transfusions, and dengue outbreaks across Bangladesh.
        </p>
        <p>
          Instead of posting unverified phone numbers on social media groups, RoktoLagbe maintains an upazila-level registry of eligible donors with automated 90-day cooldown tracking, privacy-first phone masking, and real-time blood bank stock visibility.
        </p>
      </div>
    </div>
  );
}