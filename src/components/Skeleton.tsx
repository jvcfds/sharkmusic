export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white/5 rounded-xl p-3 animate-pulse">
          <div className="w-full aspect-square rounded-lg bg-white/10" />
          <div className="mt-2 h-3 w-2/3 bg-white/10 rounded" />
        </div>
      ))}
    </div>
  )
}
