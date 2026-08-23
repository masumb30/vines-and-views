export default function Loading() {
    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50 transition-colors duration-300 px-4 py-8 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-8 animate-pulse">

                {/* --- HERO HEADER SKELETON --- */}
                <header className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 md:p-12 shadow-sm space-y-4">
                    <div className="max-w-2xl space-y-3">
                        <div className="h-6 w-44 bg-stone-200 dark:bg-stone-800 rounded-full" />
                        <div className="h-10 w-3/4 bg-stone-200 dark:bg-stone-800 rounded-xl" />
                        <div className="h-5 w-full bg-stone-200 dark:bg-stone-800 rounded" />
                    </div>
                </header>

                {/* --- SEARCH BAR SKELETON --- */}
                <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-sm flex flex-col md:flex-row gap-4">
                    <div className="h-12 flex-1 bg-stone-200 dark:bg-stone-800 rounded-2xl" />
                    <div className="h-12 w-full md:w-36 bg-stone-200 dark:bg-stone-800 rounded-2xl" />
                </div>

                {/* --- POST GRID SKELETON (6 Cards) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-4 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                {/* Thumbnail Skeleton */}
                                <div className="h-48 w-full bg-stone-200 dark:bg-stone-800 rounded-xl" />

                                {/* Tags Skeleton */}
                                <div className="flex gap-2">
                                    <div className="h-5 w-16 bg-stone-200 dark:bg-stone-800 rounded-full" />
                                    <div className="h-5 w-20 bg-stone-200 dark:bg-stone-800 rounded-full" />
                                </div>

                                {/* Title & Text Skeleton */}
                                <div className="space-y-2">
                                    <div className="h-6 w-5/6 bg-stone-200 dark:bg-stone-800 rounded" />
                                    <div className="h-4 w-full bg-stone-200 dark:bg-stone-800 rounded" />
                                    <div className="h-4 w-2/3 bg-stone-200 dark:bg-stone-800 rounded" />
                                </div>
                            </div>

                            {/* Author Footer Skeleton */}
                            <div className="pt-4 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800" />
                                    <div className="h-4 w-24 bg-stone-200 dark:bg-stone-800 rounded" />
                                </div>
                                <div className="h-3 w-12 bg-stone-200 dark:bg-stone-800 rounded" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- PAGINATION SKELETON --- */}
                <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="h-4 w-32 bg-stone-200 dark:bg-stone-800 rounded" />
                    <div className="h-10 w-64 bg-stone-200 dark:bg-stone-800 rounded-xl" />
                </div>

            </div>
        </div>
    );
}