import { useState } from 'react'
import styles from './LineChart.module.scss'

interface LineChartProps {
  data: number[]
}

interface Point {
  x: number
  y: number
  value: number
  label: string
}

export default function LineChart({ data }: LineChartProps) {
  const labels = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]
  const [tooltip, setTooltip] = useState<Point | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const maxValue = Math.max(...data) * 1.1

  const width = 600
  const height = 300
  const padding = 40

  const points: Point[] = data.map((value, index) => {
    const x = padding + (index * (width - 2 * padding)) / (data.length - 1)
    const y = height - padding - (value / maxValue) * (height - 2 * padding)
    return { x, y, value, label: labels[index] }
  })

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  // Рассчитываем области для каждого месяца
  const monthAreas = points.map((p, i) => {
    const prevX = i > 0 ? points[i - 1].x : padding
    const nextX = i < points.length - 1 ? points[i + 1].x : width - padding
    const areaWidth = (nextX - prevX) / 2
    return {
      x: p.x - areaWidth,
      y: padding,
      width: areaWidth * 2,
      height: height - 2 * padding,
      value: p.value,
      label: p.label,
      index: i,
    }
  })

  const handleMonthHover = (index: number) => {
    setHoveredIndex(index)
    setTooltip({
      x: points[index].x,
      y: points[index].y,
      value: points[index].value,
      label: points[index].label,
    })
  }

  const handleMonthLeave = () => {
    setHoveredIndex(null)
    setTooltip(null)
  }

  return (
    <div className={styles.container} style={{ width, height }}>
      <svg className={styles.svg} width={width} height={height}>
        {/* серые линии сетки */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padding + t * (height - 2 * padding)
          return (
            <line
              key={`grid-${i}`}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              className={styles.gridLine}
            />
          )
        })}

        {/* желтые горизонтальные пунктирные линии */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = padding + t * (height - 2 * padding)
          return (
            <line
              key={`yellow-horizontal-${i}`}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              className={styles.yellowHorizontalLine}
            />
          )
        })}

        {/* желтые вертикальные пунктирные линии */}
        {points.map((p, i) => (
          <line
            key={`yellow-vertical-${i}`}
            x1={p.x}
            y1={padding}
            x2={p.x}
            y2={height - padding}
            className={styles.yellowVerticalLine}
          />
        ))}

        {/* линия графика */}
        <path d={pathD} className={styles.chartPath} />

        {/* белая вертикальная полоска при наведении */}
        {hoveredIndex !== null && (
          <line
            x1={points[hoveredIndex].x}
            y1={padding}
            x2={points[hoveredIndex].x}
            y2={height - padding}
            className={styles.whiteLine}
          />
        )}

        {/* прозрачные области для ховера по месяцам */}
        {monthAreas.map((area, i) => (
          <rect
            key={`area-${i}`}
            x={area.x}
            y={area.y}
            width={area.width}
            height={area.height}
            fill="transparent"
            onMouseEnter={() => handleMonthHover(i)}
            onMouseLeave={handleMonthLeave}
            style={{ cursor: 'pointer' }}
          />
        ))}

        {/* точки */}
        {points.map((p, i) => (
          <circle
            key={`point-${i}`}
            cx={p.x}
            cy={p.y}
            r={4}
            className={styles.point}
            onMouseEnter={() => handleMonthHover(i)}
            onMouseLeave={handleMonthLeave}
          />
        ))}

        {/* подписи по X */}
        {points.map((p, i) => (
          <text
            key={`xlabel-${i}`}
            x={p.x}
            y={height - padding + 15}
            className={styles.xLabel}
          >
            {p.label}
          </text>
        ))}

        {/* подписи по Y */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = height - padding - t * (height - 2 * padding)
          const val = Math.round(t * maxValue)
          return (
            <text
              key={`ylabel-${i}`}
              x={padding - 10}
              y={y + 4}
              className={styles.yLabel}
            >
              {val.toLocaleString()} ₽
            </text>
          )
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className={styles.tooltip}
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 30,
            transform: 'translateX(-50%)',
          }}
        >
          {tooltip.label}: {tooltip.value.toLocaleString()} ₽
        </div>
      )}
    </div>
  )
}
