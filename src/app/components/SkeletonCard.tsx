export function SkeletonCard() {
  return (
    <div
      className="border rounded-lg p-5 animate-pulse"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      <div className="h-6 w-24 bg-zinc-700 rounded-full mb-3" />
      <div className="h-5 bg-zinc-700 rounded mb-2 w-3/4" />
      <div className="h-4 bg-zinc-700 rounded mb-1 w-full" />
      <div className="h-4 bg-zinc-700 rounded mb-3 w-2/3" />
      <div className="flex gap-1.5 mb-3">
        <div className="h-5 w-16 bg-zinc-700 rounded-full" />
        <div className="h-5 w-12 bg-zinc-700 rounded-full" />
        <div className="h-5 w-20 bg-zinc-700 rounded-full" />
      </div>
      <div className="h-3 bg-zinc-700 rounded mb-1 w-32" />
      <div className="h-3 bg-zinc-700 rounded w-32" />
    </div>
  );
}
