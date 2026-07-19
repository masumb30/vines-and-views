"use client";

import React, { useState } from "react";
// import { format } from "date-fns";

export default function CreatePostPage() {
  // Form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate a network request – replace with real API call later
    await new Promise((r) => setTimeout(r, 1500));
    console.log({ title, content, tags, thumbnail });
    // Reset form after submit (optional)
    setTitle("");
    setContent("");
    setTags("");
    setThumbnail("");
    setIsSubmitting(false);
  };

  // Helper to transform tags string into array
  const tagList = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-stone-50 mb-8 text-center">
          Share Your Gardening Story
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
          {/* Left – Form inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="e.g., My Secret Tomato Harvest"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Thumbnail URL (optional)
              </label>
              <input
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="organic, raised beds, herbs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={8}
                className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="Write your gardening story..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-400 dark:hover:bg-lime-500 dark:text-stone-950 rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Publishing…
                </span>
              ) : (
                "Publish Post"
              )}
            </button>
          </div>

          {/* Right – Live preview (hidden on small screens) */}
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
              Live Preview
            </h2>
            <article className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm">
              {thumbnail && (
                <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-extrabold text-stone-900 dark:text-stone-50 mb-2">
                  {title || "Your title will appear here"}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tagList.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold uppercase bg-emerald-600 dark:bg-emerald-400 text-white px-2 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-base text-stone-700 dark:text-stone-300 whitespace-pre-line">
                  {content || "Start typing your story, and it will appear here…"}
                </p>
                <p className="mt-4 text-xs text-stone-500 dark:text-stone-600">
                  {/* {format(new Date(), "PPP")} */} date
                </p>
              </div>
            </article>
          </div>
        </form>
      </div>
    </div>
  );
}
