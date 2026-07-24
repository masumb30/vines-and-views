'use client';
import React from 'react';

export const VinesAndViewsFooter: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-stone-50 text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-50">
      {/* Decorative Organic Background Accents */}
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-lime-500/10 blur-3xl dark:bg-lime-400/10" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-400/10" />

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        
        {/* TOP SECTION: NEWSLETTER CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-xl transition-all duration-300 dark:border-stone-800 dark:bg-stone-900 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            
            <div className="space-y-3 lg:col-span-7">
              <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400">
                🌱 WEEKLY BOTANICAL DIGEST
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50">
                Get seasonal planting guides & rare care tips sent straight to your inbox.
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Join over 14,000 gardeners receiving our weekly breakdown of plant propagation, soil science, and marketplace spotlight deals.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <div className="relative flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-900 shadow-sm transition-all duration-300 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50 dark:placeholder-stone-500 dark:focus:ring-offset-stone-900"
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-lime-400 dark:text-stone-950 dark:hover:bg-lime-300 dark:focus:ring-offset-stone-900"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-500">
                  No spam ever. Unsubscribe with one click anytime.
                </p>
              </form>
            </div>

          </div>
        </div>

        {/* MIDDLE SECTION: MAIN LINKS & BRANDING */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          
          {/* Brand Info Column */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-lime-600 text-lg text-white dark:bg-lime-400 dark:text-stone-950">
                🌿
              </span>
              <span className="text-xl font-black tracking-tight text-stone-900 dark:text-stone-50">
                Vines <span className="text-emerald-700 dark:text-emerald-400">&amp;</span> Views
              </span>
            </div>
            <p className="max-w-sm text-sm text-stone-600 dark:text-stone-400">
              A community-driven digital sanctuary for organic horticulturists, indoor jungle curators, and passionate home gardeners.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {['Instagram', 'Pinterest', 'YouTube', 'Community Forum'].map((platform) => (
                <a
                  key={platform}
                  href={`#${platform.toLowerCase()}`}
                  className="rounded-2xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-600 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-lime-500 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:border-lime-400 dark:hover:text-emerald-400 dark:focus:ring-offset-stone-950"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Explore Blog
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['Houseplant Care', 'Propagation Guides', 'Soil & Fertilizers', 'Urban Jungle Tours', 'Pest Control Remedies'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-stone-600 transition-all duration-300 hover:text-emerald-700 hover:underline dark:text-stone-400 dark:hover:text-emerald-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Marketplace
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['Trade Plant Cuttings', 'Organic Fertilizers', 'Handmade Planters', 'Horticulturist Directory', 'Local Plant Swaps'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-stone-600 transition-all duration-300 hover:text-emerald-700 hover:underline dark:text-stone-400 dark:hover:text-emerald-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Column 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Community & Legal
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['About Vines & Views', 'Writer Guidelines', 'Community Rules', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-stone-600 transition-all duration-300 hover:text-emerald-700 hover:underline dark:text-stone-400 dark:hover:text-emerald-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-200 py-8 text-xs text-stone-500 dark:border-stone-800 dark:text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Vines &amp; Views Inc. Cultivating community globally.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-lime-500 animate-ping" />
              All Systems Growing
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default VinesAndViewsFooter;