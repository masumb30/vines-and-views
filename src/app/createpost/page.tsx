"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { IPostBase } from "@/types";
import { authClient } from "@/lib/auth-client";

const GARDENING_TITLE_SUGGESTIONS: string[] = [
  "My Secret Organic Tomato Liquid Fertilizer Recipe",
  "Designing the Ultimate Companion Planting Map for Small Raised Beds",
  "How to Build an Infinite Kitchen Herb Garden from Supermarket Cuttings",
  "5 Essential Tips for Preparing Soil Before Spring Planting",
  "How to Stop Tomato Blossom End Rot Using Natural Soil Calcium",
  "A Beginner's Guide to Vermicomposting and Worm Tea Extraction",
  "Maximizing Yields in Low-Light Urban Balcony Container Gardens",
  "How to Prune Indeterminate Tomatoes for Maximum Fruit Production",
  "Natural Pest Control: Attracting Beneficial Insects to Your Garden",
  "The Ultimate Guide to Growing Garlic from Cloves to Harvest",
  "How to Build a Low-Cost Drip Irrigation System for Raised Beds",
  "Mastering Seed Starting Indoors: Lighting, Moisture, and Temperature",
  "Why Cover Crops are the Best Way to Regenerate Tired Garden Soil",
  "Growing Microgreens on Your Windowsill for Daily Fresh Harvests",
  "How to Turn Fallen Autumn Leaves into Rich Garden Leaf Mold",
  "Best Perennial Vegetables to Plant Once and Harvest for Years",
  "How to Fix Clay Soil Fast Using Compost and Organic Aeration",
  "The Secrets to Growing Crisp, Sweet Carrots in Deep Beds",
  "How to Build a DIY Cold Frame for Year-Round Garden Harvesting",
  "Companion Planting Bush Beans and Corn for Natural Pest Defense",
];

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  // AI Generator Options & States
  const [wordCount, setWordCount] = useState<number>(300);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Reset retry/regeneration state whenever the title changes
  useEffect(() => {
    setHasGenerated(false);
    setRetryCount(0);
  }, [title]);

  // Auto-Fill Title Handler
  const handleAutoFillTitle = async () => {
    setIsAutoFilling(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const randomIndex = Math.floor(Math.random() * GARDENING_TITLE_SUGGESTIONS.length);
    const selectedTitle = GARDENING_TITLE_SUGGESTIONS[randomIndex];

    setTitle(selectedTitle);
    setIsAutoFilling(false);
  };

  // AI Post Generation Handler
  const handleGenerateAIPost = async () => {
    if (!title.trim()) {
      toast.warning("Please enter a title first so the AI knows what to write about!");
      return;
    }

    setIsGeneratingAI(true);
    try {
      const response = await fetch("http://localhost:5000/posts/generate-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          length: wordCount,
          retryCount: hasGenerated ? retryCount + 1 : 0,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to generate AI post.");
      }

      const { content: aiContent, tags: aiTags, thumbnail: aiThumbnail } = result.data;

      setContent(aiContent || "");
      setThumbnail(aiThumbnail || "");
      if (Array.isArray(aiTags)) {
        setTags(aiTags.join(", "));
      }

      setHasGenerated(true);
      if (hasGenerated) {
        setRetryCount((prev) => prev + 1);
      }

      toast.success(
        hasGenerated
          ? "✨ AI regenerated your post details successfully!"
          : "✨ AI generated your post details successfully!"
      );
    } catch (error: any) {
      toast.error(error.message || "Something went wrong while asking the AI.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Real API Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: sessionData, error: sessionError } = await authClient.getSession();

      if (sessionError || !sessionData?.session?.token) {
        throw new Error("Authentication session not found. Please log in first.");
      }

      const cleanTags = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload: IPostBase = {
        title,
        content,
        thumbnail,
        tags: cleanTags,
      };

      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData.session.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to broadcast your gardening story.");
      }

      toast.success("✨ Your gardening story has been published successfully!");
      setTitle("");
      setContent("");
      setTags("");
      setThumbnail("");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "An unexpected error occurred while saving your post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tagList = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Controls button activation
  const isTitleEmpty = !title.trim();

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToastContainer />

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-stone-50 mb-4 tracking-tight">
            Share Your Gardening Story
          </h1>
          <p className="text-stone-600 dark:text-stone-400 max-w-md mx-auto mb-6 text-sm md:text-base">
            Inspire the community by logging your cultivation journey, soil remedies, or organic harvest benchmarks.
          </p>

          {/* Action Header Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleAutoFillTitle}
              disabled={isAutoFilling || isSubmitting || isGeneratingAI}
              className="inline-flex items-center px-4 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 font-medium text-sm shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-emerald-700 dark:hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-lime-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAutoFilling ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2 text-emerald-700 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Picking Title Idea...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-2 text-emerald-700 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Auto Fill Title Idea
                </>
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2 items-start">
          {/* Left Panel: Form Inputs */}
          <div className="bg-white dark:bg-stone-900 p-6 md:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <label className="block text-sm font-semibold text-stone-900 dark:text-stone-50">
                  Story Title
                </label>

                <div className="flex items-center gap-2">
                  {/* Word Count Option */}
                  <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400">
                    <span>Words:</span>
                    <input
                      type="number"
                      min={200}
                      max={500}
                      step={50}
                      value={wordCount}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setWordCount(Math.min(Math.max(val, 200), 500));
                      }}
                      className="w-16 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 px-2 py-0.5 text-xs text-center focus:outline-none focus:ring-1 focus:ring-lime-500"
                    />
                  </div>

                  {/* AI Generation / Regeneration Trigger Button */}
                  <button
                    type="button"
                    onClick={handleGenerateAIPost}
                    disabled={isTitleEmpty || isGeneratingAI || isSubmitting || isAutoFilling}
                    title={isTitleEmpty ? "Type a title first to enable AI generation" : "Generate content, tags, and image with AI"}
                    className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-500 hover:to-lime-500 text-white shadow-sm transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-lime-500 disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {isGeneratingAI ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 mr-1.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        {hasGenerated ? "Regenerating..." : "Generating..."}
                      </>
                    ) : (
                      <>
                        <svg className="h-3.5 w-3.5 mr-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.601 15.12a2 2 0 00-1.022.547l-1.3 1.3a2 2 0 000 2.828l1.3 1.3a2 2 0 002.828 0l1.3-1.3a2 2 0 00.547-1.022l.477-2.387a6 6 0 01.517-3.86l.158-.318a6 6 0 00.517-3.86l-.477-2.387a2 2 0 00-.547-1.022l-1.3-1.3a2 2 0 00-2.828 0l-1.3 1.3a2 2 0 000 2.828l1.3 1.3z" />
                        </svg>
                        {hasGenerated ? "✨ Regenerate" : "✨ Generate Post using AI"}
                      </>
                    )}
                  </button>
                </div>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all placeholder:text-stone-400"
                placeholder="write title to generate post with ai"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-900 dark:text-stone-50 mb-1.5">
                Thumbnail URL <span className="text-stone-400 dark:text-stone-500 text-xs font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                placeholder="https://example.com/garden-photo.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-900 dark:text-stone-50 mb-1.5">
                Tags <span className="text-stone-400 dark:text-stone-500 text-xs font-normal">(Comma separated)</span>
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                placeholder="organic, raised-beds, permaculture"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-900 dark:text-stone-50 mb-1.5">
                Journal Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={8}
                className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all placeholder:text-stone-400"
                placeholder="Document soil mixes, weather events, bloom progress..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isAutoFilling || isGeneratingAI}
              className="w-full py-3.5 px-6 bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-400 dark:hover:bg-lime-500 dark:text-stone-950 rounded-2xl font-bold transition-all duration-300 ease-out hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-lime-600/10 dark:shadow-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Publishing to Grid…
                </span>
              ) : (
                "Publish Post"
              )}
            </button>
          </div>

          {/* Right Panel: Live Botanical Preview */}
          <div className="hidden md:block sticky top-8">
            <h2 className="text-sm font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">
              Live Feed Preview
            </h2>
            <article className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm transition-all duration-300">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={title || "Preview Thumbnail"}
                  className="w-full h-52 object-cover border-b border-stone-100 dark:border-stone-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              ) : (
                <div className="w-full h-52 bg-stone-100 dark:bg-stone-950/50 flex items-center justify-center border-b border-stone-100 dark:border-stone-800 text-stone-400">
                  <svg className="w-10 h-10 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-2">
                  Journal Entry
                </span>

                <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 mb-3 leading-snug">
                  {title || "Your brilliant title will grow here"}
                </h3>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tagList.length > 0 ? (
                    tagList.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium bg-stone-100 dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-stone-400 dark:text-stone-600 italic">No tags selected</span>
                  )}
                </div>

                <p className="text-sm text-stone-600 dark:text-stone-400 whitespace-pre-line line-clamp-6 leading-relaxed">
                  {content || "Start typing your cultivation details on the left form field. Your formatting, breaks, and logs will render instantaneously right here..."}
                </p>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400 dark:text-stone-500">
                  <span>Author: You</span>
                  <span>{formattedDate}</span>
                </div>
              </div>
            </article>
          </div>
        </form>
      </div>
    </div>
  );
}