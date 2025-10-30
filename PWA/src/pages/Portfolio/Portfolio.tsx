const allocations = [
  { id: 'core', label: 'Core revenue streams', value: '₽1,420,000', share: 46, tone: 'emerald' },
  { id: 'growth', label: 'Growth bets', value: '₽780,000', share: 25, tone: 'sky' },
  { id: 'stabilisation', label: 'Stabilisation budget', value: '₽540,000', share: 18, tone: 'amber' },
  { id: 'experiments', label: 'Experiments', value: '₽340,000', share: 11, tone: 'rose' },
]

const scenarios = [
  { label: 'Base case', burn: '₽380K / month', note: 'Runway 11.4 months', tone: 'emerald' },
  { label: 'Accelerated growth', burn: '₽450K / month', note: 'Runway 9.1 months', tone: 'amber' },
  { label: 'Stress scenario', burn: '₽520K / month', note: 'Runway 7.6 months', tone: 'rose' },
]

const toneGradient: Record<string, string> = {
  emerald: 'from-emerald-300/55 via-emerald-400/30 to-transparent',
  sky: 'from-sky-300/55 via-sky-400/30 to-transparent',
  amber: 'from-amber-300/55 via-amber-400/30 to-transparent',
  rose: 'from-rose-300/55 via-rose-400/30 to-transparent',
}

export default function Portfolio() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 shadow-[0_45px_160px_rgba(4,6,13,0.5)]">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_72%)] opacity-80" />
        <header className="relative flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-white/50">
              Portfolio
              <span className="ml-1 h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.65)]" />
            </div>
            <h2 className="text-3xl font-semibold text-white">Capital allocation overview</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-white/60">
              Align strategic investment buckets with short-term liquidity needs. Balance innovation
              initiatives with predictable revenue streams to keep the roadmap funded.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-xs text-white/60 shadow-[0_18px_45px_rgba(4,6,13,0.4)]">
            Last rebalance{' '}
            <span className="font-semibold tracking-wide text-white">05 December 2024</span>
            <p className="mt-1 text-[11px] text-white/45">Next review scheduled in 9 days</p>
          </div>
        </header>

        <div className="relative mt-8 grid gap-5 lg:grid-cols-2">
          {allocations.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <span
                className={`pointer-events-none absolute inset-x-0 bottom-[-20%] h-1/2 bg-gradient-to-t ${toneGradient[item.tone]} blur-[100px] opacity-70 transition duration-300 group-hover:opacity-90`}
              />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">{item.label}</p>
                <p className="mt-4 text-2xl font-semibold text-white drop-shadow-[0_16px_35px_rgba(255,255,255,0.15)]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-white/60">{item.share}% allocation</p>
                <div className="mt-4 h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 transition-[width]"
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 sm:p-8 shadow-[0_38px_120px_rgba(4,6,13,0.45)]">
          <h3 className="text-lg font-semibold text-white">Scenario outlook</h3>
          <p className="mt-2 text-sm text-white/60">
            Expected burn under three scenarios with a 6‑month projection horizon.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {scenarios.map((scenario) => (
              <div
                key={scenario.label}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 transition hover:border-white/20"
              >
                <span
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneGradient[scenario.tone]} opacity-60 blur-[120px]`}
                />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                    {scenario.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">{scenario.burn}</p>
                  <p className="mt-1 text-xs text-white/55">{scenario.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[32px] border border-white/10 bg-gradient-to-br from-yellow-300/15 via-yellow-400/10 to-transparent p-6 shadow-[0_30px_100px_rgba(253,224,71,0.25)]">
          <h3 className="text-lg font-semibold text-white">Allocation guidance</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-4 py-3">
              Keep ≥45% of cash in core revenue streams to stabilise working capital.
            </li>
            <li className="rounded-2xl border border-sky-300/40 bg-sky-300/10 px-4 py-3">
              Allocate up to 25% to growth bets with monthly performance reviews.
            </li>
            <li className="rounded-2xl border border-rose-300/40 bg-rose-300/10 px-4 py-3">
              Maintain at least 2 months of payroll and vendor runway in quick-access reserves.
            </li>
          </ul>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-xs text-white/65 backdrop-blur">
            <p className="font-medium text-white">Tip</p>
            <p className="mt-1">
              Use scenario templates to stress-test liquidity against product roadmap milestones.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}
