"use client";

import React, { useState, useEffect, useMemo } from "react";
import { gardeningPosts, Post } from "../../../data";
import Link from "next/link";

// ----------------------------------------------------------------------
// TYPES AND INTERFACES EXTENSIONS
// ----------------------------------------------------------------------
interface CommentItem {
  id: string;
  author: string;
  role: string;
  content: string;
  createdAt: string;
}

// Helper to format ISO dates to a beautiful readable format
const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("en-US", options);
};

// Helper to calculate reading time
const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// ----------------------------------------------------------------------
// EXPLORE PAGE COMPONENT
// ----------------------------------------------------------------------
export default function ExplorePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  // State for posts (to make likes dynamic and stateful)
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  // Detailed Modal State
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Comments map (stored in state for demo session)
  const [commentsMap, setCommentsMap] = useState<Record<string, CommentItem[]>>({});
  const [newCommentText, setNewCommentText] = useState("");

  // Sync dark mode class with page wrapper automatically
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = root.classList.contains("dark");
    setDarkMode(isDark);

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

  // Initialize gardening posts state
  useEffect(() => {
    setPosts(gardeningPosts);

    // Seed dummy comments for each post based on its comments count
    const initialComments: Record<string, CommentItem[]> = {};
    gardeningPosts.forEach((post) => {
      const titleKey = post.title;
      const count = post.comments || 3;
      const seedComments: CommentItem[] = [
        {
          id: `${post.userId}-c1`,
          author: "Sage Bloomquist",
          role: "Permaculture Consultant",
          content: "This is exactly what our local gardening group has been discussing. Wonderful read!",
          createdAt: new Date(new Date(post.createdAt).getTime() + 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: `${post.userId}-c2`,
          author: "Fern Forrester",
          role: "Urban Botanist",
          content: "Super helpful tip about the soil composition. Will definitely put this into action this weekend.",
          createdAt: new Date(new Date(post.createdAt).getTime() + 1000 * 60 * 60 * 5).toISOString(),
        },
      ];

      // Add a third comment if the count is higher
      if (count > 2) {
        seedComments.push({
          id: `${post.userId}-c3`,
          author: "Clay Sterling",
          role: "Compost Specialist",
          content: "I've tried a similar approach in Zone 7a and had stellar yields. Highly recommend this method!",
          createdAt: new Date(new Date(post.createdAt).getTime() + 1000 * 60 * 60 * 12).toISOString(),
        });
      }

      initialComments[titleKey] = seedComments;
    });

    setCommentsMap(initialComments);
  }, []);

  // Extract all unique tags dynamically
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [posts]);

  // Handle Dynamic Liking
  const handleLikeToggle = (e: React.MouseEvent, postTitle: string) => {
    e.stopPropagation(); // Prevent opening modal when clicking like
    const isAlreadyLiked = likedPosts[postTitle];

    setLikedPosts((prev) => ({
      ...prev,
      [postTitle]: !isAlreadyLiked,
    }));

    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.title === postTitle) {
          return {
            ...p,
            likes: isAlreadyLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );

    // If modal is currently open with this post, sync the likes count in modal too
    if (selectedPost && selectedPost.title === postTitle) {
      setSelectedPost((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          likes: isAlreadyLiked ? prev.likes - 1 : prev.likes + 1,
        };
      });
    }
  };

  // Submit a comment in the detail view
  const handleCommentSubmit = (e: React.FormEvent, postTitle: string) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      author: "Guest Gardener",
      role: "Hobbyist Cultivator",
      content: newCommentText.trim(),
      createdAt: new Date().toISOString(),
    };

    setCommentsMap((prev) => ({
      ...prev,
      [postTitle]: [newComment, ...(prev[postTitle] || [])],
    }));

    // Update count in the posts array
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.title === postTitle) {
          return {
            ...p,
            comments: (p.comments || 0) + 1,
          };
        }
        return p;
      })
    );

    // Sync comments count in modal
    if (selectedPost && selectedPost.title === postTitle) {
      setSelectedPost((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          comments: (prev.comments || 0) + 1,
        };
      });
    }

    setNewCommentText("");
  };

  // Filter and Sort Logic
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // 1. Tag Filter
    if (selectedTag !== "all") {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.user.name.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 3. Sorting
    if (sortBy === "latest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "likes") {
      result.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "comments") {
      result.sort((a, b) => b.comments - a.comments);
    }

    return result;
  }, [posts, selectedTag, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 transition-colors duration-300">

      {/* HEADER MARGIN TO FIT STICKY HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ---------------------------------------------------------------------- */}
        {/* 1. HEADING HERO BANNER */}
        {/* ---------------------------------------------------------------------- */}
        <header className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-lime-950 text-white rounded-3xl p-8 md:p-12 shadow-lg border border-emerald-800/30 mb-12">
          {/* Botanical SVG Asset Decorator in background */}
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none translate-y-8 translate-x-8 md:translate-y-2 md:translate-x-2 scale-125 transition-transform duration-500">
            <svg className="w-72 h-72 text-lime-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17 8C8 10 9 21 9 21s8.5-9.5 8-13zm-2.5 9s1.5-6.5 4.5-8.5c0 0-6.5.5-8.5 4.5 0 0 2.5 1.5 4 4zM2 2v20h20V2H2zm18 18H4V4h16v16z" />
            </svg>
          </div>

          <div className="relative max-w-2xl z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-lime-400/20 text-lime-300 border border-lime-400/30 mb-4">
              <span className="animate-pulse">🌱</span> Botanical Sanctuary
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Explore Gardening Insights
            </h1>
            <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed font-medium">
              A botanical sanctuary where like-minded people share their gardening experience and tips, helping each other cultivate beautiful, thriving organic green spaces.
            </p>
          </div>
        </header>

        {/* ---------------------------------------------------------------------- */}
        {/* 2. INTERACTIVE CONTROLS SECTION */}
        {/* ---------------------------------------------------------------------- */}
        <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-sm mb-10 space-y-6">

          {/* Top Line: Search Input & Sort Options */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by title, keywords, tags, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm pl-11 pr-10 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 transition-all duration-300"
              />
              <div className="absolute left-4 top-3.5 text-stone-400 dark:text-stone-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-3 text-xs font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selection */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-bold text-stone-500 dark:text-stone-500 uppercase tracking-widest whitespace-nowrap">
                Sort Posts:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 transition-all duration-300 font-semibold cursor-pointer"
              >
                <option value="latest">Latest Updates</option>
                <option value="likes">Most Appreciated</option>
                <option value="comments">Most Conversational</option>
              </select>
            </div>
          </div>

          {/* Bottom Line: Category Tags Filtering */}
          <div className="border-t border-stone-100 dark:border-stone-850 pt-5">
            <span className="block text-xs font-bold text-stone-500 dark:text-stone-500 uppercase tracking-widest mb-3">
              Filter by Topic:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("all")}
                className={`text-xs px-4 py-2 rounded-xl border transition-all duration-300 ease-out font-bold hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-lime-500 ${selectedTag === "all"
                  ? "bg-lime-600 border-lime-600 text-white dark:bg-lime-400 dark:border-lime-400 dark:text-stone-950 shadow-sm"
                  : "bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-850"
                  }`}
              >
                All Topics
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-xs px-4 py-2 rounded-xl border transition-all duration-300 ease-out font-bold hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-lime-500 ${selectedTag === tag
                    ? "bg-lime-600 border-lime-600 text-white dark:bg-lime-400 dark:border-lime-400 dark:text-stone-950 shadow-sm"
                    : "bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-850"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* 3. POSTS RESULTS GRID */}
        {/* ---------------------------------------------------------------------- */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500">
              Showing {filteredAndSortedPosts.length} Botanical Logs
            </p>
            {(searchQuery || selectedTag !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("all");
                }}
                className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredAndSortedPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl text-center p-6 shadow-sm">
              <svg className="w-16 h-16 text-stone-300 dark:text-stone-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-50">No Cultivation Logs Found</h3>
              <p className="mt-2 text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto">
                We couldn't find any matches for "{searchQuery || selectedTag}". Try adjusting your search query or choosing another topic category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("all");
                }}
                className="mt-6 py-2.5 px-6 bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-400 dark:hover:bg-lime-500 dark:text-stone-950 text-xs font-bold rounded-2xl transition-all duration-300 ease-out hover:scale-105"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedPosts.map((post) => {
                const isLiked = likedPosts[post.title];
                const readTime = calculateReadingTime(post.content);
                return (
                  <Link href="/explore/1">
                    <article
                      key={post.title}
                      // onClick={() => setSelectedPost(post)}
                      className="group flex flex-col justify-between bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        {/* Image Thumbnail with badge overlay */}
                        <div className="relative h-56 w-full overflow-hidden bg-stone-150 dark:bg-stone-950 border-b border-stone-100 dark:border-stone-850">
                          {post.thumbnail ? (
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100 dark:bg-stone-800">
                              No image available
                            </div>
                          )}

                          {/* Tags list overlaid top-left */}
                          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 max-w-[85%]">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-extrabold uppercase tracking-wider bg-orange-600 dark:bg-orange-400 text-stone-50 dark:text-stone-950 px-2.5 py-1 rounded-full shadow-sm"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-[10px] font-extrabold bg-stone-900/80 backdrop-blur-sm text-stone-50 px-2 py-1 rounded-full">
                                +{post.tags.length - 2}
                              </span>
                            )}
                          </div>

                          {/* Reading Time Badge bottom-right */}
                          <div className="absolute bottom-4 right-4 bg-stone-900/85 backdrop-blur-sm text-stone-100 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide shadow-sm flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {readTime}
                          </div>
                        </div>

                        {/* Card Content body */}
                        <div className="p-6">

                          {/* Publish Date */}
                          <span className="text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest block mb-2">
                            Published {formatDate(post.createdAt)}
                          </span>

                          {/* Title */}
                          <h3 className="text-lg font-extrabold text-stone-900 dark:text-stone-50 leading-snug tracking-tight mb-3 line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                            {post.title}
                          </h3>

                          {/* Truncated Content */}
                          <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed line-clamp-3 mb-4">
                            {post.content}
                          </p>

                          {/* Author row */}
                          <div className="flex items-center gap-3 border-t border-stone-100 dark:border-stone-850 pt-4">
                            <div className="w-8 h-8 rounded-full bg-emerald-700/10 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400 flex items-center justify-center font-extrabold text-xs shadow-inner">
                              {post.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-xs font-extrabold text-stone-900 dark:text-stone-100 leading-tight">
                                {post.user.name}
                              </p>
                              <p className="text-[9px] text-stone-400 dark:text-stone-500 font-semibold uppercase tracking-wider">
                                Gardener ID: {post.userId.replace("usr_", "")}
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Interactive footer actions */}
                      <div className="px-6 pb-6 pt-2 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-400">

                        {/* Likes count */}
                        <button
                          onClick={(e) => handleLikeToggle(e, post.title)}
                          className={`flex items-center gap-1.5 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group/like focus:outline-none`}
                          aria-label={isLiked ? "Unlike post" : "Like post"}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform group-hover/like:scale-125 ${isLiked ? "fill-orange-600 stroke-orange-600 text-orange-600 dark:fill-orange-400 dark:stroke-orange-400 dark:text-orange-400" : "currentColor"
                              }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span className={isLiked ? "text-orange-600 dark:text-orange-400 font-bold" : ""}>
                            {post.likes}
                          </span>
                        </button>

                        {/* Comments count */}
                        <div className="flex items-center gap-1.5 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
                          <svg className="w-4 h-4 text-stone-400 dark:text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{post.comments || 0}</span>
                        </div>

                        {/* Expand CTA */}
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 group-hover:underline flex items-center gap-1">
                          Read
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>

                    </article>

                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* 4. MODAL OVERLAY FOR FULL ARTICLE VIEW */}
        {/* ---------------------------------------------------------------------- */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-scale-up">

              {/* Floating Close Button */}
              <button
                onClick={() => {
                  setSelectedPost(null);
                  setNewCommentText("");
                }}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-900/50 hover:bg-stone-900/80 text-white backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500"
                aria-label="Close article modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto flex-1">

                {/* Header Image Cover */}
                <div className="relative h-64 md:h-80 w-full bg-stone-100 dark:bg-stone-950">
                  <img
                    src={selectedPost.thumbnail}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                  {/* Category Pill on Image Bottom */}
                  <div className="absolute bottom-6 left-6 md:left-8 flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-extrabold uppercase tracking-wider bg-orange-600 dark:bg-orange-400 text-stone-50 dark:text-stone-950 px-3 py-1 rounded-full shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 md:p-8 space-y-6">

                  {/* Author Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-stone-100 dark:border-stone-850">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-700 text-white dark:bg-emerald-400 dark:text-stone-950 flex items-center justify-center font-extrabold text-sm shadow-md">
                        {selectedPost.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                          {selectedPost.user.name}
                        </h4>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold uppercase tracking-wider">
                          Organic Practitioner • ID: {selectedPost.userId}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-950 px-4 py-2 rounded-2xl border border-stone-200/50 dark:border-stone-800/50">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
                        </svg>
                        <span>{formatDate(selectedPost.createdAt)}</span>
                      </div>
                      <span className="text-stone-300 dark:text-stone-800">|</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-lime-600 dark:text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{calculateReadingTime(selectedPost.content)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-50 leading-tight tracking-tight">
                    {selectedPost.title}
                  </h2>

                  {/* Full Article Content */}
                  <div className="text-stone-700 dark:text-stone-300 text-sm md:text-base leading-relaxed space-y-4 font-normal whitespace-pre-line">
                    {selectedPost.content}
                  </div>

                  {/* Likes/Comments Interaction Banner */}
                  <div className="flex items-center gap-6 bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-150 dark:border-stone-850">
                    <button
                      onClick={(e) => handleLikeToggle(e, selectedPost.title)}
                      className="flex items-center gap-2 text-xs font-bold hover:text-orange-600 dark:hover:text-orange-400 transition-colors focus:outline-none"
                    >
                      <svg
                        className={`w-5 h-5 ${likedPosts[selectedPost.title] ? "fill-orange-600 stroke-orange-600 text-orange-600 dark:fill-orange-400 dark:stroke-orange-400" : "text-stone-400"
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{selectedPost.likes} Appreciations</span>
                    </button>

                    <div className="flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-400">
                      <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{(commentsMap[selectedPost.title] || []).length} Discussions</span>
                    </div>
                  </div>

                  {/* ---------------------------------------------------------------------- */}
                  {/* DYNAMIC COMMENTS SECTION */}
                  {/* ---------------------------------------------------------------------- */}
                  <div className="pt-6 border-t border-stone-100 dark:border-stone-850">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-4">
                      Botanical Discussion Feed
                    </h3>

                    {/* New Comment Submission Form */}
                    <form onSubmit={(e) => handleCommentSubmit(e, selectedPost.title)} className="flex flex-col sm:flex-row gap-3 mb-6">
                      <input
                        type="text"
                        placeholder="Add to the organic knowledge base... share your experience"
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="flex-1 text-sm px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={!newCommentText.trim()}
                        className="py-3 px-6 bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-400 dark:hover:bg-lime-500 dark:text-stone-950 text-sm font-bold rounded-2xl transition-all duration-300 ease-out hover:scale-[1.01] disabled:opacity-50 disabled:scale-100 disabled:hover:bg-lime-600 dark:disabled:hover:bg-lime-400"
                      >
                        Publish Comment
                      </button>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-4">
                      {(commentsMap[selectedPost.title] || []).length === 0 ? (
                        <p className="text-xs text-stone-400 dark:text-stone-600 italic">No comments yet. Start the conversation!</p>
                      ) : (
                        (commentsMap[selectedPost.title] || []).map((comment) => (
                          <div
                            key={comment.id}
                            className="p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200/40 dark:border-stone-850 rounded-2xl flex gap-3 text-xs leading-relaxed animate-scale-up"
                          >
                            {/* Commenter Initials */}
                            <div className="w-8 h-8 rounded-full bg-emerald-700/15 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400 flex items-center justify-center font-extrabold shrink-0">
                              {comment.author.split(" ").map((n) => n[0]).join("")}
                            </div>

                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center justify-between flex-wrap gap-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-stone-900 dark:text-stone-100">
                                    {comment.author}
                                  </span>
                                  <span className="text-[8px] bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wide">
                                    {comment.role}
                                  </span>
                                </div>
                                <span className="text-[9px] text-stone-400 dark:text-stone-600">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-stone-700 dark:text-stone-300 font-normal">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                  </div>

                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 border-t border-stone-100 dark:border-stone-850 flex justify-end bg-stone-50 dark:bg-stone-900/50">
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    setNewCommentText("");
                  }}
                  className="py-2.5 px-6 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-850 text-stone-900 dark:text-stone-100 text-xs font-bold rounded-2xl transition-all duration-300 ease-out hover:scale-[1.01]"
                >
                  Close Article
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
