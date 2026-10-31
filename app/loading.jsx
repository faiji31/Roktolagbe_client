export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
        <span className="w-5 h-5 rounded-full border-2 border-rose-600 border-t-transparent animate-spin" />
        <span>Loading RoktoLagbe...</span>
      </div>
    </div>
  );
}