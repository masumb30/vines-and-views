"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gardeningPosts, Post } from "../../../../data";

// ----------------------------------------------------------------------
// TYPES AND INTERFACES
// ----------------------------------------------------------------------
interface CommentItem {
  id: string;
  author: string;
  role: string;
  content: string;
  createdAt: string;
}

// Slugify helper to match URL parameter with title
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Formatting helpers
const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("en-US", options);
};

const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// ----------------------------------------------------------------------
// BLOG POST DETAIL PAGE
// ----------------------------------------------------------------------
export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // Unwrap params Promise using React.use()
  const { id: slugOrId } = use(params);

  const [darkMode, setDarkMode] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentRole, setCommentRole] = useState("Hobbyist");
  const [commentContent, setCommentContent] = useState("");

  // Sync dark mode class with page wrapper automatically
  useEffect(() => {
    const root = window.document.documentElement;
    setDarkMode(root.classList.contains("dark"));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setDarkMode(root.classList.contains("dark"));
        }
      });
    });

    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Match and load the post
  useEffect(() => {
    if (!slugOrId) return;

    // Find the post either by slug or index
    let matchedPost = gardeningPosts.find(
      (p) => slugify(p.title) === slugOrId.toLowerCase()
    ) || null;

    // Fallback to matching by index if slug isn't found
    const index = parseInt(slugOrId, 10);
    if (!matchedPost && !isNaN(index) && gardeningPosts[index]) {
      matchedPost = gardeningPosts[index];
    }

    if (matchedPost) {
      setPost(matchedPost);
      setLikesCount(matchedPost.likes);

      // Seed dynamic comments
      // We make the 5th post (index 4) have 0 comments to show off the empty state message!
      const postIndex = gardeningPosts.indexOf(matchedPost);
      if (postIndex === 4 || matchedPost.comments === 0) {
        setComments([]);
      } else {
        const seedComments: CommentItem[] = [
          {
            id: "c1",
            author: "Aria Green",
            role: "Landscape Designer",
            content: `I've been practicing similar organic techniques in my backyard and the results are unbelievable. Thanks for compiling these structured tips!`,
            createdAt: new Date(new Date(matchedPost.createdAt).getTime() + 1000 * 60 * 60 * 2).toISOString(),
          },
          {
            id: "c2",
            author: "Silas Miller",
            role: "Market Cultivator",
            content: `Flawless analysis. The transition guide is super clean. One quick question: how does this adapt to heavier clay environments?`,
            createdAt: new Date(new Date(matchedPost.createdAt).getTime() + 1000 * 60 * 60 * 6).toISOString(),
          },
          {
            id: "c3",
            author: "Sage Thorne",
            role: "Permaculture Instructor",
            content: `Perfect timings and zone tips. Shared this with my local botanical chapter, keep them coming!`,
            createdAt: new Date(new Date(matchedPost.createdAt).getTime() + 1000 * 60 * 60 * 14).toISOString(),
          },
        ];
        setComments(seedComments);
      }
    }
  }, [slugOrId]);

  // Handle Dynamic Liking
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // Submit Comment
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || !commentAuthor.trim()) return;

    const newComment: CommentItem = {
      id: `c_${Math.random().toString(36).substr(2, 9)}`,
      author: commentAuthor.trim(),
      role: commentRole.trim(),
      content: commentContent.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentContent("");
    // Clear author and role or keep them for convenience
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-md">
          <span className="text-4xl">🥀</span>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 mt-4">Botanical Log Not Found</h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            We couldn't retrieve the specific gardening post details. It may have been moved or archived.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-block py-3 px-6 bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-400 dark:hover:bg-lime-500 dark:text-stone-950 text-sm font-bold rounded-2xl transition-all duration-300 ease-out hover:scale-105 shadow-sm"
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
        
        {/* BACK NAVIGATION LINK */}
        <div className="mb-6">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Explore Insights
          </Link>
        </div>

        {/* ---------------------------------------------------------------------- */}
        {/* HERO ARTICLE DISPLAY */}
        {/* ---------------------------------------------------------------------- */}
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
            
            {/* Top Overlay Badge (Tags) */}
            <div className="absolute bottom-6 left-6 sm:left-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
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
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white dark:bg-emerald-400 dark:text-stone-950 flex items-center justify-center font-extrabold text-sm shadow-md">
                  {post.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    {post.user.name}
                  </h3>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold uppercase tracking-widest">
                    Organic Horticulturist • ID: {post.userId}
                  </p>
                </div>
              </div>

              {/* Date & Read Time */}
              <div className="flex items-center gap-4 text-xs font-bold text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-950 px-4 py-2.5 rounded-2xl border border-stone-200/50 dark:border-stone-800/50">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
                  </svg>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <span className="text-stone-300 dark:text-stone-800">|</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-lime-600 dark:text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Headline */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-50 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Full Body Text */}
            <div className="text-stone-800 dark:text-stone-200 text-base leading-relaxed space-y-6 whitespace-pre-line font-normal">
              {post.content}
            </div>

            {/* Bottom Actions (Appreciation) */}
            <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 py-3 px-6 rounded-2xl border transition-all duration-300 ease-out font-bold hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                  isLiked
                    ? "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-950/20 dark:border-orange-900/50 dark:text-orange-400"
                    : "bg-white border-stone-200 text-stone-700 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850"
                }`}
                aria-label={isLiked ? "Remove appreciation" : "Appreciate post"}
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${isLiked ? "fill-orange-600 text-orange-600 dark:fill-orange-400 dark:text-orange-400 scale-110" : "currentColor"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{likesCount} Appreciations</span>
              </button>

              <div className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest flex items-center gap-1.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{comments.length} Comments Logged</span>
              </div>
            </div>

          </div>
        </article>

        {/* ---------------------------------------------------------------------- */}
        {/* COMMENTS SECTION */}
        {/* ---------------------------------------------------------------------- */}
        <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm mt-10 space-y-8">
          
          <div>
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
              Botanical Discussion
            </h2>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Contribute your experience, amendments, advice or ask a follow-up question.
            </p>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-500 dark:text-stone-500 uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clara Green"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 dark:text-stone-500 uppercase tracking-wider mb-2">
                  Role / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hobbyist, Organic Grower"
                  value={commentRole}
                  onChange={(e) => setCommentRole(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-stone-500 uppercase tracking-wider mb-2">
                Comment
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your practical thoughts or soil findings..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="py-3 px-6 bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-400 dark:hover:bg-lime-500 dark:text-stone-950 text-sm font-bold rounded-2xl transition-all duration-300 ease-out hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
              >
                Submit Discussion
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="border-t border-stone-100 dark:border-stone-800 pt-8 space-y-6">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-450 dark:text-stone-550">
              Community Responses ({comments.length})
            </h3>

            {comments.length === 0 ? (
              /* RELATABLE EMPTY STATE MESSAGE */
              <div className="flex flex-col items-center justify-center py-12 text-center bg-stone-50 dark:bg-stone-950 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800 p-6 animate-scale-up">
                <span className="text-3xl mb-3">💬</span>
                <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-50">No discussions yet</h4>
                <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-500 max-w-sm leading-relaxed">
                  The soil is fertile but quiet! Be the first to share your thoughts, ask a question, or contribute your gardening tips.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-5 bg-stone-50 dark:bg-stone-950 border border-stone-200/40 dark:border-stone-800/45 rounded-2xl flex gap-4 text-xs leading-relaxed animate-scale-up"
                  >
                    {/* User Avatar Circle */}
                    <div className="w-8 h-8 rounded-full bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400 flex items-center justify-center font-extrabold shrink-0 text-sm">
                      {comment.author.split(" ").map((n) => n[0]).join("")}
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-stone-900 dark:text-stone-50">
                            {comment.author}
                          </span>
                          <span className="text-[8px] bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wide">
                            {comment.role}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-400 dark:text-stone-600">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-stone-750 dark:text-stone-300 font-normal">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </section>

      </div>
    </div>
  );
}
