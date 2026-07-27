export default function Loading() {
  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 dark:bg-stone-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">

        <p className="text-center">Generating your overview... This may take a while</p>
        
        {/* Skeleton: Hero Banner Header */}
        <header className="animate-pulse rounded-3xl border border-stone-200 bg-white p-8 dark:border-stone-800 dark:bg-stone-900 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="w-full space-y-3 md:w-2/3">
              <div className="h-5 w-36 rounded-full bg-orange-100 dark:bg-orange-950/60" />
              <div className="h-9 w-3/4 rounded-2xl bg-stone-200 dark:bg-stone-800" />
              <div className="h-4 w-5/6 rounded-lg bg-stone-200 dark:bg-stone-800" />
            </div>
            <div className="h-12 w-36 rounded-2xl bg-stone-200 dark:bg-stone-800" />
          </div>
        </header>

        {/* Skeleton: Quick Metrics Bar */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="h-3 w-16 rounded-md bg-stone-200 dark:bg-stone-800" />
              <div className="mt-3 h-7 w-12 rounded-lg bg-stone-200 dark:bg-stone-800" />
            </div>
          ))}
        </section>

        {/* Skeleton: Narrative Overview & Insights Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse space-y-3 rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="h-5 w-1/3 rounded-lg bg-stone-200 dark:bg-stone-800" />
              <div className="h-3.5 w-full rounded-md bg-stone-200 dark:bg-stone-800" />
              <div className="h-3.5 w-11/12 rounded-md bg-stone-200 dark:bg-stone-800" />
              <div className="h-3.5 w-4/5 rounded-md bg-stone-200 dark:bg-stone-800" />
            </div>
          ))}
        </section>

        {/* Skeleton: Recommended Post Ideas Section */}
        <section className="space-y-6 rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900 md:p-8">
          
          {/* Section Header */}
          <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 dark:border-stone-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="h-7 w-56 rounded-xl bg-stone-200 dark:bg-stone-800" />
              <div className="h-4 w-72 rounded-lg bg-stone-200 dark:bg-stone-800" />
            </div>
            <div className="h-9 w-32 rounded-xl bg-stone-200 dark:bg-stone-800" />
          </div>

          {/* Cards Grid for 10 Post Ideas */}
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex flex-col justify-between space-y-4 rounded-2xl border border-stone-200 bg-stone-50/50 p-6 dark:border-stone-800 dark:bg-stone-950/50"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-5 w-3/4 rounded-lg bg-stone-200 dark:bg-stone-800" />
                    <div className="h-7 w-16 rounded-xl bg-stone-200 dark:bg-stone-800" />
                  </div>
                  <div className="h-3.5 w-full rounded-md bg-stone-200 dark:bg-stone-800" />
                  <div className="h-3.5 w-5/6 rounded-md bg-stone-200 dark:bg-stone-800" />
                </div>

                <div className="flex gap-2 pt-2">
                  <div className="h-5 w-16 rounded-lg bg-stone-200 dark:bg-stone-800" />
                  <div className="h-5 w-20 rounded-lg bg-stone-200 dark:bg-stone-800" />
                  <div className="h-5 w-14 rounded-lg bg-stone-200 dark:bg-stone-800" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}