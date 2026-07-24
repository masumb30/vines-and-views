import React from 'react';

export default function AboutUsPage() {
  const stats = [
    { label: 'Active Gardeners', value: '14,800+' },
    { label: 'Plant Cuttings Swapped', value: '32,000+' },
    { label: 'Articles & Guides Published', value: '4,500+' },
    { label: 'Hardiness Zones Covered', value: '13 Zones' },
  ];

  const values = [
    {
      title: 'Rooted in Science',
      desc: 'We prioritize evidence-based horticulture over aesthetic trends. Our guides rely on verified soil science, proper botany, and real gardener experience.',
      icon: '🧪',
    },
    {
      title: 'Community First',
      desc: 'Whether you have a single pothos or a commercial glasshouse, every plant lover has a voice and space to share their learning curve.',
      icon: '🌱',
    },
    {
      title: 'Organic & Sustainable',
      desc: 'We promote chemical-free pest control, regenerative soil techniques, and circular trading to reduce plastic waste in horticulture.',
      icon: '♻️',
    },
  ];

  const team = [
    {
      name: 'Elena Rostova',
      role: 'Co-Founder & Chief Botanical Officer',
      bio: 'Soil chemist with 12+ years in tropical plant propagation and urban forestry research.',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Marcus Thorne',
      role: 'Co-Founder & Community Lead',
      bio: 'Lover of rare Philodendrons and community organizer behind local seed-swap networks.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Dr. Sarah Lin',
      role: 'Head of Horticultural Review',
      bio: 'Entomologist specialized in natural pest management and beneficial insect ecosystems.',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-stone-50 text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-50">
      {/* Decorative Organic Radial Gradients */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-lime-500/10 blur-3xl dark:bg-lime-400/10" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-400/10" />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-orange-600 transition-all duration-300 hover:scale-[1.01] dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-500 dark:bg-orange-400 animate-pulse" />
            OUR STORY &amp; MISSION
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl dark:text-stone-50">
            Cultivating knowledge, <br className="hidden sm:inline" />
            <span className="text-emerald-700 dark:text-emerald-400">one vine at a time.</span>
          </h1>

          <p className="text-base text-stone-600 sm:text-lg dark:text-stone-400">
            Vines &amp; Views started as a humble balcony blog in 2021. Today, it is a global sanctuary connecting thousands of organic horticulturists, indoor jungle enthusiasts, and backyard growers.
          </p>
        </div>
      </section>

      {/* FEATURED STORY & IMAGE BANNER */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-4 shadow-xl dark:border-stone-800 dark:bg-stone-900 lg:p-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            
            {/* Image Column */}
            <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96 lg:col-span-6">
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80"
                alt="Sunlit greenhouse full of plants and propagation jars"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
            </div>

            {/* Narrative Column */}
            <div className="space-y-4 p-2 lg:col-span-6 lg:p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                WHY WE EXIST
              </span>
              <h2 className="text-2xl font-extrabold text-stone-900 sm:text-3xl dark:text-stone-50">
                Reconnecting people with soil, science, and sanctuary.
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed dark:text-stone-400">
                In an era dominated by rapid digital consumption, gardening brings us back to natural rhythms. We built Vines &amp; Views to strip away the algorithmic noise and deliver a clean, community-focused space where plant parents can share authentic trials, triumphs, and trades.
              </p>
              <p className="text-sm text-stone-600 leading-relaxed dark:text-stone-400">
                From urban window sills to multi-acre homesteads, we believe every green space contributes to biodiversity and personal well-being.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-lg dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-4 lg:p-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-1">
              <p className="text-2xl font-black text-emerald-700 sm:text-3xl lg:text-4xl dark:text-emerald-400">
                {stat.value}
              </p>
              <p className="text-xs font-medium text-stone-600 dark:text-stone-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            OUR GUIDING PRINCIPLES
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50">
            Values That Keep Us Grounded
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {values.map((val) => (
            <div
              key={val.title}
              className="group rounded-3xl border border-stone-200 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:border-lime-500 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-lime-400"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-2xl dark:bg-lime-950 mb-6">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50">
                {val.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            MEET THE HORTICULTURISTS
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50">
            The Minds Behind the Garden
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="relative h-56 w-full overflow-hidden rounded-2xl mb-5">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                {member.name}
              </h3>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                {member.role}
              </p>
              <p className="mt-3 text-xs text-stone-600 leading-relaxed dark:text-stone-400">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-emerald-700 p-8 text-center shadow-xl dark:border-stone-800 dark:bg-stone-900 lg:p-12">
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-white dark:text-stone-50">
              Want to contribute your garden knowledge?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base dark:text-stone-400">
              We are always looking for guest writers, horticulturists, and plant swappers to join our growing network.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="#join"
                className="inline-flex items-center justify-center rounded-2xl bg-lime-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-lime-400 dark:text-stone-950 dark:hover:bg-lime-300 dark:focus:ring-offset-stone-900"
              >
                Become a Community Writer
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}