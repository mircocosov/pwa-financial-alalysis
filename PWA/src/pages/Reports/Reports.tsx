const reports = [
  {
    id: 'rep-q4',
    title: 'Q4 2024 Financial Review',
    summary:
      'Topline grew 18% quarter-on-quarter while gross margin expanded by 2.3 p.p. Focus on accelerating enterprise upsell motion.',
    owner: 'Finance',
    published: '12 Dec 2024',
  },
  {
    id: 'rep-ops',
    title: 'Operations cost dashboard',
    summary:
      'Logistics and fulfilment costs stabilised after automation rollout. Next step: integrate supplier scorecards.',
    owner: 'Operations',
    published: '28 Nov 2024',
  },
  {
    id: 'rep-product',
    title: 'Product ROI snapshot',
    summary:
      'Feature adoption remains strong across key cohorts. Monitoring churn in SMB segment with new lifecycle program.',
    owner: 'Product',
    published: '14 Nov 2024',
  },
]

const checklist = [
  { id: 'close-books', label: 'Close monthly books', status: 'Completed' },
  { id: 'audit-journal', label: 'Audit journal entries', status: 'In progress' },
  { id: 'variance', label: 'Variance review with FP&A', status: 'Scheduled' },
]

const statusTone: Record<string, string> = {
  Completed: 'text-emerald-300 bg-emerald-300/10 border-emerald-300/35',
  'In progress': 'text-sky-300 bg-sky-300/10 border-sky-300/35',
  Scheduled: 'text-white/75 bg-white/10 border-white/15',
}

export default function Reports() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 shadow-[0_45px_160px_rgba(4,6,13,0.5)]">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_70%)]" />
        <div className="relative space-y-6">
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-white/50">
              Reports
              <span className="ml-1 h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]" />
            </div>
            <h2 className="text-3xl font-semibold text-white">Quarterly narratives</h2>
            <p className="text-sm text-white/60">
              Surface the story behind the numbers. Combine quantitative dashboards with
              qualitative context and stakeholder recommendations.
            </p>
          </header>

          <div className="space-y-4">
            {reports.map((report) => (
              <article
                key={report.id}
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-rose-300/40 hover:bg-rose-200/10"
              >
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_70%)] opacity-70" />
                <div className="relative flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-white/40">
                  <span>{report.owner}</span>
                  <span>{report.published}</span>
                </div>
                <h3 className="relative mt-3 text-xl font-semibold text-white">
                  {report.title}
                </h3>
                <p className="relative mt-2 text-sm text-white/70">{report.summary}</p>
                <button
                  type="button"
                  className="relative mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 text-sm text-white/80 transition hover:border-rose-300/50 hover:text-white"
                >
                  Read report
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <aside className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-yellow-300/15 via-yellow-400/10 to-transparent p-6 shadow-[0_30px_100px_rgba(253,224,71,0.25)]">
        <span className="pointer-events-none absolute -left-16 top-12 h-36 w-36 rounded-full bg-gradient-to-br from-yellow-200/45 to-transparent blur-[120px]" />
        <h3 className="text-lg font-semibold text-white">Close checklist</h3>
        <p className="mt-2 text-sm text-white/70">
          Monitor monthly close tasks across finance, operations, and revenue teams.
        </p>

        <ul className="mt-5 space-y-3 text-sm text-white/80">
          {checklist.map((task) => (
            <li
              key={task.id}
              className={`rounded-2xl border px-4 py-4 backdrop-blur transition ${statusTone[task.status]}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-white">{task.label}</span>
                <span className="text-[11px] uppercase tracking-[0.25em]">{task.status}</span>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/20 text-sm text-white/80 transition hover:border-yellow-200/45 hover:text-white"
        >
          Schedule new review
        </button>
      </aside>
    </div>
  )
}
