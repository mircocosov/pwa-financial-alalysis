import type { ForecastHighlight } from '@/config/dashboardData'
import styles from './ForecastHighlights.module.scss'

type ForecastHighlightsProps = {
  items: ForecastHighlight[]
}

export default function ForecastHighlights({ items }: ForecastHighlightsProps) {
  return (
    <section className={styles.section} aria-label='Forecast scenarios'>
      <header className={styles.header}>
        <h2>Forecast scenarios</h2>
        <p>
          Prepare for the quarter ahead: growth plans, burn expectations, and emerging risks.
        </p>
      </header>

      <div className={styles.list}>
        {items.map((item) => (
          <article key={item.id} className={styles.card} data-tone={item.tone}>
            <header>
              <h3>{item.title}</h3>
              <span className={styles.projection}>{item.projection}</span>
            </header>
            <p className={styles.change}>{item.change}</p>
            <p className={styles.description}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

