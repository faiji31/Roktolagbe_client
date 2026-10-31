export default function BloodGroupBadge({ group, size = "md" }) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-14 h-14 text-base",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl font-extrabold bg-rose-600 text-white shadow-xs shrink-0 ${
        sizes[size] || sizes.md
      }`}
    >
      {group || "?"}
    </span>
  );
}