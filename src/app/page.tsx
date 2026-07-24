"use client";

import React, { useState, useEffect } from "react";
import LandingSections from "../components/LandingSections";
import VinesAndViewsHero from "@/components/Hero";
import VinesAndViewsFooter from "@/components/Footer";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode class with page wrapper
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-stone-50 text-stone-600 dark:bg-stone-950 dark:text-stone-400 font-sans transition-colors duration-300">

        {/* Floating Theme Controller for Interactive Review */}
        <div className="fixed right-0 bottom-2 z-50 flex items-center gap-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 px-4 py-2 rounded-full shadow-lg">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-5 rounded-full bg-stone-200 dark:bg-emerald-600 relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            aria-label="Toggle theme"
          >
            <div
              className={`w-4 h-4 rounded-full bg-white dark:bg-stone-950 absolute top-0.5 left-0.5 transition-transform duration-300 ${darkMode ? "translate-x-4" : ""
                }`}
            />
          </button>
        </div>



        {/* Hero Segment Placeholder Note (Visual Boundary) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <VinesAndViewsHero />
          {/* <div className="border-b border-dashed border-stone-300 dark:border-stone-800 pb-6 text-center">
            <span className="text-[10px] font-bold text-stone-400 dark:text-stone-600 uppercase tracking-widest block">
              [ End of Hero Section ]
            </span>
          </div> */}
        </div>

        {/* The 6 Core Landing Page Sections */}
        <main className="pb-24">
          <LandingSections />
        </main>

        
      </div>
    </div>
  );
}
