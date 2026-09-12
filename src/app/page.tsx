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


        {/* Hero Segment Placeholder Note (Visual Boundary) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
          <VinesAndViewsHero />
        </div>

        {/* The 6 Core Landing Page Sections */}
        <main className="pb-24">
          <LandingSections />
        </main>


      </div>
    </div>
  );
}
