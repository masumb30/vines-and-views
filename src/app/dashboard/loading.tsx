import React from 'react';

export default function Loading() {
  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* 1. Hero Banner Skeleton */}
        <div className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="space-y-3">
              {/* Badge placeholder */}
              <div className="h-4 w-32 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />
              {/* Title placeholder */}
              <div className="h-8 w-64 animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800 sm:w-80" />
              {/* Subtitle placeholder */}
              <div className="h-4 w-72 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800 sm:w-96" />
            </div>
            {/* Button placeholder */}
            <div className="h-10 w-40 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>

        {/* 2. Metrics Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-36 animate-pulse rounded-md bg-stone-200 dark:bg-stone-800" />
                <div className="h-9 w-9 animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800" />
              </div>
              <div className="mt-4 h-9 w-16 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />
            </div>
          ))}
        </div>

        {/* 3. Main Content Split Section Skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Recent Posts Column (2/3 width) */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="h-6 w-44 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />
              <div className="h-4 w-12 animate-pulse rounded-md bg-stone-200 dark:bg-stone-800" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((post) => (
                <div
                  key={post}
                  className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6 sm:flex-row sm:items-center dark:border-stone-800 dark:bg-stone-900"
                >
                  {/* Thumbnail Skeleton */}
                  <div className="h-24 w-full animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800 sm:w-32 shrink-0" />
                  
                  {/* Text Content Skeleton */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="h-5 w-16 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />
                        <div className="h-5 w-20 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />
                      </div>
                      <div className="h-7 w-7 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />
                    </div>

                    <div className="h-5 w-3/4 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />
                    <div className="h-4 w-full animate-pulse rounded-md bg-stone-200 dark:bg-stone-800" />

                    <div className="flex items-center gap-4 pt-1">
                      <div className="h-4 w-12 animate-pulse rounded-md bg-stone-200 dark:bg-stone-800" />
                      <div className="h-4 w-12 animate-pulse rounded-md bg-stone-200 dark:bg-stone-800" />
                      <div className="h-4 w-20 animate-pulse rounded-md bg-stone-200 dark:bg-stone-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Column (1/3 width) */}
          <div className="space-y-4">
            <div className="h-6 w-36 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />
            <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4 dark:border-stone-800 dark:bg-stone-900">
              {[1, 2, 3, 4].map((activity) => (
                <div key={activity} className="space-y-2 pt-3 first:pt-0">
                  <div className="h-4 w-4/5 animate-pulse rounded-md bg-stone-200 dark:bg-stone-800" />
                  <div className="h-3 w-full animate-pulse rounded-md bg-stone-200 dark:bg-stone-800" />
                  <div className="h-3 w-20 animate-pulse rounded-md bg-stone-200 dark:bg-stone-800" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}