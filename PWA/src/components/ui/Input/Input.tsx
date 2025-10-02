import type { ReactNode } from 'react'
import styles from './Input.module.scss'

export interface InputProps {
  className: string
  type: 'number' | 'text' | 'date'
  placeholder?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: ReactNode
}

export default function Input({
  className,
  type,
  placeholder,
  value,
  onChange,
  label,
}: InputProps) {
  return (
    <div className={styles.container}>
      <p>{label}</p>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
