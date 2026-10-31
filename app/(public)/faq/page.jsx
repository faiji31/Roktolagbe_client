import PageHeader from "@/components/common/PageHeader";

const FAQS = [
  {
    q: "How often can I donate whole blood?",
    a: "Healthy adults can safely donate whole blood every 90 days (3 months). RoktoLagbe automatically calculates your 90-day cooldown and hides you from searches until you are eligible again.",
  },
  {
    q: "Why are donor phone numbers masked in public search?",
    a: "To prevent spam and protect donor privacy. When you create an emergency blood request, nearby compatible donors are notified and their phone numbers can be revealed once they accept.",
  },
  {
    q: "Is RoktoLagbe completely free?",
    a: "Yes. Voluntary blood donation on RoktoLagbe is 100% free. Selling or demanding money for blood is strictly prohibited and results in an immediate account ban.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Common questions about donor eligibility, privacy, and emergency requests."
      />
      <div className="space-y-4">
        {FAQS.map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {item.q}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}