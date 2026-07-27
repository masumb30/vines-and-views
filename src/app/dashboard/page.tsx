import { auth } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
import React from 'react';

// TypeScript interface matching the backend response
interface IDashboardData {
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  metrics: {
    totalPosts: number;
    totalLikesReceived: number;
    totalCommentsReceived: number;
  };
  recentPosts: Array<{
    _id: string;
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    likesCount: number;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
  }>;
  recentActivity: Array<{
    _id: string;
    postId: {
      _id: string;
      title: string;
    };
    content: string;
    createdAt: string;
  }>;
}

// Server Component / Data Fetcher helper
async function getDashboardData(): Promise<IDashboardData | null> {
  try {
    // Replace with your API endpoint and session handling
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session?.session?.token) throw new Error('user not signed in')
    const res = await fetch(`http://localhost:5000/dashboard`, {
      headers: {
        
        Authorization: `Bearer ${session?.session?.token}`,
      },
      cache: 'no-store', // Ensures fresh dashboard data on each load
    });

    // console.log('res', await res.json())
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    return null;
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  // Fallback state if server fetch fails or unauthenticated
  if (!data) {
    return (
      <main className="min-h-screen bg-stone-50 text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <p className="text-stone-600 dark:text-stone-400">
            Unable to load dashboard data. Please check your session or try again later.
          </p>
        </div>
      </main>
    );
  }

  const { user, metrics, recentPosts, recentActivity } = data;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* 1. Compact Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 dark:border-stone-800 dark:bg-stone-900">
          {/* Subtle Decorative Gradient Backdrop */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-400/10" />
          <div className="pointer-events-none absolute -bottom-12 right-24 h-40 w-40 rounded-full bg-orange-500/10 blur-2xl dark:bg-orange-400/10" />

          <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                <span className="h-2 w-2 rounded-full bg-orange-600 dark:bg-orange-400" />
                Horticulturist Hub
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50">
                Welcome back, {user.name}
              </h1>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Track your botanical blog reach, active discussions, and community engagement.
              </p>
            </div>

            <a
              href="/posts/create"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-lime-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 ease-out hover:scale-[1.01] hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-lime-500 dark:text-stone-950 dark:hover:bg-lime-400 dark:focus:ring-offset-stone-900"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Garden Post
            </a>
          </div>
        </section>

        {/* 2. Metrics Grid */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Posts */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:scale-[1.01] dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">Total Posts Published</span>
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-stone-900 dark:text-stone-50">{metrics.totalPosts}</p>
          </div>

          {/* Likes Received */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:scale-[1.01] dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">Likes Received</span>
              <div className="rounded-xl bg-orange-100 p-2 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-1.414-6.364 4.5 4.5 0 00-6.236 0L12 7.636l-1.032-1.018a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-stone-900 dark:text-stone-50">{metrics.totalLikesReceived}</p>
          </div>

          {/* Comments Received */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:scale-[1.01] dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">Community Comments</span>
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-stone-900 dark:text-stone-50">{metrics.totalCommentsReceived}</p>
          </div>
        </section>

        {/* 3. Main Content Split Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Recent Posts Column (2/3 width) */}
          <section className="space-y-4 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">Recent Garden Articles</h2>
              <a href="/posts" className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
                View all
              </a>
            </div>

            {recentPosts.length === 0 ? (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
                No articles published yet. Start sharing your gardening logs!
              </div>
            ) : (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <article
                    key={post._id}
                    className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:scale-[1.01] sm:flex-row sm:items-center dark:border-stone-800 dark:bg-stone-900"
                  >
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="h-24 w-full rounded-xl object-cover sm:w-32"
                      />
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-600 dark:bg-orange-950/80 dark:text-orange-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-base font-bold text-stone-900 line-clamp-1 dark:text-stone-50">
                        {post.title}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 dark:text-stone-400">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-4 text-xs font-medium text-stone-600 dark:text-stone-400">
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-1.414-6.364 4.5 4.5 0 00-6.236 0L12 7.636l-1.032-1.018a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {post.likesCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4 text-emerald-700 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          {post.commentsCount}
                        </span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Recent Comments / Activity Column (1/3 width) */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">Recent Activity</h2>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4 dark:border-stone-800 dark:bg-stone-900">
              {recentActivity.length === 0 ? (
                <p className="text-center text-xs text-stone-600 dark:text-stone-400">No recent comments or interactions.</p>
              ) : (
                <ul className="divide-y divide-stone-200 dark:divide-stone-800 space-y-3">
                  {recentActivity.map((activity) => (
                    <li key={activity._id} className="pt-3 first:pt-0 space-y-1">
                      <p className="text-xs text-stone-600 dark:text-stone-400">
                        Commented on{' '}
                        <span className="font-semibold text-stone-900 dark:text-stone-100">
                          {activity.postId?.title || 'a post'}
                        </span>
                      </p>
                      <p className="text-xs italic text-stone-800 line-clamp-2 dark:text-stone-200">
                        "{activity.content}"
                      </p>
                      <span className="block text-[10px] text-stone-500 dark:text-stone-500">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}