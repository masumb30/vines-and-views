"use client";

import React, { useState, useEffect, useMemo } from "react";

// ==========================================
// 1. PLATFORM METRICS / STATISTICS PANEL
// ==========================================
interface MetricItemProps {
  label: string;
  targetValue: number;
  suffix: string;
  icon: React.ReactNode;
}

function MetricItem({ label, targetValue, suffix, icon }: MetricItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * targetValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue]);

  return (
    <div className="group flex flex-col items-center justify-center p-6 transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm hover:shadow-md">
      <div className="mb-3 text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="mt-2 text-sm font-medium text-stone-600 dark:text-stone-400 text-center">
        {label}
      </span>
    </div>
  );
}

// ==========================================
// 2. AGENTIC AI CORE FEATURES SHOWCASE
// ==========================================
function AICoreFeatures() {
  // Chat Simulator State
  const [chatPreset, setChatPreset] = useState<number | null>(null);
  const [chatText, setChatText] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Tagging Simulator State
  const [optimizerDraft, setOptimizerDraft] = useState(
    "I want to grow high-yield organic tomatoes in my sandy loam raised bed. The weather in Zone 7b is getting warmer, and I'm looking to optimize companion flowers to repel nematodes."
  );
  const [detectedTags, setDetectedTags] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedTitle, setSuggestedTitle] = useState("");

  const chatPresets = [
    {
      q: "Zone 8a clay soil amendment?",
      a: "For Zone 8a clay soil, mix 3 inches of composted pine bark or well-rotted leaf mold. Add tillage radishes as a winter cover crop to break soil compaction naturally. Avoid raw sand.",
    },
    {
      q: "Propagating Rosemary in autumn?",
      a: "Rosemary propagates best from semi-ripe wood cuttings in early autumn. Cut a 4-inch stem, strip bottom leaves, dip in organic kelp hormone, and place in coarse perlite. Keep at 20°C.",
    },
  ];

  const handleChatPresetClick = (index: number) => {
    setChatPreset(index);
    setChatText(chatPresets[index].q);
    setIsTyping(true);
    setChatResponse("");
    
    setTimeout(() => {
      setIsTyping(false);
      setChatResponse(chatPresets[index].a);
    }, 1200);
  };

  const handleOptimizeDraft = () => {
    setIsAnalyzing(true);
    setDetectedTags([]);
    setSuggestedTitle("");

    setTimeout(() => {
      setIsAnalyzing(false);
      setDetectedTags(["Tomato Care", "Zone 7b", "Soil: Sandy Loam", "Companion Planting", "Nematode Control"]);
      setSuggestedTitle("Organic Nematode Control & Tomato Prep in Zone 7b");
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Card A: Context-Aware Botanical Assistant */}
      <div className="group flex flex-col justify-between p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 mb-4 border border-emerald-100 dark:border-emerald-900/50">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Agentic Reasoning
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
            Context-Aware Botanical Assistant
          </h3>
          <p className="mt-3 text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base">
            Our specialized AI reasons dynamically using your specific local climate database, soil structure profile, and micro-climate parameters to deliver localized answers.
          </p>
        </div>

        {/* Dynamic Interactive Simulator inside Card A */}
        <div className="mt-6 border border-stone-150 dark:border-stone-800 rounded-2xl p-4 bg-stone-50 dark:bg-stone-950">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-500 uppercase tracking-wide">
            Interactive Assistant Sandbox
          </span>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {chatPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleChatPresetClick(idx)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ease-out font-medium hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                  chatPreset === idx
                    ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-400 dark:text-stone-950 dark:border-emerald-400"
                    : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800"
                }`}
              >
                {preset.q}
              </button>
            ))}
          </div>

          <div className="mt-4 min-h-[120px] flex flex-col justify-end bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-3.5 text-xs text-stone-800 dark:text-stone-300">
            {!chatText ? (
              <div className="text-stone-400 dark:text-stone-500 italic text-center py-6">
                Click a query above to simulate agentic reasoning...
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-stone-100 dark:bg-stone-800 rounded-lg px-3 py-1.5 font-medium max-w-[85%] text-stone-900 dark:text-stone-100">
                    {chatText}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 dark:bg-emerald-400 flex items-center justify-center text-white dark:text-stone-950 text-[10px] font-bold shrink-0">
                    AI
                  </div>
                  <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg px-3 py-1.5 max-w-[85%] leading-relaxed border border-emerald-100/50 dark:border-emerald-900/30">
                    {isTyping ? (
                      <div className="flex items-center gap-1 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    ) : (
                      chatResponse
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card B: AI Content Optimizer & Automatic Tagging */}
      <div className="group flex flex-col justify-between p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 mb-4 border border-orange-100 dark:border-orange-900/50">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Automatic Tagging
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
            AI Content Optimizer & Auto-Tagging
          </h3>
          <p className="mt-3 text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base">
            Publish with confidence. Our neural analyzer parses drafts, improves botanical vocabulary, constructs meta-descriptions, and applies smart database tag parameters instantly.
          </p>
        </div>

        {/* Dynamic Interactive Simulator inside Card B */}
        <div className="mt-6 border border-stone-150 dark:border-stone-800 rounded-2xl p-4 bg-stone-50 dark:bg-stone-950">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-500 uppercase tracking-wide">
            Draft Optimization Sandbox
          </span>

          <div className="mt-3 space-y-2">
            <textarea
              value={optimizerDraft}
              onChange={(e) => setOptimizerDraft(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 min-h-[60px] resize-none"
            />
            <button
              onClick={handleOptimizeDraft}
              disabled={isAnalyzing}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-400 dark:hover:bg-lime-500 dark:text-stone-950 transition-all duration-300 ease-out hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-3 w-3 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Scanning Draft...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Optimize Draft & Tag
                </>
              )}
            </button>
          </div>

          {(detectedTags.length > 0 || suggestedTitle) && (
            <div className="mt-3 p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl space-y-2.5">
              {suggestedTitle && (
                <div>
                  <h4 className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                    Suggested Headline
                  </h4>
                  <p className="text-xs font-semibold text-stone-900 dark:text-stone-50 mt-0.5">
                    {suggestedTitle}
                  </p>
                </div>
              )}
              {detectedTags.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1.5">
                    Generated Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {detectedTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. TRENDING COMMUNITY POSTS
// ==========================================
interface PostItem {
  id: number;
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  content: string;
  author: string;
  authorTitle: string;
  pattern: React.ReactNode;
}

function TrendingCommunityPosts() {
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  const posts: PostItem[] = [
    {
      id: 1,
      category: "Soil Science",
      date: "Oct 18, 2026",
      readTime: "5 min read",
      title: "Demystifying Soil pH: The Secret to Hydrangea Hues",
      description: "Learn how soil acidity controls the vivid blues and pinks of your hydrangeas, and how to safely adjust it.",
      author: "Dr. Clara Sterling",
      authorTitle: "Soil Microbiologist",
      content: "Hydrangeas are nature's litmus paper. In highly acidic soils (pH 5.0 to 5.5), plants absorb aluminum, rendering the blossoms a deep indigo. In alkaline environments (pH 6.5 to 7.0), aluminum is locked away, yielding rosy pink petals. To shift pH, gardeners use soil sulfur or agricultural lime, but adjusting should be slow and validated through tests. Always protect root zones from sudden composition shock by mulching with composted leaf mold.",
      pattern: (
        <svg className="w-full h-full text-emerald-800/10 dark:text-emerald-400/5" viewBox="0 0 100 100" fill="currentColor">
          <defs>
            <pattern id="grid1" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid1)" />
          <circle cx="50" cy="50" r="30" className="text-emerald-700/20 dark:text-emerald-400/10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20,50 Q50,20 80,50 T50,80 Z" className="text-orange-500/20 dark:text-orange-400/10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 2,
      category: "Propagation",
      date: "Oct 15, 2026",
      readTime: "8 min read",
      title: "A Beginner's Guide to Air Layering Propagation",
      description: "Step-by-step instructions on propagating woody plants directly on the parent stem using peat moss and wraps.",
      author: "Marcus Greenleaf",
      authorTitle: "Nursery Propagator",
      content: "Air layering is a historic propagation shortcut for woody shrubs and trees. By girdling a small band of bark and wrapping it with damp sphagnum moss encased in plastic, you stimulate root development directly on the parent branch. Once a healthy bundle of white roots becomes visible within the wrapping, sever the branch below the wrap and pot your new, mature cloned plant.",
      pattern: (
        <svg className="w-full h-full text-emerald-800/10 dark:text-emerald-400/5" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,10 C30,35 30,65 50,90 C70,65 70,35 50,10 Z" className="text-emerald-700/20 dark:text-emerald-400/10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10,50 C35,30 65,30 90,50 C65,70 35,70 10,50 Z" className="text-orange-500/20 dark:text-orange-400/10" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
    {
      id: 3,
      category: "Urban Gardening",
      date: "Oct 12, 2026",
      readTime: "6 min read",
      title: "Companion Planting: Maximizing Raised Bed Yields",
      description: "Pairing tomatoes with basil and marigolds to deter pests, improve soil nutrients, and optimize garden space.",
      author: "Elena Rostova",
      authorTitle: "Permaculture Designer",
      content: "Raised beds offer high density yield, but only when paired intelligently. Planting French marigolds near tomatoes deters soil-dwelling root nematodes, while sweet basil enhances tomato flavor and repels thrips and hornworms. Radishes under squash draw flea beetles away from tender leaves. Combine rooting depths systematically so heavy feeders and shallow greens share nutrients harmoniously.",
      pattern: (
        <svg className="w-full h-full text-emerald-800/10 dark:text-emerald-400/5" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="25" cy="25" r="15" className="text-emerald-700/20 dark:text-emerald-400/10" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="75" cy="75" r="15" className="text-orange-500/20 dark:text-orange-400/10" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="25" y1="25" x2="75" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      ),
    },
    {
      id: 4,
      category: "Pest Management",
      date: "Oct 09, 2026",
      readTime: "7 min read",
      title: "Natural Solutions for Zone 8 Orchard Pests",
      description: "Keep your fruit trees thriving without harsh chemicals. Explore neem oil, companion planting, and beneficial insects.",
      author: "Samuel Reed",
      authorTitle: "Pomologist",
      content: "Orchard pest control in Zone 8 demands a balance of organic sprays and predatory bio-defenses. High humidity fosters aphids and codling moth larvae. Instead of broad pesticides, apply organic cold-pressed neem oil during dormant phases, install pheromone traps early in spring, and release ladybugs and green lacewings near fruit clusters to devour pests before they pierce developing skins.",
      pattern: (
        <svg className="w-full h-full text-emerald-800/10 dark:text-emerald-400/5" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,15 85,80 15,80" className="text-emerald-700/20 dark:text-emerald-400/10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="15" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col justify-between p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
          >
            <div>
              {/* Image Container with Terracotta Badge */}
              <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-stone-100 dark:bg-stone-950 border border-stone-200/50 dark:border-stone-800/50 flex items-center justify-center">
                {post.pattern}
                <span className="absolute top-3 left-3 bg-orange-600 dark:bg-orange-400 text-stone-50 dark:text-stone-950 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Metadata Row */}
              <div className="text-stone-600 dark:text-stone-400 text-xs font-semibold tracking-wide flex items-center gap-1.5">
                <span>{post.date}</span>
                <span className="text-stone-300 dark:text-stone-700">•</span>
                <span>{post.readTime}</span>
              </div>

              {/* Title */}
              <h4 className="mt-2 text-base font-extrabold text-stone-900 dark:text-stone-50 tracking-tight leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                {post.title}
              </h4>

              {/* Description */}
              <p className="mt-2 text-stone-600 dark:text-stone-400 text-xs leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => setSelectedPost(post)}
              className="mt-5 w-full py-2.5 px-4 border border-stone-200 dark:border-stone-800 rounded-2xl text-stone-900 dark:text-stone-50 text-xs font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 ease-out hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
            >
              View Details
            </button>
          </article>
        ))}
      </div>

      {/* Structured Modal for Post Details */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-2xl animate-scale-up max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-500"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div>
              <span className="inline-block bg-orange-600 dark:bg-orange-400 text-stone-50 dark:text-stone-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {selectedPost.category}
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
                {selectedPost.title}
              </h3>
              <div className="mt-2 text-stone-600 dark:text-stone-400 text-xs font-medium flex items-center gap-1.5">
                <span>By {selectedPost.author} ({selectedPost.authorTitle})</span>
                <span className="text-stone-300 dark:text-stone-700">•</span>
                <span>{selectedPost.date}</span>
                <span className="text-stone-300 dark:text-stone-700">•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="mt-6 border-t border-stone-200 dark:border-stone-800 pt-6">
              <p className="text-stone-600 dark:text-stone-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </p>
            </div>

            {/* Footer action */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="py-2.5 px-6 bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-400 dark:hover:bg-lime-500 dark:text-stone-950 rounded-2xl text-sm font-semibold transition-all duration-300 ease-out hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. DYNAMIC PLANT EXPLORER PREVIEW
// ==========================================
interface PlantItem {
  name: string;
  scientificName: string;
  zone: string;
  soil: string;
  light: string;
  water: string;
  description: string;
}

function DynamicPlantExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState("All");
  const [selectedSoil, setSelectedSoil] = useState("All");

  const plants: PlantItem[] = [
    {
      name: "Fiddle Leaf Fig",
      scientificName: "Ficus lyrata",
      zone: "Zone 10",
      soil: "Loamy",
      light: "Bright Indirect",
      water: "Medium",
      description: "Highly popular indoor plant characterized by large, glossy, fiddle-shaped leaves.",
    },
    {
      name: "English Lavender",
      scientificName: "Lavandula angustifolia",
      zone: "Zone 5",
      soil: "Sandy",
      light: "Full Sun",
      water: "Low",
      description: "Strongly scented evergreen shrub producing elegant blue-purple flowers in summer.",
    },
    {
      name: "Japanese Maple",
      scientificName: "Acer palmatum",
      zone: "Zone 6",
      soil: "Loamy",
      light: "Partial Shade",
      water: "Medium",
      description: "Small deciduous tree famous for its delicate, deeply lobed autumn leaves.",
    },
    {
      name: "Virgin's Bower Clematis",
      scientificName: "Clematis virginiana",
      zone: "Zone 4",
      soil: "Clay",
      light: "Full to Part Sun",
      water: "High",
      description: "Climbing vine offering abundant clusters of sweet, star-like white blossoms.",
    },
    {
      name: "Highbush Blueberry",
      scientificName: "Vaccinium corymbosum",
      zone: "Zone 3",
      soil: "Peaty",
      light: "Full Sun",
      water: "High",
      description: "Deciduous shrub thriving in acidic peaty marshlands, yielding delicious dark fruit.",
    },
    {
      name: "Purple Coneflower",
      scientificName: "Echinacea purpurea",
      zone: "Zone 3",
      soil: "Loamy",
      light: "Full Sun",
      water: "Low",
      description: "Vibrant native prairie wildflower with high drought and pest tolerance.",
    },
    {
      name: "Eastern White Pine",
      scientificName: "Pinus strobus",
      zone: "Zone 3",
      soil: "Sandy",
      light: "Full Sun",
      water: "Medium",
      description: "Large coniferous evergreen tree suited for sandy windbreaks and acid soils.",
    },
    {
      name: "Prickly Pear Cactus",
      scientificName: "Opuntia humifusa",
      zone: "Zone 4",
      soil: "Sandy",
      light: "Full Sun",
      water: "Low",
      description: "Hardy spreading cactus bearing gorgeous golden blossoms and edible deep red fruit.",
    },
  ];

  const zones = ["All", "Zone 3", "Zone 4", "Zone 5", "Zone 6", "Zone 10"];
  const soils = ["All", "Sandy", "Clay", "Loamy", "Peaty"];

  // Memoized filtered plants
  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesZone = selectedZone === "All" || plant.zone === selectedZone;
      const matchesSoil = selectedSoil === "All" || plant.soil === selectedSoil;
      return matchesSearch && matchesZone && matchesSoil;
    });
  }, [searchTerm, selectedZone, selectedSoil]);

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-sm">
      {/* Filters Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end border-b border-stone-100 dark:border-stone-800 pb-6 mb-6">
        {/* Search */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-500 mb-2">
            Search Species Catalog
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search e.g. Lavender, Ficus..."
              className="w-full text-sm pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 transition-all"
            />
            <svg
              className="w-4 h-4 absolute left-3.5 top-3 text-stone-400 dark:text-stone-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Hardiness Zone Selectors */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-500 mb-2">
            Filter by Hardiness Zone
          </label>
          <div className="flex flex-wrap gap-1.5">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all duration-300 ease-out font-medium hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                  selectedZone === zone
                    ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-400 dark:text-stone-950 dark:border-emerald-400"
                    : "bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800"
                }`}
              >
                {zone === "All" ? "All Zones" : zone}
              </button>
            ))}
          </div>
        </div>

        {/* Soil Category Selectors */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-500 mb-2">
            Filter by Soil Category
          </label>
          <div className="flex flex-wrap gap-1.5">
            {soils.map((soil) => (
              <button
                key={soil}
                onClick={() => setSelectedSoil(soil)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all duration-300 ease-out font-medium hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                  selectedSoil === soil
                    ? "bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-400 dark:text-stone-950 dark:border-emerald-400"
                    : "bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800"
                }`}
              >
                {soil === "All" ? "All Soils" : soil}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Explorer Grid */}
      <div className="min-h-[220px]">
        {filteredPlants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="w-12 h-12 text-stone-300 dark:text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-3 text-sm font-semibold text-stone-900 dark:text-stone-50">No plants match your active criteria</p>
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-500">Try loosening your search query or reset filters.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedZone("All");
                setSelectedSoil("All");
              }}
              className="mt-4 text-xs font-semibold px-4 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-xl transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.map((plant, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-600/30 dark:hover:border-emerald-400/30"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="text-sm font-extrabold text-stone-900 dark:text-stone-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {plant.name}
                      </h5>
                      <span className="text-xs italic text-stone-400 dark:text-stone-500">
                        {plant.scientificName}
                      </span>
                    </div>
                    <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-md font-bold bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50">
                      {plant.zone}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-2">
                    {plant.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/50 dark:border-stone-800/50 grid grid-cols-3 gap-2 text-[10px] font-semibold text-stone-600 dark:text-stone-400">
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">
                      Soil
                    </span>
                    <span className="text-stone-800 dark:text-stone-300">{plant.soil}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">
                      Light
                    </span>
                    <span className="text-stone-800 dark:text-stone-300">{plant.light}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">
                      Water
                    </span>
                    <span className="text-stone-800 dark:text-stone-300">{plant.water}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. COMMUNITY WALL FEED TEASER
// ==========================================
interface Comment {
  author: string;
  role: string;
  content: string;
}

interface FeedItem {
  id: number;
  author: string;
  role: string;
  avatarInitials: string;
  avatarBg: string;
  time: string;
  content: string;
  tag: string;
  likes: number;
  reshares: number;
  comments: Comment[];
  isLikedByUser?: boolean;
  isResharedByUser?: boolean;
}

function CommunityWallFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([
    {
      id: 1,
      author: "Aria Thorne",
      role: "Permaculture Designer",
      avatarInitials: "AT",
      avatarBg: "bg-emerald-600 text-white",
      time: "2 hours ago",
      content: "Just harvested my first batch of organic vermicompost! The worm activity was off the charts this season. Ready to enrich the Zone 6b raised beds for autumn.",
      tag: "#SoilMicrobiology",
      likes: 28,
      reshares: 5,
      comments: [
        {
          author: "Liam Chen",
          role: "Market Gardener",
          content: "That looks like black gold! What was your primary bedding material?",
        },
        {
          author: "Aria Thorne",
          role: "Permaculture Designer",
          content: "A mix of shredded cardboard, leaf mold, and coffee grounds.",
        },
      ],
    },
    {
      id: 2,
      author: "Marcus Vance",
      role: "Orchid Conservator",
      avatarInitials: "MV",
      avatarBg: "bg-orange-600 text-white",
      time: "5 hours ago",
      content: "Rescued this neglected Phalaenopsis orchid three months ago. After cutting dead roots and repotting in coarse fir bark, we have a new leaf and root tip! Patience pays off.",
      tag: "#OrchidRescue",
      likes: 45,
      reshares: 12,
      comments: [
        {
          author: "Sophia Martinez",
          role: "Floral Designer",
          content: "Orchid rescues are the best! Keep us updated on the blooms.",
        },
      ],
    },
  ]);

  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({});
  const [newCommentTexts, setNewCommentTexts] = useState<Record<number, string>>({});

  const toggleComments = (postId: number) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleLike = (postId: number) => {
    setFeed((prev) =>
      prev.map((item) => {
        if (item.id === postId) {
          const isLiked = !item.isLikedByUser;
          return {
            ...item,
            likes: isLiked ? item.likes + 1 : item.likes - 1,
            isLikedByUser: isLiked,
          };
        }
        return item;
      })
    );
  };

  const handleReshare = (postId: number) => {
    setFeed((prev) =>
      prev.map((item) => {
        if (item.id === postId) {
          const isReshared = !item.isResharedByUser;
          return {
            ...item,
            reshares: isReshared ? item.reshares + 1 : item.reshares - 1,
            isResharedByUser: isReshared,
          };
        }
        return item;
      })
    );
  };

  const submitComment = (postId: number) => {
    const text = newCommentTexts[postId]?.trim();
    if (!text) return;

    setFeed((prev) =>
      prev.map((item) => {
        if (item.id === postId) {
          return {
            ...item,
            comments: [
              ...item.comments,
              {
                author: "You (Demo User)",
                role: "Hobbyist Cultivator",
                content: text,
              },
            ],
          };
        }
        return item;
      })
    );

    setNewCommentTexts((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {feed.map((post) => (
        <div
          key={post.id}
          className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm space-y-4"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${post.avatarBg}`}>
                {post.avatarInitials}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-50 leading-tight">
                  {post.author}
                </h4>
                <p className="text-[10px] text-stone-600 dark:text-stone-400 font-semibold uppercase tracking-wider">
                  {post.role}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-stone-400 dark:text-stone-600">
              {post.time}
            </span>
          </div>

          {/* Post Content */}
          <div className="space-y-2">
            <p className="text-stone-850 dark:text-stone-200 text-sm leading-relaxed">
              {post.content}
            </p>
            <span className="inline-block text-xs font-bold text-orange-600 dark:text-orange-400">
              {post.tag}
            </span>
          </div>

          {/* Interactive Actions Row */}
          <div className="flex items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-4 text-xs font-semibold text-stone-600 dark:text-stone-400">
            {/* Like */}
            <button
              onClick={() => handleLike(post.id)}
              className={`flex items-center gap-1.5 transition-all duration-300 ease-out hover:scale-105 hover:text-orange-600 dark:hover:text-orange-400 focus:outline-none ${
                post.isLikedByUser ? "text-orange-600 dark:text-orange-400" : ""
              }`}
            >
              <svg
                className={`w-4 h-4 ${post.isLikedByUser ? "fill-current" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{post.likes} Likes</span>
            </button>

            {/* Comment Count / Collapse */}
            <button
              onClick={() => toggleComments(post.id)}
              className="flex items-center gap-1.5 transition-all duration-300 ease-out hover:scale-105 hover:text-emerald-700 dark:hover:text-emerald-400 focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{post.comments.length} Comments</span>
            </button>

            {/* Reshare */}
            <button
              onClick={() => handleReshare(post.id)}
              className={`flex items-center gap-1.5 transition-all duration-300 ease-out hover:scale-105 hover:text-emerald-700 dark:hover:text-emerald-400 focus:outline-none ${
                post.isResharedByUser ? "text-emerald-700 dark:text-emerald-400" : ""
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l5.053 2.527m0 0a3 3 0 113.703-3.703L12.382 12m2.164 2.164l-5.053-2.527m0 0a3 3 0 10-3.703 3.703L8.684 12" />
              </svg>
              <span>{post.reshares} Reshares</span>
            </button>
          </div>

          {/* Comments Panel */}
          {expandedComments[post.id] && (
            <div className="mt-4 border-t border-stone-100 dark:border-stone-850 pt-4 space-y-4">
              <div className="space-y-3">
                {post.comments.map((comment, index) => (
                  <div key={index} className="flex gap-2.5 bg-stone-50 dark:bg-stone-950 p-3 rounded-2xl border border-stone-150 dark:border-stone-800/40 text-xs">
                    <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center font-extrabold shrink-0 text-stone-700 dark:text-stone-300 text-[9px]">
                      {comment.author.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-stone-900 dark:text-stone-50">
                          {comment.author}
                        </span>
                        <span className="text-[8px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-wider">
                          {comment.role}
                        </span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-350 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={newCommentTexts[post.id] || ""}
                  onChange={(e) => setNewCommentTexts((prev) => ({ ...prev, [post.id]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitComment(post.id);
                  }}
                  placeholder="Join the discussion... Press Enter to post"
                  className="flex-1 text-xs px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-850 bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 transition-all"
                />
                <button
                  onClick={() => submitComment(post.id)}
                  className="py-2.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:text-stone-950 text-xs font-bold transition-all duration-300 ease-out hover:scale-105 focus:outline-none"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 6. SEASONAL NEWSLETTER & CALL TO ACTION
// ==========================================
function SeasonalNewsletter() {
  const [email, setEmail] = useState("");
  const [zone, setZone] = useState("Zone 7");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden bg-lime-600 dark:bg-lime-400 text-white dark:text-stone-950 rounded-3xl p-8 md:p-12 shadow-lg">
      {/* Decorative leaf SVGs in background */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-y-12 translate-x-12 scale-150">
        <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 8C8 10 9 21 9 21s8.5-9.5 8-13zm-2.5 9s1.5-6.5 4.5-8.5c0 0-6.5.5-8.5 4.5 0 0 2.5 1.5 4 4zM2 2v20h20V2H2zm18 18H4V4h16v16z" />
        </svg>
      </div>

      <div className="relative max-w-2xl">
        <span className="inline-block bg-white/20 dark:bg-stone-950/20 text-stone-50 dark:text-stone-950 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border border-white/10 dark:border-stone-950/10 mb-4">
          Seasonal Gardening Intelligence
        </span>
        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Join the Autumn Planting Pipeline
        </h3>
        <p className="mt-3 text-emerald-50 dark:text-stone-850 max-w-xl text-sm md:text-base leading-relaxed font-medium">
          Receive region-specific frost warnings, crop planting calendars, and organic pest mitigation advice direct to your inbox.
        </p>

        {submitted ? (
          <div className="mt-8 p-6 bg-white/10 dark:bg-stone-950/15 border border-white/20 dark:border-stone-950/20 rounded-2xl max-w-lg animate-scale-up">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-stone-950 flex items-center justify-center text-lime-600 dark:text-lime-400 font-extrabold shadow-sm">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-extrabold">You're on the list!</h4>
                <p className="text-xs text-emerald-50 dark:text-stone-800 mt-0.5">
                  Regional alerts for <span className="font-extrabold">{zone}</span> will be dispatched to <span className="font-extrabold">{email}</span>.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col md:flex-row gap-3 max-w-xl">
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 text-sm px-4 py-3 rounded-2xl border border-white/10 bg-white/10 focus:bg-white focus:text-stone-900 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-stone-950 placeholder-emerald-100 dark:placeholder-stone-700 transition-all font-medium text-white"
              />
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="text-sm px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white dark:text-stone-950 focus:bg-white focus:text-stone-900 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-stone-950 transition-all font-semibold"
              >
                <option value="Zone 3" className="text-stone-900">Zone 3</option>
                <option value="Zone 4" className="text-stone-900">Zone 4</option>
                <option value="Zone 5" className="text-stone-900">Zone 5</option>
                <option value="Zone 6" className="text-stone-900">Zone 6</option>
                <option value="Zone 7" className="text-stone-900">Zone 7</option>
                <option value="Zone 8" className="text-stone-900">Zone 8</option>
                <option value="Zone 9" className="text-stone-900">Zone 9</option>
                <option value="Zone 10" className="text-stone-900">Zone 10</option>
              </select>
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-stone-950 hover:bg-stone-900 dark:bg-stone-900 dark:hover:bg-stone-850 dark:text-white text-white rounded-2xl text-sm font-extrabold transition-all duration-300 ease-out hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-stone-950 dark:focus:ring-white focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT WRAPPER
// ==========================================
export default function LandingSections() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. PLATFORM METRICS / STATISTICS PANEL */}
      <section id="platform-metrics" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              Scale & Impact
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50 mt-2 tracking-tight">
              Empowering Organic Growers Globally
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm md:text-base leading-relaxed">
              Our shared cultivation intelligence catalog scales larger daily. Explore live platform counters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricItem
              label="Active Horticulturists"
              targetValue={45}
              suffix="k+"
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
            />
            <MetricItem
              label="Botanical Species Cataloged"
              targetValue={120}
              suffix="k+"
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
            <MetricItem
              label="Successful Propagation Logs"
              targetValue={89}
              suffix="k+"
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* 2. AGENTIC AI CORE FEATURES SHOWCASE */}
      <section id="ai-features" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              AI Core Technology
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50 mt-2 tracking-tight">
              Agentic Botanical Intelligence
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm md:text-base leading-relaxed">
              Automate drafting research and consult zone-precise neural models tailored for your micro-climate.
            </p>
          </div>

          <AICoreFeatures />
        </div>
      </section>

      {/* 3. TRENDING COMMUNITY POSTS */}
      <section id="trending-posts" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              Community Hub
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50 mt-2 tracking-tight">
              Trending Cultivation Insights
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm md:text-base leading-relaxed">
              Explore high-engagement guides and experiments written by professional organic horticulturists.
            </p>
          </div>

          <TrendingCommunityPosts />
        </div>
      </section>

      {/* 4. DYNAMIC PLANT EXPLORER PREVIEW */}
      <section id="plant-explorer" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              Interactive Catalog
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50 mt-2 tracking-tight">
              Dynamic Plant Database Explorer
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm md:text-base leading-relaxed">
              Find matching companion species based on target hardiness zone parameters and specific soil composition needs.
            </p>
          </div>

          <DynamicPlantExplorer />
        </div>
      </section>

      {/* 5. COMMUNITY WALL FEED TEASER */}
      <section id="community-feed" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              Live Feed
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50 mt-2 tracking-tight">
              Community Wall Feed Timeline
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-400 text-sm md:text-base leading-relaxed">
              Follow real-time updates, log likes, reshare propagation logs, or contribute to ongoing soil and plant discussions.
            </p>
          </div>

          <CommunityWallFeed />
        </div>
      </section>

      {/* 6. SEASONAL NEWSLETTER & CALL TO ACTION */}
      <section id="seasonal-newsletter" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SeasonalNewsletter />
        </div>
      </section>
    </div>
  );
}
