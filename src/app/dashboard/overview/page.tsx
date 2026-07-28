import Link from 'next/link';
import { CopyTitleButton } from './CopyTitleButton';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';



// Interface matching the backend response format
interface RecommendedIdea {
  title: string;
  rationale: string;
  suggestedTags: string[];
}

interface OverviewData {
  metrics: {
    totalPosts: number;
    totalLikesReceived: number;
    totalCommentsReceived: number;
    commentsGivenCount: number;
    daysSinceLastPost: number | null;
  };
  aiReport: {
    accountSummary: string;
    activityAnalysis: string;
    engagementBreakdown: string;
    areasForImprovement: string[];
    recommendedPostIdeas: RecommendedIdea[];
  };
}

async function getAIAccountOverview(): Promise<OverviewData | null> {
  try {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session?.session?.token) throw new Error('User not signed in');
    const token = session.session.token;
    const res = await fetch(`https://vine-and-views-backend.onrender.com/account-overview`, {
      cache: 'no-store', // Ensures fresh analytical data on load
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        // In real auth, pass cookies or authorization headers here
      },
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Failed to fetch AI account overview:', error);
    return null;
  }
}

export default async function AIAccountOverviewPage() {
  const data = await getAIAccountOverview();

  if (!data) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-12 dark:bg-stone-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-xs dark:border-stone-800 dark:bg-stone-900">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
            Overview Unavailable
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            We couldn't retrieve your AI account overview right now. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  const { metrics, aiReport } = data;

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 dark:bg-stone-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Hero Banner Header */}
        <header className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                🌿 AI Growth Advisor
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
                Garden Account Overview
              </h1>
              <p className="mt-2 text-base text-stone-600 dark:text-stone-400">
                AI-driven analysis of your activity, engagement trends, and suggested topics.
              </p>
            </div>
            
            <Link
              href="/createpost"
              className="inline-flex items-center justify-center rounded-2xl bg-lime-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all duration-300 ease-out hover:scale-[1.01] hover:bg-lime-700 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:bg-lime-400 dark:text-stone-950 dark:hover:bg-lime-300 dark:focus:ring-offset-stone-900"
            >
              Write New Post
            </Link>
          </div>
        </header>

        {/* Quick Metrics Bar */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <p className="text-xs font-medium text-stone-600 dark:text-stone-400">Total Posts</p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50">{metrics.totalPosts}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <p className="text-xs font-medium text-stone-600 dark:text-stone-400">Likes Received</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-400">{metrics.totalLikesReceived}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <p className="text-xs font-medium text-stone-600 dark:text-stone-400">Comments Received</p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50">{metrics.totalCommentsReceived}</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <p className="text-xs font-medium text-stone-600 dark:text-stone-400">Last Active</p>
            <p className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
              {metrics.daysSinceLastPost !== null ? `${metrics.daysSinceLastPost}d ago` : 'Never'}
            </p>
          </div>
        </section>

        {/* Narrative Overview & Insights */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Executive Summary */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">Account Summary</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {aiReport.accountSummary}
            </p>
          </div>

          {/* Activity Analysis */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">Activity & Presence</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {aiReport.activityAnalysis}
            </p>
          </div>

          {/* Engagement Breakdown */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">Engagement Quality</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {aiReport.engagementBreakdown}
            </p>
          </div>

          {/* Areas for Improvement */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">Key Growth Opportunities</h2>
            <ul className="mt-3 space-y-2">
              {aiReport.areasForImprovement.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-stone-400">
                  <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-orange-600 dark:bg-orange-400" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section: Recommended Post Ideas */}
        <section className="space-y-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900 md:p-8">
          
          {/* Header with mandatory link to /createpost */}
          <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 dark:border-stone-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
                10 Tailored Post Ideas
              </h2>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                Curated organic gardening topics based on your content gaps and reader interest.
              </p>
            </div>
            <Link
              href="/createpost"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs font-bold text-stone-900 transition-all duration-300 ease-out hover:border-lime-500 hover:bg-stone-100 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50 dark:hover:border-lime-400 dark:hover:bg-stone-800 dark:focus:ring-offset-stone-900 sm:self-auto"
            >
              <span>Go to /createpost</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Cards Grid for Post Ideas */}
          <div className="grid gap-4 md:grid-cols-2">
            {aiReport.recommendedPostIdeas.map((idea, index) => (
              <article
                key={index}
                className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-stone-50/50 p-6 transition-all duration-300 ease-out hover:scale-[1.01] hover:border-stone-300 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-950/50 dark:hover:border-stone-700 dark:hover:bg-stone-950"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
                      {idea.title}
                    </h3>
                    <CopyTitleButton textToCopy={idea.title} />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                    {idea.rationale}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                  {idea.suggestedTags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="rounded-lg bg-emerald-100/60 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                    >
                      #{tag.toLowerCase()}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}