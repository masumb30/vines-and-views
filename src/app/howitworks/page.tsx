import React from 'react';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      badge: 'EXPLORE & DISCOVER',
      title: 'Find Inspiration & Expert Advice',
      description:
        'Browse hundreds of community-written guides, seasonal planting calendars, and pest-control tips filtered by your climate zone or indoor lighting.',
      icon: '🌱',
      tag: 'Read & Learn',
    },
    {
      number: '02',
      badge: 'SHARE YOUR JUNGLE',
      title: 'Publish Stories & Track Growth',
      description:
        'Document your botanical journey, upload high-res photos of your plant propagation, and share lessons learned with a supportive global community.',
      icon: '🌿',
      tag: 'Create Content',
    },
    {
      number: '03',
      badge: 'COMMUNITY & TRADE',
      title: 'Swap Cuttings & Local Finds',
      description:
        'Connect directly with trusted organic horticulturists to trade rare node cuttings, buy handmade ceramic planters, or join local plant swaps.',
      icon: '🪴',
      tag: 'Marketplace',
    },
  ];

  const features = [
    {
      title: 'Verified Plant Parents',
      desc: 'Expert horticulturists get verified badges so you always get reliable advice.',
      icon: '✨',
    },
    {
      title: 'Climate-Smart Filtering',
      desc: 'Filter blog posts and care guides tailored specifically to your USDA hardiness zone.',
      icon: '☀️',
    },
    {
      title: 'Safe Cutting Swaps',
      desc: 'Built-in community messaging and reputation scores make node trading stress-free.',
      icon: '🤝',
    },
    {
      title: 'Zero Ad Clutter',
      desc: 'An organic reader experience focused solely on lush photography and rich knowledge.',
      icon: '🍃',
    },
  ];

  const faqs = [
    {
      q: 'Is Vines & Views free to join?',
      a: 'Yes! Joining the community, reading articles, and sharing your own plant posts is 100% free forever.',
    },
    {
      q: 'How does the Marketplace trading work?',
      a: 'Members can list plant cuttings or homemade organic fertilizers. You can reach out directly to arrange local pick-ups or safe shipping.',
    },
    {
      q: 'Can I write articles for Vines & Views?',
      a: 'Absolutely. Once you create an account, you can submit drafts to our community editors right from your dashboard.',
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-stone-50 text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-50">
      {/* Decorative Organic Radial Gradients */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-lime-500/10 blur-3xl dark:bg-lime-400/10" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-400/10" />

      {/* HERO / HEADER SECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-orange-600 transition-all duration-300 hover:scale-[1.01] dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-500 dark:bg-orange-400 animate-pulse" />
            SIMPLE 3-STEP PROCESS
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl dark:text-stone-50">
            How <span className="text-emerald-700 dark:text-emerald-400">Vines &amp; Views</span> Works
          </h1>

          <p className="mx-auto max-w-2xl text-base text-stone-600 sm:text-lg dark:text-stone-400">
            Whether you are here to learn soil chemistry, share your indoor jungle, or swap rare cuttings, here is how our ecosystem comes together.
          </p>
        </div>
      </section>

      {/* STEP-BY-STEP PROCESS SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:border-lime-500 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-lime-400"
            >
              {/* Step Header */}
              <div>
                <div className="flex items-center justify-between pb-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-2xl dark:bg-lime-950">
                    {step.icon}
                  </span>
                  <span className="text-3xl font-black text-stone-300 dark:text-stone-700">
                    {step.number}
                  </span>
                </div>

                <span className="inline-block text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  {step.badge}
                </span>

                <h3 className="mt-2 text-xl font-bold text-stone-900 dark:text-stone-50">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {step.description}
                </p>
              </div>

              {/* Step Footer Badge */}
              <div className="pt-6">
                <span className="inline-flex items-center rounded-xl bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US / FEATURES GRID */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xl dark:border-stone-800 dark:bg-stone-900 lg:p-12">
          
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50">
              Cultivated for Gardeners, by Gardeners
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Designed to make botanical learning intuitive, engaging, and collaborative.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-6 transition-all duration-300 hover:scale-[1.01] dark:border-stone-800 dark:bg-stone-950"
              >
                <div className="text-2xl mb-3">{feat.icon}</div>
                <h4 className="text-base font-bold text-stone-900 dark:text-stone-50">
                  {feat.title}
                </h4>
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            COMMON QUESTIONS
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-stone-800 dark:bg-stone-900"
            >
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
                {faq.q}
              </h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-emerald-700 p-8 text-center shadow-xl dark:border-stone-800 dark:bg-stone-900 lg:p-12">
          
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-white dark:text-stone-50">
              Ready to grow your botanical garden &amp; network?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base dark:text-stone-400">
              Join thousands of horticulturists sharing plant logs, advice, and local cuttings today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="#signup"
                className="inline-flex items-center justify-center rounded-2xl bg-lime-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-lime-400 dark:text-stone-950 dark:hover:bg-lime-300 dark:focus:ring-offset-stone-900"
              >
                Get Started for Free
              </a>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}