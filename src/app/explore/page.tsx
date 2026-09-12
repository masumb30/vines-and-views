import { getPosts } from "./getPostsFunction";
import Pagination from "./Pagination";
import PostCard from "./PostCard";
import SearchFilter from "./SearchFilter";


interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>;
}

export default async function PostsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const search = params.search || '';
    const limit = 10;

    const { data: posts, totalPages } = await getPosts(currentPage, search);
    console.log('Fetched posts length:', posts.length, 'Total Pages:', totalPages, 'Current Page:', currentPage, 'Search Query:', search);


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
                            Organic Gardening & <span className="text-lime-700 dark:text-lime-400">Horticulture</span>
                        </h1>
                        <p className="text-stone-600 dark:text-stone-400 text-base md:text-lg">
                            Discover eco-friendly cultivation techniques, botanical guides, and seasonal wisdom shared by our certified growers.
                        </p>
                    </div>
                </header>

                {/* --- FILTER & SEARCH SECTION --- */}
                <SearchFilter />

                {/* --- MAIN CONTENT AREA --- */}
                {posts.length === 0 ? (
                    <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-12 text-center space-y-4">
                        <div className="text-4xl">🌱</div>
                        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50">No Botanical Posts Found</h3>
                        <p className="text-stone-600 dark:text-stone-400 max-w-md mx-auto text-sm">
                            We couldn&apos;t find any articles matching your search query. Try searching for broader terms or clear your active filters.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post: any) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                )}

                {/* --- PAGINATION SECTION --- */}
                {posts.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        limit={limit}
                        itemsLength={posts.length}
                    />
                )}

            </div>
        </div>
    );
}