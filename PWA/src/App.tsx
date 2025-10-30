import { useMemo, useState } from 'react'

import Navigation, { type NavItem } from '@/components/Navigation'
import { QuickLinks } from '@/components/QuickLinks'
import { AddTransactionModal } from '@/components/AddTransactionModal'

import Dashboard from '@/pages/Dashboard'
import Portfolio from '@/pages/Portfolio'
import Transactions from '@/pages/Transactions'
import Reports from '@/pages/Reports'
import Settings from '@/pages/Settings'

type PageId = 'dashboard' | 'portfolio' | 'transactions' | 'reports' | 'settings'

const quickLinks: Array<{ id: PageId; label: string; icon: string }> = [
  { id: 'dashboard', label: 'Overview', icon: '📊' },
  { id: 'transactions', label: 'Transactions', icon: '💳' },
  { id: 'portfolio', label: 'Portfolio', icon: '📁' },
  { id: 'reports', label: 'Reports', icon: '🗂️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', description: 'Product overview', icon: 'chart' },
  { id: 'transactions', label: 'Transactions', description: 'Latest ledger activity', icon: 'card' },
  { id: 'portfolio', label: 'Portfolio', description: 'Allocation & positions', icon: 'pie' },
  { id: 'reports', label: 'Reports', description: 'Quarterly updates', icon: 'file' },
  { id: 'settings', label: 'Settings', description: 'Workspace configuration', icon: 'settings' },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const pageContent = useMemo(() => {
    switch (currentPage) {
      case 'portfolio':
        return <Portfolio />
      case 'transactions':
        return <Transactions />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard onAddTransaction={() => setIsAddModalOpen(true)} />
    }
  }, [currentPage])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#04060D] bg-[radial-gradient(circle_at_top,_rgba(40,74,122,0.65),_rgba(4,6,13,0.85)_58%)] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-[-25%] h-[420px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),_rgba(4,6,13,0)_70%)] blur-3xl" />
        <div className="absolute -top-36 -right-28 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#FBCB4A]/30 via-[#F79F1F]/15 to-transparent blur-[140px]" />
        <div className="absolute top-[32%] -left-28 h-[360px] w-[360px] rounded-full bg-gradient-to-br from-[#38BDF8]/20 via-[#2563EB]/20 to-transparent blur-[140px]" />
        <div className="absolute bottom-[-18%] right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-tl from-[#F472B6]/18 via-[#FB7185]/10 to-transparent blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.18] mix-blend-screen">
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.04)_26%,transparent_27%),linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.04)_25%,rgba(255,255,255,0.04)_26%,transparent_27%)] bg-[length:90px_90px]" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:px-10 xl:px-16">
        <Navigation
          items={navigationItems}
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page)
            setIsMobileMenuOpen(false)
          }}
          onAddTransaction={() => setIsAddModalOpen(true)}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <main className="flex-1 min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-10">
          <QuickLinks
            links={quickLinks}
            currentPage={currentPage}
            onNavigate={(page) => setCurrentPage(page)}
          />

          <div className="mt-8 space-y-10">{pageContent}</div>
        </main>
      </div>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(payload) => {
          console.info('Add transaction', payload)
          setIsAddModalOpen(false)
        }}
      />
    </div>
  )
}
