export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateInput, includeTime = false) {
  if (!dateInput) return "N/A";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "N/A";

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(includeTime && { hour: "2-digit", minute: "2-digit" }),
  };

  return date.toLocaleDateString("en-GB", options);
}

export function formatRelativeTime(dateInput) {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  const diffMs = date.getTime() - Date.now();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  if (Math.abs(diffHours) < 1) return "Just now";
  if (diffHours > 0) {
    return diffHours < 24
      ? `In ${diffHours}h`
      : `In ${Math.round(diffHours / 24)}d`;
  }
  const pastHours = Math.abs(diffHours);
  return pastHours < 24
    ? `${pastHours}h ago`
    : `${Math.round(pastHours / 24)}d ago`;
}