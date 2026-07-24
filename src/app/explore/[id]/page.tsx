"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

// ----------------------------------------------------------------------
// BACKEND TYPES (Matching Populated Mongoose Output)
// ----------------------------------------------------------------------
export interface PopulatedUser {
  _id: string;
  name: string;
  email?: string;
  image?: string;
}

export interface PopulatedComment {
  _id: string;
  postId: string;
  userId: PopulatedUser;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PopulatedPost {
  _id: string;
  userId: PopulatedUser;
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  likes: PopulatedUser[];
  comments: PopulatedComment[];
  createdAt: string;
  updatedAt: string;
}

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
// BLOG POST DETAIL PAGE COMPONENT
// ----------------------------------------------------------------------
export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap Next.js dynamic params using React.use()
  const { id: postId } = use(params);

  const {data, isPending} = authClient.useSession();

  // Component States
  const [post, setPost] = useState<PopulatedPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic Likes & Comments Local State
  const [likesCount, setLikesCount] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<PopulatedComment[]>([]);

  // New Comment Input State
  const [commentContent, setCommentContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const commentsCount = 0;
  // --------------------------------------------------------------------
  // FETCH POPULATED POST FROM API
  // --------------------------------------------------------------------
  useEffect(() => {
    if (!postId) return;

    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:5000/posts/${postId}`);

        if (!res.ok) {
          if (res.status === 404) throw new Error("Post not found");
          throw new Error("Failed to load post details");
        }

        const payload = await res.json();
        const fetchedPost: PopulatedPost = payload.data;
        console.log(fetchedPost);
        const data = await authClient.getSession();


        setPost(fetchedPost);
        setLikesCount(fetchedPost.likes?.length || 0);
        setLiked(fetchedPost.likes?.some((user) => user._id === data?.data?.session?.userId) || false);
        setComments(fetchedPost.comments || []);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId, commentsCount]);

  // --------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------


  const handleDeleteComment = async (commentId: string) => {
    const { data: sessionData } = await authClient.getSession();
    if (!sessionData?.session?.token) {
      alert("You must be logged in to post a comment.");
      return;
    }
    try {
      await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionData?.session?.token}` },
      });

      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || !postId) return;
    const { data: sessionData } = await authClient.getSession();
    if (!sessionData?.session?.token) {
      alert("You must be logged in to post a comment.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(`http://localhost:5000/comments/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionData?.session?.token}` },
        body: JSON.stringify({ content: commentContent.trim() }),
      });

      if (res.ok) {
        const payload = await res.json();
        console.log("Comment posted successfully:", payload);
        setComments((prev) => [payload.comment, ...prev]);
        setCommentContent("");
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikePost = async(likeType: 'like' | 'unlike') => {
    const { data: sessionData } = await authClient.getSession();
    if (!sessionData?.session?.token) {
      alert("You must be logged in to like a post.");
      return;
    }
    try {
      await fetch(`http://localhost:5000/posts/like/${postId}/${likeType}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionData?.session?.token}` },
      });

      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  }

  // --------------------------------------------------------------------
  // UI STATES: LOADING & NOT FOUND
  // --------------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-6">
        <div className="flex items-center gap-3 text-stone-500 dark:text-stone-400 font-bold text-sm">
          <div className="w-5 h-5 border-2 border-lime-600 border-t-transparent rounded-full animate-spin" />
          Fetching botanical details...
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-md">
          <span className="text-4xl">🥀</span>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 mt-4">
            Botanical Log Not Found
          </h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            {error || "We couldn't retrieve the specified post details."}
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

            {/* Appreciation Bar */}
            <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <button
              disabled={!data?.session?.token}
                onClick={()=> handleLikePost(liked ? 'unlike' : 'like')}
                className={`flex cursor-pointer items-center gap-2 py-3 px-6 rounded-2xl border transition-all duration-300 font-bold hover:scale-[1.02] ${liked
                    ? "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-950/20 dark:border-orange-900/50 dark:text-orange-400"
                    : "bg-white border-stone-200 text-stone-700 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 hover:bg-stone-50"
                  }`}
              >
                <svg
                  className={`w-5 h-5 ${liked
                      ? "fill-orange-600 text-orange-600 dark:fill-orange-400"
                      : "currentColor"
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{likesCount} Appreciations</span>
              </button>

              <div className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest flex items-center gap-1.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{comments.length} Comments Logged</span>
              </div>
            </div>


          </div>
        </article>

        {/* COMMENTS SECTION */}
        <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm mt-10 space-y-8">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
              Botanical Discussion
            </h2>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Contribute your experience, amendments, or ask a follow-up question.
            </p>
          </div>

          {/* Comment Submission Form */}

          {
            data?.session?.userId ?
          
          <form onSubmit={handleCommentSubmit} className="space-y-4">
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
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 cursor-pointer px-6 bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-400 dark:hover:bg-lime-500 dark:text-stone-950 text-sm font-bold rounded-2xl transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Submit Discussion"}
              </button>
            </div>
          </form>
          :
          <div className="flex items-center justify-center py-12 text-red-200">
            Sign in to take part in the discussion
          </div>
}

          {/* Render Populated Comments List */}
          <div className="border-t border-stone-100 dark:border-stone-800 pt-8 space-y-6">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500">
              Community Responses ({comments.length})
            </h3>

            {comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-stone-50 dark:bg-stone-950 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800 p-6">
                <span className="text-3xl mb-3">💬</span>
                <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-50">
                  No discussions yet
                </h4>
                <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-500 max-w-sm">
                  Be the first to share your thoughts or ask a question!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment: any) => (
                  <div
                    key={comment._id}
                    className="p-5 bg-stone-50 dark:bg-stone-950 border border-stone-200/40 dark:border-stone-800/45 rounded-2xl flex gap-4 text-xs leading-relaxed"
                  >
                    {/* Populated Commenter Avatar */}
                    {comment.userId?.image ? (
                      <img
                        src={comment.userId.image}
                        alt={comment.userId.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400 flex items-center justify-center font-extrabold shrink-0 text-sm">
                        {getInitials(comment.userId?.name)}
                      </div>
                    )}

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="font-extrabold text-stone-900 dark:text-stone-50">
                          {comment.userId?.name || "Community Member"}
                        </span>
                        <span className="text-[10px] flex flex-col text-stone-400 dark:text-stone-600">
                          {formatDate(comment.createdAt)}

                          {/* render delete button */}

                          {
                            !isPending && data?.session?.userId === comment.userId?._id &&
                          
                          
                          <div onClick={()=> handleDeleteComment(comment._id)} className="cursor-pointer flex items-center justify-center w-7 h-7 rounded-full bg-red-50 hover:bg-red-700/10 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60">
                            <svg
                              className="w-4 h-4 text-red-600 dark:text-red-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
}

                        </span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 font-normal">
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