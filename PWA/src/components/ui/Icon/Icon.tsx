import { lazy, Suspense } from 'react'
import type { ReactNode } from 'react'
import styles from './Icon.module.scss'

const Chart = lazy(() =>
  import('@/assets/icons/chart.svg?react').then((module) => ({
    default: module.default,
  }))
)
const Wallet = lazy(() =>
  import('@/assets/icons/wallet.svg?react').then((module) => ({
    default: module.default,
  }))
)

const ICONS = {
  wallet: Wallet,
  chart: Chart,
} as const

type IconName = keyof typeof ICONS

interface Props {
  icon: IconName
  fallback?: ReactNode
}

export default function Icon({ icon, fallback = null }: Props) {
  const IconComponent = ICONS[icon]

  if (!IconComponent) {
    console.warn(`Icon "${icon}" does not exist in ICONS object.`)
    return null
  }

  return (
    <div className={styles.container}>
      <Suspense
        fallback={fallback || <div style={{ width: 24, height: 24 }} />}
      >
        <IconComponent />
      </Suspense>
    </div>
  )
}
