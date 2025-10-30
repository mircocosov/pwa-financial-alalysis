import type { Dispatch, SetStateAction } from 'react'

export type IconName = 'chart' | 'card' | 'pie' | 'file' | 'settings'

export type NavItem = {
  id: 'dashboard' | 'portfolio' | 'transactions' | 'reports' | 'settings'
  label: string
  description?: string
  icon: IconName
}

type NavigationProps = {
  items: NavItem[]
  currentPage: NavItem['id']
  onNavigate: (page: NavItem['id']) => void
  onAddTransaction: () => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>
}

const iconMap: Record<IconName, (props: IconProps) => JSX.Element> = {
  chart: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M4 4v16h16M8.5 14l2.8-3.6 2.9 2.2 4.3-5.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="14" r="1" fill="currentColor" />
      <circle cx="11.3" cy="10.4" r="1" fill="currentColor" />
      <circle cx="14.2" cy="12.6" r="1" fill="currentColor" />
      <circle cx="18.5" cy="7.4" r="1" fill="currentColor" />
    </svg>
  ),
  card: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        ry="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M8 16h1.6M12 16h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  pie: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 3a9 9 0 019 9h-9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12v9a9 9 0 01-9-9 9 9 0 019-9v9h9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  file: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M6 3h7l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13 3v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  settings: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0 1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export default function Navigation({
  items,
  currentPage,
  onNavigate,
  onAddTransaction,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: NavigationProps) {
  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl supports-[backdrop-filter]:bg-black/45">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="space-y-0.5">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Finsight</p>
            <p className="text-base font-semibold text-white">Financial Workspace</p>
            <p className="text-[11px] text-white/45">Live metrics & reporting</p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-yellow-300/40 hover:text-yellow-200"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-x-0 top-16 z-30 p-4 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-6 opacity-0'
        }`}
      >
        <nav className="rounded-3xl border border-white/10 bg-[#101320]/90 px-4 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <ul className="space-y-3">
            {items.map((item) => {
              const Icon = iconMap[item.icon]
              const isActive = item.id === currentPage
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`group relative w-full overflow-hidden rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? 'border-yellow-400/70 bg-gradient-to-r from-yellow-400/15 via-yellow-500/10 to-transparent text-yellow-100 shadow-[0_20px_45px_rgba(253,224,71,0.25)]'
                        : 'border-white/5 bg-white/[0.03] text-white/70 hover:border-yellow-200/40 hover:bg-yellow-200/10 hover:text-white'
                    }`}
                  >
                    <span className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex items-center gap-3">
                      <span
                        className={`relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-white transition ${
                          isActive
                            ? 'border-yellow-200/60 bg-yellow-300/20 text-yellow-50'
                            : 'group-hover:border-yellow-200/60 group-hover:bg-yellow-200/15 group-hover:text-yellow-50'
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <p className="font-medium">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-white/50">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={onAddTransaction}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 text-black font-semibold shadow-[0_20px_60px_rgba(253,224,71,0.4)] transition hover:opacity-90"
            >
              <IconPlus className="h-4 w-4" />
              Add transaction
            </button>
          </div>
        </nav>
      </div>

      <aside className="hidden flex-shrink-0 pt-12 pb-10 lg:flex lg:w-72 xl:w-80">
        <div className="sticky top-12 w-full overflow-hidden rounded-[34px] border border-white/10 bg-[#0E111D]/80 px-6 py-8 shadow-[0_60px_140px_rgba(6,9,20,0.5)] backdrop-blur-2xl">
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1),_transparent_65%)] opacity-70" />
          <span className="pointer-events-none absolute -left-24 top-20 h-48 w-48 rounded-full bg-gradient-to-br from-yellow-300/35 via-yellow-400/20 to-transparent blur-[120px]" />
          <div className="mb-10 space-y-2">
            <p className="text-[11px] uppercase tracking-[0.45em] text-white/40">Finsight</p>
            <h1 className="text-[26px] font-semibold text-white drop-shadow-[0_12px_30px_rgba(255,215,0,0.15)]">
              Financial analytics hub
            </h1>
            <p className="text-sm text-white/60">
              Consolidate live revenue signals, forecasts, and operational insights in one control
              centre.
            </p>
          </div>

          <nav>
            <ul className="space-y-2.5">
              {items.map((item) => {
                const Icon = iconMap[item.icon]
                const isActive = item.id === currentPage
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      className={`group relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left transition duration-300 ${
                        isActive
                          ? 'border-yellow-200/70 bg-gradient-to-r from-yellow-300/20 via-yellow-500/10 to-transparent text-white shadow-[0_24px_80px_rgba(253,224,71,0.35)]'
                          : 'border-white/5 bg-white/[0.025] text-white/65 hover:border-yellow-200/40 hover:bg-white/[0.08] hover:text-white'
                      }`}
                    >
                      <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
                      </span>
                      <div className="flex items-center gap-3">
                        <span
                          className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition ${
                            isActive
                              ? 'bg-yellow-400 text-black'
                              : 'bg-white/5 text-white/70 group-hover:bg-yellow-200/20 group-hover:text-yellow-50'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                      <div className="flex-1">
                        <p className="font-semibold tracking-tight">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-white/45">{item.description}</p>
                        )}
                      </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-8 space-y-4 rounded-2xl border border-yellow-200/30 bg-gradient-to-br from-yellow-300/15 via-yellow-400/10 to-transparent px-4 py-5 text-sm text-yellow-50">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-yellow-100/70">Upcoming</p>
              <p className="mt-1 text-[15px] font-medium">
                Bank sync and automated reconciliation arriving Q1 2025.
              </p>
            </div>
            <p className="text-yellow-50/80">
              Connect accounts to automate matching and streamline close workflows.
            </p>
            <button
              type="button"
              onClick={onAddTransaction}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 text-black font-semibold shadow-[0_22px_60px_rgba(253,224,71,0.4)] transition hover:opacity-90"
            >
              <IconPlus className="h-4 w-4" />
              Add transaction
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

type IconProps = {
  className?: string
}

function IconMenu({ className }: IconProps) {
  return (
    <svg className={className ?? 'h-5 w-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconClose({ className }: IconProps) {
  return (
    <svg className={className ?? 'h-5 w-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M6 6l12 12M6 18L18 6" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconPlus({ className }: IconProps = {}) {
  return (
    <svg className={className ?? 'h-4 w-4'} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 5v14M5 12h14" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
