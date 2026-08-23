'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    limit: number;
    itemsLength: number;
}

export default function Pagination({ currentPage, totalPages, limit, itemsLength }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <footer className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-stone-600 dark:text-stone-400">
                Showing page <span className="font-semibold text-stone-900 dark:text-stone-100">{currentPage}</span> of{' '}
                <span className="font-semibold text-stone-900 dark:text-stone-100">{totalPages}</span>
            </p>

            {itemsLength < limit && totalPages <= 1 ? (
                <span className="text-sm font-medium text-stone-400 dark:text-stone-500 italic bg-stone-100 dark:bg-stone-900 px-4 py-2 rounded-xl">
                    No more data
                </span>
            ) : (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-900 transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime-500"
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-1 px-2">
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNum = index + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-300 ${
                                        currentPage === pageNum
                                            ? 'bg-lime-600 dark:bg-lime-400 text-white dark:text-stone-950 font-bold shadow-sm'
                                            : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage >= totalPages}
                        className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-900 transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime-500"
                    >
                        Next
                    </button>
                </div>
            )}
        </footer>
    );
}