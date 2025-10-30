import type { TransactionItem } from '@/config/dashboardData'
import styles from './TransactionsList.module.scss'

type TransactionsListProps = {
  items: TransactionItem[]
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
})

export default function TransactionsList({ items }: TransactionsListProps) {
  return (
    <section className={styles.section} aria-label="Recent transactions">
      <header className={styles.header}>
        <h2>Recent transactions</h2>
        <p>Latest inflows and outflows recorded in the finance workspace.</p>
      </header>

      <div className={styles.table} role="list">
        {items.map((item) => {
          const isIncome = item.direction === 'income'
          const amountLabel = currencyFormatter.format(Math.abs(item.amount))

          return (
            <article
              key={item.id}
              className={styles.row}
              data-direction={item.direction}
              role="listitem"
            >
              <div className={styles.meta}>
                <h3>{item.description}</h3>
                <p>
                  {item.category} / {item.counterparty}
                </p>
              </div>
              <div className={styles.amount} data-direction={item.direction}>
                <span>{isIncome ? '+' : '-'}</span>
                {amountLabel}
              </div>
              <time className={styles.date} dateTime={item.date}>
                {dateFormatter.format(new Date(item.date))}
              </time>
            </article>
          )
        })}
      </div>
    </section>
  )
}
