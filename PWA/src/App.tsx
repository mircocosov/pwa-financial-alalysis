import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from './components/Navigation'
import { Dashboard } from './components/Dashboard'
import { Portfolio } from './components/Portfolio'
import { Transactions } from './components/Transactions'
import { Reports } from './components/Reports'
import { Settings } from './components/Settings'
import { AddTransactionModal } from './components/AddTransactionModal'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false)
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)

  const handleAddTransaction = (transaction: any) => {
    // Here you would typically add to your state management or API
    console.log('Adding transaction:', transaction)
  }

  const handlePageChange = (page: string) => {
    if (page === currentPage) return

    setIsPageTransitioning(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsPageTransitioning(false)
    }, 150)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            onAddTransaction={() => setIsAddTransactionModalOpen(true)}
          />
        )
      case 'portfolio':
        return <Portfolio />
      case 'transactions':
        return <Transactions />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return (
          <Dashboard
            onAddTransaction={() => setIsAddTransactionModalOpen(true)}
          />
        )
    }
  }

  return (
    <motion.div
      className="min-h-screen flex dark relative overflow-x-hidden"
      initial="initial"
      animate="animate"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-background" />
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, #FFD700 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, #FFD700 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, #FFD700 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <Navigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onAddTransaction={() => setIsAddTransactionModalOpen(true)}
        isPageTransitioning={isPageTransitioning}
      />

      <main className="flex-1 w-full lg:ml-0 mt-16 lg:mt-0 mb-16 lg:mb-0 relative z-10 overflow-x-hidden">
        {/* Desktop Quick Navigation - Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden xl:flex fixed top-6 right-6 z-30 gap-2 flex-wrap max-w-[600px]"
        >
          {[
            { id: 'dashboard', label: 'Дашборд', icon: '📊' },
            { id: 'transactions', label: 'Транзакции', icon: '💳' },
            { id: 'portfolio', label: 'Портфель', icon: '📈' },
            { id: 'reports', label: 'Отчеты', icon: '📄' },
            { id: 'settings', label: 'Настройки', icon: '⚙️' },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handlePageChange(item.id)}
              disabled={isPageTransitioning}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                currentPage === item.id
                  ? 'bg-primary text-black border-primary shadow-lg'
                  : 'bg-card/80 backdrop-blur-md text-foreground border-border hover:bg-primary/10 hover:border-primary/50'
              }`}
              title={item.label}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-sm whitespace-nowrap hidden 2xl:inline">
                {item.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Page transition overlay */}
        <AnimatePresence>
          {isPageTransitioning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                style={{
                  animation: 'spin 1s linear infinite',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AddTransactionModal
        isOpen={isAddTransactionModalOpen}
        onClose={() => setIsAddTransactionModalOpen(false)}
        onAdd={handleAddTransaction}
      />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  )
}
