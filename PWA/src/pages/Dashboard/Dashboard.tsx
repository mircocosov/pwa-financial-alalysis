import LineChart from '@/components/LineChart'
import {
  summaryMetrics,
  monthlyRevenue,
  forecastHighlights,
  cashflowBreakdown,
  transactions,
} from '@/config/dashboardData'

type DashboardProps = {
  onAddTransaction?: () => void
}

export default function Dashboard({ onAddTransaction }: DashboardProps) {
  return (
    <div className="space-y-12">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 shadow-[0_45px_160px_rgba(4,6,13,0.5)]">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_75%)] opacity-70" />
          <span className="pointer-events-none absolute -right-16 top-24 h-44 w-44 rounded-full bg-gradient-to-br from-yellow-400/30 to-transparent blur-[140px]" />
          <div className="relative flex flex-col gap-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-white/50">
                  Snapshot
                  <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.65)]" />
                </div>
                <h2 className="text-3xl font-semibold text-white">
                  Product financial performance
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/60">
                  Track topline revenue, projections, and operational risks in one live workspace.
                  Share context-rich updates with finance, product, and operations teams instantly.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-right text-xs text-white/60 shadow-[0_18px_45px_rgba(4,6,13,0.4)]">
                Updated{' '}
                <span className="font-semibold tracking-wide text-white">15 December 2024</span>
                <p className="mt-1 text-[11px] text-white/40">Next refresh in 3h 12m</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summaryMetrics.map((metric) => (
                <article
                  key={metric.id}
                  className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-yellow-200/40 hover:bg-yellow-200/10"
                  aria-label={`${metric.label}: ${metric.value}`}
                >
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)]" />
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/45">
                      {metric.label}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        metric.trend === 'up'
                          ? 'text-emerald-300'
                          : metric.trend === 'down'
                            ? 'text-rose-300'
                            : 'text-white/50'
                      }`}
                    >
                      {metric.delta}
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-semibold text-white drop-shadow-[0_18px_35px_rgba(255,255,255,0.12)]">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-white/55">{metric.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-yellow-300/20 via-yellow-400/10 to-transparent p-6 shadow-[0_40px_120px_rgba(250,204,21,0.18)]">
          <span className="pointer-events-none absolute -left-10 top-10 h-28 w-28 rounded-full bg-gradient-to-br from-yellow-200/60 to-transparent blur-[120px]" />
          <h3 className="text-lg font-semibold text-white">Actions & highlights</h3>
          <ul className="mt-4 space-y-4 text-sm text-white/80">
            <li className="flex items-start gap-3 rounded-2xl border border-yellow-200/30 bg-yellow-200/15 px-4 py-3 shadow-[0_14px_40px_rgba(253,224,71,0.28)]">
              <span className="mt-1 text-xl">🧾</span>
              <div>
                <p className="font-semibold text-white">Reconcile bank feed anomalies</p>
                <p className="text-white/65">
                  8 transactions need categorisation before the weekly report lock.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <span className="mt-1 text-xl">📦</span>
              <div>
                <p className="font-semibold text-white">Inventory turnover</p>
                <p className="text-white/65">
                  Logistics spend tracked below plan for the second week in a row.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <span className="mt-1 text-xl">⚙️</span>
              <div>
                <p className="font-semibold text-white">Automation rollout</p>
                <p className="text-white/65">
                  Map customer success escalations to financial impact in Zendesk.
                </p>
              </div>
            </li>
          </ul>

          <button
            type="button"
            onClick={onAddTransaction}
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 text-black font-semibold shadow-[0_22px_60px_rgba(253,224,71,0.45)] transition hover:opacity-90"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M12 5v14M5 12h14" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Add transaction
          </button>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-6 sm:p-8 shadow-[0_38px_120px_rgba(4,6,13,0.5)]">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_70%)] opacity-80" />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white drop-shadow-[0_12px_34px_rgba(56,189,248,0.35)]">
                Monthly revenue dynamics
              </h3>
              <p className="text-sm text-white/60">
                Gauge momentum against the operating target and quantify the monthly deltas.
              </p>
            </div>
            <div className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-1 text-xs text-emerald-200 shadow-[0_12px_35px_rgba(16,185,129,0.35)]">
              Target progress{' '}
              <span className="font-semibold text-emerald-100">
                {Math.round((monthlyRevenue.values.at(-1)! / (monthlyRevenue.target ?? 1)) * 100)}%
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#111527]/85 via-[#090b16]/85 to-[#05070e]/95 p-4 sm:p-6 shadow-[0_26px_90px_rgba(4,6,13,0.4)]">
            <LineChart
              labels={monthlyRevenue.labels}
              values={monthlyRevenue.values}
              target={monthlyRevenue.target}
            />
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_20px_55px_rgba(4,6,13,0.35)]">
              <dt className="text-xs uppercase tracking-[0.25em] text-white/45">Current month</dt>
              <dd className="mt-2 text-lg font-semibold text-white">
                {formatCurrency(monthlyRevenue.values.at(-1) ?? 0)}
              </dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_20px_55px_rgba(4,6,13,0.35)]">
              <dt className="text-xs uppercase tracking-[0.25em] text-white/45">Previous month</dt>
              <dd className="mt-2 text-lg font-semibold text-white">
                {formatCurrency(monthlyRevenue.values.at(-2) ?? 0)}
              </dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_20px_55px_rgba(4,6,13,0.35)]">
              <dt className="text-xs uppercase tracking-[0.25em] text-white/45">Growth rate</dt>
              <dd className="mt-2 text-lg font-semibold text-emerald-300">
                +{computeGrowth(monthlyRevenue.values.at(-2) ?? 0, monthlyRevenue.values.at(-1) ?? 0)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-4">
          {forecastHighlights.map((item) => (
            <article
              key={item.id}
              className={`rounded-3xl border px-5 py-5 transition ${
                item.tone === 'positive'
                  ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-50'
                  : item.tone === 'warning'
                    ? 'border-amber-300/40 bg-amber-300/10 text-amber-50'
                    : 'border-white/10 bg-white/5 text-white/80'
              }`}
            >
              <p className="text-xs uppercase tracking-[0.35em]">{item.title}</p>
              <p className="mt-3 text-2xl font-semibold">{item.projection}</p>
              <p className="mt-2 text-sm opacity-80">{item.change}</p>
              <p className="mt-4 text-sm opacity-85">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 sm:p-7 shadow-[0_45px_120px_rgba(4,6,13,0.45)]">
          <h3 className="text-lg font-semibold text-white">Cashflow structure</h3>
          <p className="mt-2 text-sm text-white/60">
            Compare incoming and outgoing streams and highlight operational intensity.
          </p>

          <div className="mt-6 space-y-4">
            {cashflowBreakdown.map((item) => (
              <div key={item.id}>
                <div className="flex items-center justify-between text-sm text-white/70">
                  <p className="font-medium text-white">{item.title}</p>
                  <span className="text-white/55">{item.value}</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-rose-300"
                    style={{ width: `${item.share}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-white/40">{item.share}% of total</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 sm:p-7 shadow-[0_45px_120px_rgba(4,6,13,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent transactions</h3>
              <p className="text-sm text-white/60">
                Monitor inflows, vendor payouts, and payroll in one stream.
              </p>
            </div>
            <button
              type="button"
              onClick={onAddTransaction}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-white/20 px-4 text-sm text-white/80 transition hover:border-yellow-200/40 hover:text-white"
            >
              New entry
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white/80 backdrop-blur"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{transaction.description}</p>
                    <p className="text-xs text-white/50">{transaction.category}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.direction === 'income' ? 'text-emerald-300' : 'text-rose-300'
                      }`}
                    >
                      {transaction.direction === 'income' ? '+' : '-'}
                      {Math.abs(transaction.amount).toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <p className="text-xs text-white/45">
                      {new Date(transaction.date).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function computeGrowth(previous: number, current: number) {
  if (!previous) return '0.0%'
  const change = ((current - previous) / previous) * 100
  return `${change.toFixed(1)}%`
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}
