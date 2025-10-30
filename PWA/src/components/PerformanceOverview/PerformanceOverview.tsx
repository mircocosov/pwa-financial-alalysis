import { useMemo } from 'react'
import LineChart from '@/components/LineChart'
import type { LineChartProps } from '@/components/LineChart/LineChart'
import styles from './PerformanceOverview.module.scss'

type PerformanceOverviewProps = {
  data: Pick<LineChartProps, 'labels' | 'values'> & { target?: number }
}

const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

export default function PerformanceOverview({ data }: PerformanceOverviewProps) {
  const { labels, values, target } = data

  const { current, previous, change } = useMemo(() => {
    const currentValue = values.at(-1) ?? 0
    const previousValue = values.at(-2) ?? 0
    const diff = previousValue === 0 ? 0 : (currentValue - previousValue) / previousValue
    return {
      current: currentValue,
      previous: previousValue,
      change: diff,
    }
  }, [values])

  const completion = useMemo(() => {
    if (!target || target === 0) return null
    return Math.min(Math.round((values.at(-1)! / target) * 100), 999)
  }, [target, values])

  return (
    <section className={styles.section} aria-label='Revenue dynamics'>
      <header className={styles.header}>
        <div>
          <h2>Monthly revenue dynamics</h2>
          <p>
            Understand year-long performance and track progress against the operating target.
          </p>
        </div>
        {completion !== null && (
          <div className={styles.tag}>
            Target progress <strong>{completion}%</strong>
          </div>
        )}
      </header>

      <div className={styles.chartCard}>
        <div className={styles.chart}>
          <LineChart labels={labels} values={values} target={target} />
        </div>

        <dl className={styles.metrics}>
          <div>
            <dt>Current month</dt>
            <dd>{numberFormatter.format(current)}</dd>
          </div>
          <div>
            <dt>Previous month</dt>
            <dd>{numberFormatter.format(previous)}</dd>
          </div>
          <div>
            <dt>Growth rate</dt>
            <dd data-positive={change >= 0}>
              {change >= 0 ? '+' : '-'}
              {(Math.abs(change) * 100).toFixed(1)}%
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}


