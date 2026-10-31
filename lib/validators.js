import { BLOOD_GROUPS } from "./constants";

export function isValidBdPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(\+?8801|01)[3-9]\d{8}$/.test(cleaned);
}

export function validateBloodRequestForm(values) {
  const errors = {};

  if (!values.patientName || values.patientName.trim().length < 2) {
    errors.patientName = "Patient name is required.";
  }
  if (!BLOOD_GROUPS.includes(values.bloodGroup)) {
    errors.bloodGroup = "Please select a valid blood group.";
  }
  if (!values.hospitalName || values.hospitalName.trim().length < 2) {
    errors.hospitalName = "Hospital name is required.";
  }
  if (!values.location?.division || !values.location?.district || !values.location?.upazila) {
    errors.location = "Division, district, and upazila are required.";
  }
  if (!values.neededBy) {
    errors.neededBy = "Please specify when blood is needed.";
  }
  if (!isValidBdPhone(values.contactPhone)) {
    errors.contactPhone = "Enter a valid Bangladesh phone number (e.g. 017XXXXXXXX).";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}