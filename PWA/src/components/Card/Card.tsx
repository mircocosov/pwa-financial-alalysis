import style from './Card.module.scss'
import Icon from '@/components/ui/Icon'

export interface CardProps {
  header: string
  count: number
  subtitle: string
  percent: number
}

export default function Card({ header, count, subtitle, percent }: CardProps) {
  return (
    <div className={style.card}>
      <div className={style.header__container}>
        <p className={style.header}>{header}</p>
        <Icon icon="wallet" />
      </div>
      <div className={style.content}>
        <div className={style.content__leftside}>
          <h1>{count}</h1>
          <p>{subtitle}</p>
        </div>
        <div className={style.content__rightside}>
          <Icon icon="chart"></Icon>
          {percent}
        </div>
      </div>
    </div>
  )
}
