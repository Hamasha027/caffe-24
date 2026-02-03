export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-4xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm animate-pulse space-y-4"
            >
              <div className="h-28 rounded-lg bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />
              <div className="space-y-2">
                <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-6 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                <h1>Loading...</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
