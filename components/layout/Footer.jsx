import Link from "next/link";
import { Droplet, Heart, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold text-xl text-rose-600">
            <span className="p-1.5 rounded-lg bg-rose-600 text-white">
              <Droplet className="w-5 h-5 fill-current" />
            </span>
            <span>RoktoLagbe</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Connecting voluntary blood donors, patients, and verified blood banks across all 8 divisions of Bangladesh.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/find-donor" className="hover:text-rose-600">Find a Blood Donor</Link></li>
            <li><Link href="/requests" className="hover:text-rose-600">Live Blood Requests</Link></li>
            <li><Link href="/blood-banks" className="hover:text-rose-600">Blood Bank Directory</Link></li>
            <li><Link href="/camps" className="hover:text-rose-600">Blood Donation Camps</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Resources
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link href="/awareness" className="hover:text-rose-600">Donation Eligibility Guide</Link></li>
            <li><Link href="/faq" className="hover:text-rose-600">Frequently Asked Questions</Link></li>
            <li><Link href="/about" className="hover:text-rose-600">About RoktoLagbe</Link></li>
            <li><Link href="/contact" className="hover:text-rose-600">Contact & Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Emergency Hotline
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Need urgent blood coordination? Create an emergency request and nearby donors are alerted immediately.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-sm font-semibold">
            <PhoneCall className="w-4 h-4" />
            <span>National Emergency: 999</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
        <span>Built with</span>
        <Heart className="w-3.5 h-3.5 text-rose-600 fill-current" />
        <span>for voluntary blood donors in Bangladesh.</span>
      </div>
    </footer>
  );
}