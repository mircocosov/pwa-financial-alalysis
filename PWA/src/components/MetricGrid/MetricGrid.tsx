import type { SummaryMetric } from '@/config/dashboardData'
import SummaryCard from '@/components/SummaryCard'
import styles from './MetricGrid.module.scss'

type MetricGridProps = {
  metrics: SummaryMetric[]
}

export default function MetricGrid({ metrics }: MetricGridProps) {
  return (
    <section className={styles.section} aria-label='Key financial metrics'>
      <header className={styles.header}>
        <h2>Key financial metrics</h2>
        <p>
          Monitor revenue, spending, and cash position with contextual insights for the product team.
        </p>
      </header>

      <div className={styles.grid}>
        {metrics.map(({ id, ...metric }) => (
          <SummaryCard key={id} {...metric} />
        ))}
      </div>
    </section>
  )
}

