import React from 'react'

const Banner = () => {
    return (
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
    )
}

export default Banner