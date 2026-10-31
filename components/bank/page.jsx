"use client";

import { useEffect, useState, useCallback } from "react";
import { ShieldCheck, Clock } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import LocationSelect from "@/components/common/LocationSelect";
import InventoryGrid from "@/components/bank/InventoryGrid";
import RecordDonationModal from "@/components/bank/RecordDonationModal";
import { BLOOD_GROUPS } from "@/lib/constants";
import { apiFetch } from "@/lib/api";

export default function BankOverviewPage() {
  const [bank, setBank] = useState(null);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [setupForm, setSetupForm] = useState({
    name: "",
    licenseNo: "",
    phone: "",
    email: "",
    openingHours: "24/7 Open",
    address: "",
    location: {
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Dhanmondi",
    },
    inventory: Object.fromEntries(BLOOD_GROUPS.map((g) => [g, 0])),
  });
  const [creating, setCreating] = useState(false);

  const loadBank = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/banks/staff/me");
      if (res.needsSetup || !res.data) {
        setNeedsSetup(true);
        setBank(null);
      } else {
        setBank(res.data);
        setNeedsSetup(false);
      }
    } catch (err) {
      setError(err.message || "Could not load blood bank profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBank();
  }, [loadBank]);

  const handleCreateBank = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const res = await apiFetch("/banks", {
        method: "POST",
        body: JSON.stringify({
          name: setupForm.name,
          licenseNo: setupForm.licenseNo,
          phone: setupForm.phone,
          email: setupForm.email,
          openingHours: setupForm.openingHours,
          address: setupForm.address,
          division: setupForm.location.division,
          district: setupForm.location.district,
          upazila: setupForm.location.upazila,
          inventory: setupForm.inventory,
        }),
      });
      setBank(res.data);
      setNeedsSetup(false);
    } catch (err) {
      setError(err.message || "Failed to create blood bank.");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Loading blood bank portal...
      </div>
    );
  }

  if (needsSetup) {
    const inputClass =
      "w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white";

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <PageHeader
          title="Create Your Blood Bank & Initial Inventory"
          subtitle="Submit your blood bank details and initial stock. Once created, you can update inventory anytime while Admin/Moderator approval is pending."
        />

        <form
          onSubmit={handleCreateBank}
          className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5"
        >
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 text-xs font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Blood Bank Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Popular Blood Bank"
                value={setupForm.name}
                onChange={(e) =>
                  setSetupForm({ ...setupForm, name: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                DGHS License Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. DGHS-BB-3021"
                value={setupForm.licenseNo}
                onChange={(e) =>
                  setSetupForm({ ...setupForm, licenseNo: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Mobile Number (01XXXXXXXXX) *
              </label>
              <input
                type="tel"
                required
                placeholder="01711223344"
                value={setupForm.phone}
                onChange={(e) =>
                  setSetupForm({ ...setupForm, phone: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Official Email
              </label>
              <input
                type="email"
                placeholder="info@bloodbank.org"
                value={setupForm.email}
                onChange={(e) =>
                  setSetupForm({ ...setupForm, email: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Opening Hours
              </label>
              <input
                type="text"
                value={setupForm.openingHours}
                onChange={(e) =>
                  setSetupForm({ ...setupForm, openingHours: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>

          <LocationSelect
            value={setupForm.location}
            onChange={(loc) => setSetupForm({ ...setupForm, location: loc })}
          />

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              required
              placeholder="House 12, Road 4, Dhanmondi, Dhaka"
              value={setupForm.address}
              onChange={(e) =>
                setSetupForm({ ...setupForm, address: e.target.value })
              }
              className={inputClass}
            />
          </div>

          {/* Initial Blood Bag Inventory Setup */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3">
              Initial Blood Bag Inventory (Bags Available)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BLOOD_GROUPS.map((group) => (
                <div
                  key={group}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40"
                >
                  <span className="block text-sm font-extrabold text-rose-600 mb-1">
                    {group}
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    value={setupForm.inventory[group]}
                    onChange={(e) =>
                      setSetupForm({
                        ...setupForm,
                        inventory: {
                          ...setupForm.inventory,
                          [group]: Math.max(0, parseInt(e.target.value, 10) || 0),
                        },
                      })
                    }
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={creating}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {creating
              ? "Creating Blood Bank..."
              : "Create Blood Bank & Save Inventory"}
          </button>
        </form>
      </div>
    );
  }

  if (error || !bank) {
    return (
      <div className="p-6 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 text-center space-y-3">
        <p className="text-sm font-bold text-rose-600 dark:text-rose-400">
          {error || "Could not load blood bank."}
        </p>
        <button
          type="button"
          onClick={loadBank}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Verification Status Banner */}
      {bank.isVerified ? (
        <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            Your blood bank is <strong>Approved & Verified</strong> by Admin/Moderator and is live in the public directory.
          </p>
        </div>
      ) : (
        <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30 flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
            <strong>Pending Admin / Moderator Approval:</strong> You can update your stock and record donations normally. Once an Admin or Moderator approves your bank, it will appear in the public directory.
          </p>
        </div>
      )}

      <PageHeader
        title={bank.name}
        subtitle={`License: ${bank.licenseNo} • ${
          bank.address || bank.location?.address || ""
        }`}
        actions={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700"
          >
            + Record Walk-in Donation
          </button>
        }
      />

      <InventoryGrid
        initialInventory={bank.inventory}
        editable={true}
        onSaved={(updated) => setBank(updated)}
      />

      <RecordDonationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onRecorded={loadBank}
      />
    </div>
  );
}