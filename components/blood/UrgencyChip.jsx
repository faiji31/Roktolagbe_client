export default function UrgencyChip({ urgency = "normal" }) {
  const styles = {
    critical:
      "bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300",
    urgent:
      "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300",
    normal:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300",
  };

  const labels = {
    critical: "Critical Emergency",
    urgent: "Urgent",
    normal: "Standard",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        styles[urgency] || styles.normal
      }`}
    >
      {labels[urgency] || labels.normal}
    </span>
  );
}