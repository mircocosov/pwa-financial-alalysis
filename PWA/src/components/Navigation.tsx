import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  PieChart,
  CreditCard,
  FileText,
  Settings,
  Plus,
  Menu,
  X,
} from 'lucide-react'
import { Button } from './ui/button'
import { cn } from './ui/utils'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
  onAddTransaction: () => void
  isPageTransitioning?: boolean
}

const navItems = [
  { id: 'dashboard', label: 'Дашборд', icon: BarChart3 },
  { id: 'transactions', label: 'Транзакции', icon: CreditCard },
  { id: 'portfolio', label: 'Портфель', icon: PieChart },
  { id: 'reports', label: 'Отчеты', icon: FileText },
  { id: 'settings', label: 'Настройки', icon: Settings },
]

export function Navigation({
  currentPage,
  onPageChange,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onAddTransaction,
  isPageTransitioning = false,
}: NavigationProps) {
  return (
    <>
      <motion.div
        className="lg:hidden fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50 h-16 flex items-center justify-between px-4"
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-lg font-medium text-primary"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          FinAnalyst
        </motion.h1>

        <div className="flex items-center gap-2">
          <motion.div initial="idle" whileHover="hover" whileTap="tap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddTransaction()}
              className="p-2 relative overflow-hidden"
              disabled={isPageTransitioning}
            >
              <motion.div initial="idle" whileHover="hover">
                <Plus size={20} className="text-primary relative z-10" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div initial="idle" whileHover="hover" whileTap="tap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar for Desktop */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobileMenuOpen ? 0 : '-100%',
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-background/95 backdrop-blur-md border-r border-border z-50 lg:relative lg:translate-x-0 lg:opacity-100 lg:bg-background',
          'lg:z-auto'
        )}
      >
        <div className="p-6 h-full flex flex-col">
          <motion.h1
            className="text-xl font-medium mb-8 text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            FinAnalyst
          </motion.h1>

          <nav className="space-y-2 flex-1">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.1 + 0.3 },
                  }}
                  className="relative"
                >
                  <motion.div
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    animate={isActive ? 'active' : 'idle'}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start gap-3 h-11 relative overflow-hidden',
                        isActive && 'text-primary-foreground'
                      )}
                      onClick={() => {
                        onPageChange(item.id)
                        setIsMobileMenuOpen(false)
                      }}
                      disabled={isPageTransitioning}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="desktop-nav-active"
                          className="absolute inset-0 bg-primary rounded-md"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <motion.div
                        initial="idle"
                        animate={isActive ? 'active' : 'idle'}
                        whileHover="hover"
                        className="relative z-10"
                      >
                        <Icon size={18} />
                      </motion.div>
                      <span className="relative z-10">{item.label}</span>
                    </Button>
                  </motion.div>
                </motion.div>
              )
            })}
          </nav>
        </div>
      </motion.aside>
    </>
  )
}
