export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        {/* Page title skeleton */}
        <div className="space-y-3">
          <div className="h-10 w-48 bg-muted rounded-lg" />
          <div className="h-5 w-96 bg-muted rounded-lg max-w-full" />
        </div>

        {/* Content skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border p-5 space-y-3"
            >
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-muted rounded-full" />
                <div className="h-5 w-12 bg-muted rounded-full" />
              </div>
              <div className="h-6 w-3/4 bg-muted rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded-lg" />
                <div className="h-4 w-2/3 bg-muted rounded-lg" />
              </div>
              <div className="flex justify-between pt-2">
                <div className="h-4 w-20 bg-muted rounded-lg" />
                <div className="h-4 w-24 bg-muted rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
