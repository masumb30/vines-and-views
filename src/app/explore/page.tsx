'use client';

import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';

// --- DATA TYPES & INTERFACES ---
export interface IMongoRecord {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserBase {
    name: string;
    email: string;
    image?: string;
    avatar?: string; // Included to match backend populate key
}

export interface IUser extends IUserBase, IMongoRecord { }

export interface IPost extends IMongoRecord {
    userId?: string | IUser;
    authorId?: string | IUser; // Included to match backend .populate('authorId')
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    likes: string[] | IUser[];
    comments: string[] | IComment[];
}

export interface IComment extends IMongoRecord {
    postId: string | IPost;
    userId: string | IUser;
    content: string;
}

interface ApiResponse {
    totalPages: number;
    currentPage: number;
    data: IPost[];
}

// --- MAIN PAGE COMPONENT ---
export default function PostsPage() {
    // Query States
    const [searchInput, setSearchInput] = useState<string>('');
    const [activeSearch, setActiveSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const limit = 10; // Explicitly locked to 10 items per page

    // Data & UI States
    const [posts, setPosts] = useState<IPost[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch posts from backend API
    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: limit.toString(),
                ...(activeSearch && { search: activeSearch }),
            });

            const res = await fetch(`http://localhost:5000/posts?${params.toString()}`);
            // console.log('fetched post: ', await res.json())
            if (!res.ok) {
                throw new Error(`Failed to fetch posts (${res.status})`);
            }

            const responseData: ApiResponse = await res.json();
            setPosts(responseData.data || []);
            setTotalPages(responseData.totalPages || 1);
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching posts.');
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, activeSearch]);

    // Execute fetch whenever page or applied search filter changes
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Handle manual search trigger on button click or enter key
    const handleApplyFilter = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setCurrentPage(1); // Reset to first page when executing a new search
        setActiveSearch(searchInput.trim());
    };

    // Helper to extract author information safely regardless of population key
    const getAuthor = (post: IPost) => {
        const rawAuthor = post.authorId || post.userId;
        if (typeof rawAuthor === 'object' && rawAuthor !== null) {
            return {
                name: rawAuthor.name || 'Botanical Enthusiast',
                avatar: rawAuthor.avatar || rawAuthor.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
            };
        }
        return {
            name: 'Botanical Enthusiast',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        };
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50 transition-colors duration-300 px-4 py-8 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* --- HERO HEADER --- */}
                <header className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 md:p-12 shadow-sm space-y-4 text-center md:text-left relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl space-y-3">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                            Community Knowledge Hub
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50">
                            Organic Gardening & <span className="text-emerald-700 dark:text-emerald-400">Horticulture</span>
                        </h1>
                        <p className="text-stone-600 dark:text-stone-400 text-base md:text-lg">
                            Discover eco-friendly cultivation techniques, botanical guides, and seasonal wisdom shared by our certified growers.
                        </p>
                    </div>
                </header>

                {/* --- FILTER & SEARCH SECTION --- */}
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
                                className="flex-1 md:flex-initial px-6 py-3 rounded-2xl bg-lime-600 hover:bg-lime-700 dark:bg-lime-400 dark:hover:bg-lime-500 text-white dark:text-stone-950 font-medium transition-all duration-300 ease-out hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 shadow-sm flex items-center justify-center gap-2"
                            >
                                <span>Filter Posts</span>
                            </button>

                            {activeSearch && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchInput('');
                                        setActiveSearch('');
                                        setCurrentPage(1);
                                    }}
                                    className="px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-300 text-sm font-medium"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                {/* --- MAIN CONTENT AREA --- */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-4">
                                <div className="h-48 bg-stone-200 dark:bg-stone-800 rounded-xl" />
                                <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
                                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full" />
                                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 p-8 text-center space-y-3">
                        <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                        <button
                            onClick={() => fetchPosts()}
                            className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-12 text-center space-y-4">
                        <div className="text-4xl">🌱</div>
                        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50">No Botanical Posts Found</h3>
                        <p className="text-stone-600 dark:text-stone-400 max-w-md mx-auto text-sm">
                            We couldn&apos;t find any articles matching your search query. Try searching for broader terms or clear your active filters.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => {
                            const author = getAuthor(post);
                            return (
                                <Link href={`/explore/${post._id}`} key={post._id}>
                                <article
                                    key={post._id}
                                    className="group rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:scale-[1.01] flex flex-col justify-between"
                                >
                                    <div className="space-y-4">
                                        {/* Thumbnail */}
                                        <div className="relative h-48 w-full overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800">
                                            <img
                                                src={post.thumbnail || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600'}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Tags */}
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {post.tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-800/50"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Title & Excerpt */}
                                        <div className="space-y-2">
                                            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="text-stone-600 dark:text-stone-400 text-sm line-clamp-3 leading-relaxed">
                                                {post.content}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card Footer / Author Metadata */}
                                    <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={author.avatar}
                                                alt={author.name}
                                                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-600/20"
                                            />
                                            <span className="text-xs font-medium text-stone-900 dark:text-stone-200 truncate max-w-[120px]">
                                                {author.name}
                                            </span>
                                        </div>

                                        <span className="text-xs text-stone-400 dark:text-stone-500">
                                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </article>

                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* --- PAGINATION SECTION --- */}
                {!isLoading && !error && (
                    <footer className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-stone-600 dark:text-stone-400">
                            Showing page <span className="font-semibold text-stone-900 dark:text-stone-100">{currentPage}</span> of{' '}
                            <span className="font-semibold text-stone-900 dark:text-stone-100">{totalPages}</span>
                        </p>

                        {posts.length < limit && totalPages <= 1 ? (
                            <span className="text-sm font-medium text-stone-400 dark:text-stone-500 italic bg-stone-100 dark:bg-stone-900 px-4 py-2 rounded-xl">
                                No more data
                            </span>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-300 ${currentPage === pageNum
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
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage >= totalPages}
                                    className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 dark:hover:bg-stone-900 transition-all duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime-500"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </footer>
                )}

            </div>
        </div>
    );
}