import { useEffect, useState } from 'react'

type TransactionFormState = {
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
}

type AddTransactionModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (transaction: TransactionFormState) => void
}

const defaultState: TransactionFormState = {
  type: 'expense',
  amount: 0,
  category: 'general',
  description: '',
  date: new Date().toISOString().slice(0, 10),
}

export function AddTransactionModal({ isOpen, onClose, onSubmit }: AddTransactionModalProps) {
  const [form, setForm] = useState<TransactionFormState>(defaultState)

  useEffect(() => {
    if (isOpen) {
      setForm(defaultState)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0C1020]/95 p-6 shadow-[0_50px_140px_rgba(0,0,0,0.55)]">
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_65%)] opacity-70" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">New transaction</p>
            <h2 className="text-xl font-semibold text-white">Log manual entry</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/8 text-white/70 transition hover:border-yellow-200/50 hover:text-white"
          >
            <span className="sr-only">Close</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" fill="none">
              <path d="M6 6l12 12M6 18L18 6" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form
          className="relative mt-6 space-y-5"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit(form)
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="block text-sm text-white/60">Type</span>
              <div className="grid grid-cols-2 gap-2">
                {(['expense', 'income'] as const).map((type) => (
                  <button
                    type="button"
                    key={type}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium capitalize transition ${
                      form.type === type
                        ? 'border-yellow-300 bg-yellow-200/20 text-yellow-50'
                        : 'border-white/10 bg-white/0 text-white/60 hover:border-white/20 hover:text-white'
                    }`}
                    onClick={() => setForm((prev) => ({ ...prev, type }))}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </label>

            <label className="space-y-2">
              <span className="block text-sm text-white/60">Category</span>
              <select
                value={form.category}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, category: event.target.value }))
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-200/20"
                required
              >
                <option value="general">General</option>
                <option value="operations">Operations</option>
                <option value="marketing">Marketing</option>
                <option value="payroll">Payroll</option>
                <option value="revenue">Revenue</option>
              </select>
            </label>
          </div>

          <label className="block space-y-2">
            <span className="block text-sm text-white/60">Amount</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.amount === 0 ? '' : form.amount}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, amount: Number(event.target.value) }))
              }
              placeholder="Enter amount"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-200/20"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="block text-sm text-white/60">Description</span>
            <input
              type="text"
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, description: event.target.value }))
              }
              placeholder="Add a short note"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-200/20"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="block text-sm text-white/60">Date</span>
            <input
              type="date"
              value={form.date}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, date: event.target.value }))
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-yellow-200/40 focus:outline-none focus:ring-2 focus:ring-yellow-200/20"
              required
            />
          </label>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-xl border border-white/15 px-4 text-sm font-medium text-white/70 transition hover:border-white/25 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-11 rounded-xl bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 px-6 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(253,224,71,0.45)] transition hover:opacity-90"
              >
                Save transaction
              </button>
            </div>
          </form>
      </div>
    </div>
  )
}
