export default function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-heading font-bold text-4xl md:text-5xl text-white mb-1">{value}</p>
      <p className="text-sm text-white/60 mb-0">{label}</p>
    </div>
  );
}
