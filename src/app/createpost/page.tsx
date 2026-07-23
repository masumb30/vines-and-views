"use client";

import React, { useState } from "react"; // Adjust this import path if yours is different (e.g., "@/lib/auth-client")
import { toast, ToastContainer } from "react-toastify";
import { IPostBase } from "@/types"; // Adjust path to your types file
import { authClient } from "@/lib/auth-client";


// Premium mock data for organic gardeners
const SAMPLE_GARDENING_POSTS: IPostBase[] = [
    {
        title: "My Secret Organic Tomato Liquid Fertilizer Recipe",
        content: "After three years of experimenting with nitrogen-fixing cover crops and comfrey steeps, I have finally perfected my tomato feed formula. The secret lies in cold-fermented stinging nettle leaves mixed with liquid kelp extract. Apply it once every two weeks after the first flower clusters set, and watch your yields skyrocket without harsh synthetic minerals.",
        thumbnail: "https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&q=80&w=800",
        tags: ["organic", "tomatoes", "fertilizer", "diy"]
    },
    {
        title: "Designing the Ultimate Companion Planting Map for Small Raised Beds",
        content: "When working with confined spaces, maximizing biodiversity is your best defense against pests. This season, I paired heirloom marigolds next to my bush beans, and sweet basil tucked underneath the brandywine tomatoes. Not only did the basil thrive in the partial shade, but the hornworm presence dropped down to zero. Here is my full companion planting schematic.",
        thumbnail: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800",
        tags: ["raised-beds", "companion-planting", "pest-control"]
    },
    {
        title: "How to Build an Infinite Kitchen Herb Garden from Supermarket Cuttings",
        content: "Stop buying plastic clamshells of fresh rosemary and mint. In this comprehensive guide, I'm showing you the precise node-cutting technique that will turn a single $3 supermarket bundle of herbs into a lifetime supply. We will cover water-propagation rooting timelines, soil mixes for early root health, and transition setups.",
        thumbnail: "https://images.unsplash.com/photo-1534710957970-eec57c42106e?auto=format&fit=crop&q=80&w=800",
        tags: ["herbs", "propagation", "budget-gardening", "indoor"]
    }
];

export default function CreatePostPage() {
    // Form fields
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    // UI status states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAutoFilling, setIsAutoFilling] = useState(false);

    // Auto Fill Handler
    const handleAutoFill = async () => {
        setIsAutoFilling(true);
        // Simulate a brief natural generation lag
        await new Promise((resolve) => setTimeout(resolve, 600));

        const randomIndex = Math.floor(Math.random() * SAMPLE_GARDENING_POSTS.length);
        const selectedPost = SAMPLE_GARDENING_POSTS[randomIndex];

        setTitle(selectedPost.title);
        setContent(selectedPost.content);
        setThumbnail(selectedPost.thumbnail);
        setTags(selectedPost.tags.join(", "));
        setIsAutoFilling(false);
        toast.info("Grown fresh from data seeds: Form populated!");
    };

    // Real API Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Look up user session data from Better Auth
            const { data: sessionData, error: sessionError } = await authClient.getSession();

            if (sessionError || !sessionData?.session?.token) {
                throw new Error("Authentication session not found. Please log in first.");
            }

            // 2. Prepare payload transforming tags back into string[]
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

            // 4. Success State Updates
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

    // Live calculation of tags to display in preview mode
    const tagList = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    const formattedDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

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

                    {/* Premium Auto-Fill Trigger Button */}
                    <button
                        type="button"
                        onClick={handleAutoFill}
                        disabled={isAutoFilling || isSubmitting}
                        className="inline-flex items-center px-5 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 font-medium text-sm shadow-sm transition-all duration-300 ease-out hover:scale-[1.01] hover:border-emerald-700 dark:hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAutoFilling ? (
                            <>
                                <svg className="animate-spin h-4 w-4 mr-2 text-emerald-700 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Sprouting Data...
                            </>
                        ) : (
                            <>
                                <svg className="h-4 w-4 mr-2 text-emerald-700 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Auto Fill Recipe Ideas
                            </>
                        )}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2 items-start">
                    {/* Left Panel: Form Inputs */}
                    <div className="bg-white dark:bg-stone-900 p-6 md:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-stone-900 dark:text-stone-50 mb-1.5">
                                Story Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all placeholder:text-stone-400"
                                placeholder="e.g., My Secret Tomato Harvest"
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
                            disabled={isSubmitting || isAutoFilling}
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
                                        // Fallback visual if invalid image URL entered
                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800";
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
                                {/* Secondary Accent (Terracotta) Category Indicator */}
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