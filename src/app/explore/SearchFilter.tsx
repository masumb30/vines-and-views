'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function SearchFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get('search') || '';
    const [searchInput, setSearchInput] = useState<string>(initialSearch);

    const handleApplyFilter = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        
        if (searchInput.trim()) {
            params.set('search', searchInput.trim());
        } else {
            params.delete('search');
        }
        params.set('page', '1'); // Reset to page 1 on new search

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleClear = () => {
        setSearchInput('');
        const params = new URLSearchParams(searchParams.toString());
        params.delete('search');
        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <section className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
            <form onSubmit={handleApplyFilter} className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search articles by title or tag (e.g., compost, orchid, pruning)..."
                        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 transition-all duration-300"
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        type="submit"
                        className="cursor-pointer flex-1 md:flex-initial px-6 py-3 rounded-2xl bg-lime-600 hover:bg-lime-700 dark:bg-lime-400 dark:hover:bg-lime-500 text-white dark:text-stone-950 font-medium transition-all duration-300 ease-out hover:scale-[1.01]  shadow-sm flex items-center justify-center gap-2"
                    >
                        <span>Filter Posts</span>
                    </button>

                    {initialSearch && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="cursor-pointer hover:bg-lime-200 px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400  dark:hover:bg-stone-800 transition-all duration-300 text-sm font-medium"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
}