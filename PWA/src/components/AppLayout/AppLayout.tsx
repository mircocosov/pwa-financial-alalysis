import type { ReactNode } from 'react'
import Navigation, { type NavigationItem } from '@/components/Navigation'
import styles from './AppLayout.module.scss'

type AppLayoutProps = {
  navigation: NavigationItem[]
  activePage: string
  onSelectPage: (id: string) => void
  onAddTransaction?: () => void
  children: ReactNode
}

export default function AppLayout({
  navigation,
  activePage,
  onSelectPage,
  onAddTransaction,
  children,
}: AppLayoutProps) {
  return (
    <div className={styles.app}>
      <div className={styles.backgroundGlow} aria-hidden />
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <Navigation
            items={navigation}
            activeId={activePage}
            onSelect={onSelectPage}
            onAddTransaction={onAddTransaction}
          />
        </aside>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}
