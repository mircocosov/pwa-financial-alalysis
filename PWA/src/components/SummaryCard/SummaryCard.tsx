import type { SummaryMetric } from '@/config/dashboardData'
import styles from './SummaryCard.module.scss'

type SummaryCardProps = Omit<SummaryMetric, 'id'>

const trendLabel: Record<SummaryMetric['trend'], string> = {
  up: 'Positive momentum',
  down: 'Needs attention',
  neutral: 'Stable trend',
}
export default function SummaryCard({
  label,
  value,
  delta,
  trend,
  description,
}: SummaryCardProps) {
  return (
    <article className={styles.card} aria-label={`${label}: ${value}`}>
      <header className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.trend} data-trend={trend}>
          <span aria-hidden="true" />
          {trendLabel[trend]}
        </span>
      </header>

      <p className={styles.value}>{value}</p>
      <p className={styles.delta} data-trend={trend}>
        {delta}
      </p>
      <p className={styles.description}>{description}</p>
    </article>
  )
}

