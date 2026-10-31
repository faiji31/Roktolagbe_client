export function getEligibilityState(lastDonatedAt, gapDays = 90) {
  if (!lastDonatedAt) {
    return { isEligible: true, eligibleOn: null, daysRemaining: 0 };
  }
  const eligibleOn = new Date(lastDonatedAt);
  eligibleOn.setDate(eligibleOn.getDate() + gapDays);

  const diffMs = eligibleOn.getTime() - Date.now();
  const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  return {
    isEligible: daysRemaining === 0,
    eligibleOn: eligibleOn.toISOString(),
    daysRemaining,
  };
}