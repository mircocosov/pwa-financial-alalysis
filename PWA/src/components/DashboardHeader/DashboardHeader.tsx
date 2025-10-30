import styles from './DashboardHeader.module.scss'

type DashboardHeaderProps = {
  onAddTransaction?: () => void
}

export default function DashboardHeader({ onAddTransaction }: DashboardHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <span className={styles.kicker}>Snapshot</span>
        <h1 className={styles.title}>Product financial performance</h1>
        <p className={styles.subtitle}>
          Track topline metrics, projections, and team actions inside a single command centre.
        </p>
      </div>

      <div className={styles.meta}>
        <div className={styles.updated}>
          <IconCalendar size={18} />
          <span>
            Updated <strong>15 December 2024</strong>
          </span>
        </div>
        <button type="button" className={styles.action} onClick={onAddTransaction}>
          Add transaction
        </button>
      </div>
    </header>
  )
}

type IconProps = {
  size?: number
  className?: string
}

function IconCalendar({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h3v3H8z" />
    </svg>
  )
}
