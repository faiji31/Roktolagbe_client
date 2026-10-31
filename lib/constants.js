export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const ROLES = {
  USER: "user",
  BANK: "bank",
  MODERATOR: "moderator",
  ADMIN: "admin",
};

export const URGENCY_LEVELS = [
  { value: "normal", label: "Normal", color: "default" },
  { value: "urgent", label: "Urgent", color: "warning" },
  { value: "critical", label: "Critical (Emergency)", color: "danger" },
];

export const REQUEST_STATUS_LABELS = {
  open: "Open",
  in_progress: "In Progress",
  fulfilled: "Fulfilled",
  expired: "Expired",
  cancelled: "Cancelled",
};