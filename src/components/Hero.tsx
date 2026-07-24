import React from 'react';

export const VinesAndViewsHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-stone-50 text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-50 rounded-md">
      {/* Decorative Organic Radial Gradients */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-lime-500/10 blur-3xl dark:bg-lime-400/10" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-400/10" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="space-y-6 lg:col-span-7">
            
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-orange-600 transition-all duration-300 hover:scale-[1.01] dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-500 dark:bg-orange-400 animate-pulse" />
              COMMUNITY-DRIVEN BOTANICAL HUB
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl dark:text-stone-50">
              Where plant passions <br className="hidden sm:inline" />
              <span className="text-emerald-700 dark:text-emerald-400">root, flourish</span> & find a view.
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="max-w-2xl text-base text-stone-600 sm:text-lg dark:text-stone-400">
              Explore expert horticulturist guides, share your urban jungle progress, and trade rare cuttings with a worldwide community of soil lovers.
            </p>

            {/* Interactive Search / Newsletter Input */}
            <form onSubmit={(e) => e.preventDefault()} className="max-w-xl space-y-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search 'Monstera propagation', 'Soil mix'..."
                  className="w-full rounded-2xl border border-stone-200 bg-white py-3.5 pl-4 pr-32 text-sm text-stone-900 shadow-sm transition-all duration-300 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-50 dark:placeholder-stone-500 dark:focus:ring-offset-stone-950"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 inline-flex items-center justify-center rounded-xl bg-lime-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.01] hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-lime-400 dark:text-stone-950 dark:hover:bg-lime-300 dark:focus:ring-offset-stone-900"
                >
                  Explore
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#start-reading"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-emerald-500 dark:text-stone-950 dark:hover:bg-emerald-400 dark:focus:ring-offset-stone-950"
              >
                Read Latest Articles
              </a>
              <a
                href="#marketplace"
                className="inline-flex items-center justify-center rounded-2xl border border-stone-200 bg-white px-6 py-3.5 text-sm font-semibold text-stone-900 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-50 dark:hover:bg-stone-800 dark:focus:ring-offset-stone-950"
              >
                Join Marketplace
              </a>
            </div>

            {/* Community Social Proof / Stats */}
            <div className="flex flex-wrap items-center gap-6 border-t border-stone-200 pt-6 dark:border-stone-800">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-stone-50 dark:ring-stone-900" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User Avatar" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-stone-50 dark:ring-stone-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User Avatar" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-stone-50 dark:ring-stone-900" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User Avatar" />
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400">
                <span className="font-bold text-stone-900 dark:text-stone-50">14,800+</span> active gardeners sharing stories & tips today.
              </div>
            </div>

          </div>

          {/* RIGHT VISUAL COLUMN */}
          <div className="relative lg:col-span-5">
            {/* Main Hero Featured Blog Card Frame */}
            <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-3 shadow-xl transition-all duration-300 dark:border-stone-800 dark:bg-stone-900">
              
              {/* Feature Image */}
              <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-80">
                <img
                  src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80"
                  alt="Aesthetic greenhouse with potted tropical plants"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full border border-orange-200 bg-orange-600 px-3 py-1 text-xs font-semibold text-white shadow-sm dark:border-orange-800 dark:bg-orange-500">
                  Featured Story
                </span>
              </div>

              {/* Floating Overlay Badge (Gardener Spotlight) */}
              <div className="absolute -bottom-4 -left-4 max-w-xs rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-lg backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/95 sm:bottom-6 sm:-left-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-100 text-emerald-700 dark:bg-lime-950 dark:text-emerald-400">
                    🌿
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-50">Pro Tip of the Week</h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      "Aerate indoor potting soil with coarse perlite to prevent root rot in winter."
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 pt-5">
                <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
                  <span>By Elena Rostova</span>
                  <span>5 min read</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-stone-900 dark:text-stone-50">
                  The Art of Indoor Aeration: Reviving Slow-Growing Variegated Monsteras
                </h3>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VinesAndViewsHero;