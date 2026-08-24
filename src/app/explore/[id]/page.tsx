import React from "react";
import Link from "next/link";
import { PopulatedPost } from "./types";
import BlogClientInteractive from "./blog-client-interactive";

// ----------------------------------------------------------------------
// UTILITY HELPERS
// ----------------------------------------------------------------------
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("en-US", options);
};

const calculateReadingTime = (content: string) => {
  if (!content) return "1 min read";
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const getInitials = (name: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// ----------------------------------------------------------------------
// SERVER-SIDE DATA FETCHING
// ----------------------------------------------------------------------
async function getPost(postId: string): Promise<PopulatedPost | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
      cache: "no-store", // or next: { revalidate: 60 } depending on your caching policy
    });

    if (!res.ok) return null;
    const payload = await res.json();
    return payload.data;
  } catch (err) {
    console.error("Error fetching post:", err);
    return null;
  }
}

// ----------------------------------------------------------------------
// PAGE COMPONENT (SERVER)
// ----------------------------------------------------------------------
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = await params;
  const post = await getPost(postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-md">
          <span className="text-4xl">🥀</span>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 mt-4">
            Botanical Log Not Found
          </h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            We couldn't retrieve the specified post details.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-block py-3 px-6 bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-400 dark:hover:bg-lime-500 dark:text-stone-950 text-sm font-bold rounded-2xl transition-all duration-300"
          >
            Return to Explore
          </Link>
        </div>
      </div>
    );
  }

  const readTime = calculateReadingTime(post.content);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* BACK NAVIGATION */}
        <div className="mb-6">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition-colors group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Explore Insights
          </Link>
        </div>

        {/* HERO ARTICLE DISPLAY */}
        <article className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm">
          {/* Main Thumbnail Image */}
          <div className="relative h-64 sm:h-96 w-full bg-stone-100 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800">
            {post.thumbnail ? (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                No Preview Image Available
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

            {/* Tags Overlay */}
            <div className="absolute bottom-6 left-6 sm:left-8 flex flex-wrap gap-2">
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs font-extrabold uppercase tracking-wider bg-orange-600 dark:bg-orange-400 text-stone-50 dark:text-stone-950 px-3 py-1 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Info & Details */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-100 dark:border-stone-800">

              {/* Populated Author Info */}
              <div className="flex items-center gap-3">
                {post.userId?.image ? (
                  <img
                    src={post.userId.image}
                    alt={post.userId.name}
                    className="w-12 h-12 rounded-full object-cover border border-stone-200 dark:border-stone-700 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-700 text-white dark:bg-emerald-400 dark:text-stone-950 flex items-center justify-center font-extrabold text-sm shadow-md">
                    {getInitials(post.userId?.name)}
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    {post.userId?.name || "Unknown Author"}
                  </h3>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold uppercase tracking-widest">
                    {post.userId?.email || "Horticulturist"}
                  </p>
                </div>
              </div>

              {/* Date & Reading Time */}
              <div className="flex items-center gap-4 text-xs font-bold text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-950 px-4 py-2.5 rounded-2xl border border-stone-200/50 dark:border-stone-800/50">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-stone-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z"
                    />
                  </svg>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <span className="text-stone-300 dark:text-stone-800">|</span>
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-lime-600 dark:text-lime-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Headline */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Full Body Content */}
            <div className="text-stone-800 dark:text-stone-200 text-base leading-relaxed space-y-6 whitespace-pre-line font-normal">
              {post.content}
            </div>

            {/* CLIENT INTERACTIVE COMPONENT (Likes & Comments) */}
            <BlogClientInteractive postId={postId} post={post} />

          </div>
        </article>
      </div>
    </div>
  );
}