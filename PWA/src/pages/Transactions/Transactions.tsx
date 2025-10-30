const ledger = [
  {
    id: 'inv-2045',
    description: 'Enterprise onboarding services',
    category: 'Revenue',
    amount: 72000,
    direction: 'income',
    date: '15 Dec 2024',
    status: 'Settled',
  },
  {
    id: 'exp-8821',
    description: 'Cloud infrastructure (November)',
    category: 'Operations',
    amount: -48200,
    direction: 'expense',
    date: '14 Dec 2024',
    status: 'Paid',
  },
  {
    id: 'exp-8812',
    description: 'Performance marketing bonus',
    category: 'Payroll',
    amount: -18500,
    direction: 'expense',
    date: '13 Dec 2024',
    status: 'Pending approval',
  },
  {
    id: 'inv-2044',
    description: 'Quarterly subscription renewal',
    category: 'Revenue',
    amount: 125000,
    direction: 'income',
    date: '10 Dec 2024',
    status: 'Settled',
  },
  {
    id: 'exp-8792',
    description: 'Data enrichment vendor fee',
    category: 'Vendors',
    amount: -22600,
    direction: 'expense',
    date: '09 Dec 2024',
    status: 'Scheduled',
  },
]

const statusTone: Record<string, string> = {
  Settled: 'text-emerald-300 bg-emerald-300/10 border-emerald-300/30',
  Paid: 'text-sky-300 bg-sky-300/10 border-sky-300/30',
  'Pending approval': 'text-amber-200 bg-amber-200/10 border-amber-200/40',
  Scheduled: 'text-white/70 bg-white/10 border-white/15',
}

const currency = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

export default function Transactions() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 shadow-[0_45px_160px_rgba(4,6,13,0.5)]">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_70%)]" />
        <header className="relative flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-white/50">
              Transactions
              <span className="ml-1 h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
            </div>
            <h2 className="text-3xl font-semibold text-white">Ledger detail</h2>
            <p className="max-w-2xl text-sm text-white/60">
              Filter revenue, vendor payouts, or payroll to investigate live balances and reconcile
              exports before close.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm text-white/75 transition hover:border-yellow-200/40 hover:text-white"
          >
            <span className="text-lg leading-none">⇩</span>
            Export CSV
          </button>
        </header>

        <div className="relative mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_110px_rgba(4,6,13,0.45)]">
          <table className="min-w-full text-sm text-white/75">
            <thead className="bg-white/[0.08] text-xs uppercase tracking-[0.28em] text-white/40">
              <tr>
                <th className="px-6 py-4 text-left font-medium">ID</th>
                <th className="px-6 py-4 text-left font-medium">Description</th>
                <th className="px-6 py-4 text-left font-medium">Category</th>
                <th className="px-6 py-4 text-left font-medium">Amount</th>
                <th className="px-6 py-4 text-left font-medium">Date</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((entry, index) => {
                const amountDisplay = currency.format(entry.amount)
                const directionClass =
                  entry.direction === 'income' ? 'text-emerald-300' : 'text-rose-300'

                return (
                  <tr
                    key={entry.id}
                    className={`transition ${
                      index % 2 === 0 ? 'bg-white/[0.04]' : 'bg-white/[0.06]'
                    } hover:bg-white/[0.08]`}
                  >
                    <td className="px-6 py-4 font-medium text-white">{entry.id}</td>
                    <td className="px-6 py-4">{entry.description}</td>
                    <td className="px-6 py-4 text-white/65">{entry.category}</td>
                    <td className={`px-6 py-4 font-semibold ${directionClass}`}>
                      {entry.direction === 'income' ? '+' : '-'}
                      {amountDisplay.replace(/[-+]/g, '')}
                    </td>
                    <td className="px-6 py-4 text-white/65">{entry.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur ${statusTone[entry.status]}`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
