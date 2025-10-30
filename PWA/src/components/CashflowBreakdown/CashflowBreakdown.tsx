import type { CashflowItem } from '@/config/dashboardData'
import styles from './CashflowBreakdown.module.scss'

type CashflowBreakdownProps = {
  items: CashflowItem[]
}

export default function CashflowBreakdown({ items }: CashflowBreakdownProps) {
  return (
    <section className={styles.section} aria-label='Cashflow structure'>
      <header className={styles.header}>
        <h2>Cashflow structure</h2>
        <p>Share of incoming and outgoing payments across the main spending blocks.</p>
      </header>

      <div className={styles.list}>
        {items.map((item) => (
          <article key={item.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <h3>{item.title}</h3>
              <span>{item.value}</span>
            </div>
            <div className={styles.bar} aria-hidden>
              <div style={{ width: `${item.share}%` }} />
            </div>
            <p className={styles.share}>{item.share}% of total volume</p>
          </article>
        ))}
      </div>
    </section>
  )
}

