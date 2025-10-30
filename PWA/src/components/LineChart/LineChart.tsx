import { useId, useMemo, useState } from 'react'
import styles from './LineChart.module.scss'

export interface LineChartProps {
  labels: string[]
  values: number[]
  target?: number
  unit?: string
  title?: string
}

type Point = {
  x: number
  y: number
  value: number
  label: string
  index: number
}

type TooltipState = {
  label: string
  value: number
  left: number
  top: number
}

type HitArea = {
  start: number
  width: number
  index: number
}

const VIEWBOX_WIDTH = 720
const VIEWBOX_HEIGHT = 360
const PADDING = {
  top: 32,
  right: 36,
  bottom: 56,
  left: 72,
}
const TICK_COUNT = 6

const numberFormatter = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0,
})

const niceStep = (roughStep: number) => {
  const exponent = Math.floor(Math.log10(roughStep))
  const fraction = roughStep / 10 ** exponent

  let niceFraction: number
  if (fraction <= 1) niceFraction = 1
  else if (fraction <= 2) niceFraction = 2
  else if (fraction <= 5) niceFraction = 5
  else niceFraction = 10

  return niceFraction * 10 ** exponent
}

const formatValue = (value: number, unit?: string) => {
  const formatted = numberFormatter.format(value)
  return unit ? `${formatted} ${unit}` : formatted
}

export default function LineChart({
  labels,
  values,
  target,
  unit = '₽',
  title = 'Revenue performance',
}: LineChartProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const chartTitleId = useId()

  const baseMax = Math.max(target ?? 0, ...values)
  const step = niceStep(baseMax / Math.max(TICK_COUNT - 1, 1))
  const maxValue = step * Math.max(TICK_COUNT - 1, 1)

  const innerWidth = VIEWBOX_WIDTH - PADDING.left - PADDING.right
  const innerHeight = VIEWBOX_HEIGHT - PADDING.top - PADDING.bottom

  const points = useMemo<Point[]>(() => {
    if (values.length === 0) return []
    const segments = Math.max(values.length - 1, 1)

    return values.map((value, index) => {
      const x = PADDING.left + (index / segments) * innerWidth
      const y =
        PADDING.top +
        (1 - Math.min(value / maxValue, 1)) * innerHeight

      return {
        x,
        y,
        value,
        label: labels[index] ?? `Point ${index + 1}`,
        index,
      }
    })
  }, [values, labels, innerWidth, innerHeight, maxValue])

  const linePath = useMemo(() => {
    if (points.length === 0) return ''
    return points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ')
  }, [points])

  const areaPath = useMemo(() => {
    if (points.length < 2) return ''
    const baselineY = VIEWBOX_HEIGHT - PADDING.bottom

    const leading = `M ${points[0].x} ${baselineY}`
    const middle = points.map((point) => `L ${point.x} ${point.y}`).join(' ')
    const trailing = `L ${points[points.length - 1].x} ${baselineY} Z`

    return `${leading} ${middle} ${trailing}`
  }, [points])

  const hitAreas = useMemo<HitArea[]>(() => {
    if (points.length === 0) return []

    return points.map((point, index) => {
      const start =
        index === 0
          ? PADDING.left
          : (point.x + points[index - 1].x) / 2
      const end =
        index === points.length - 1
          ? VIEWBOX_WIDTH - PADDING.right
          : (point.x + points[index + 1].x) / 2

      return {
        start,
        width: Math.max(end - start, 6),
        index,
      }
    })
  }, [points])

  const ticks = useMemo(
    () => Array.from({ length: TICK_COUNT }, (_, idx) => idx * step),
    [step],
  )

  const handleHover = (point: Point) => {
    setHoveredIndex(point.index)
    setTooltip({
      label: point.label,
      value: point.value,
      left: (point.x / VIEWBOX_WIDTH) * 100,
      top: (point.y / VIEWBOX_HEIGHT) * 100,
    })
  }

  const handleLeave = () => {
    setHoveredIndex(null)
    setTooltip(null)
  }

  const hasTarget = typeof target === 'number'
  const targetY = hasTarget
    ? PADDING.top +
      (1 - Math.min((target as number) / maxValue, 1)) * innerHeight
    : null
  const targetLabel = hasTarget
    ? `Goal: ${formatValue(target as number, unit)}`
    : ''

  return (
    <div className={styles.container}>
      <svg
        className={styles.chart}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        aria-labelledby={chartTitleId}
        role="img"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id={chartTitleId}>{title}</title>

        <defs>
          <linearGradient id="chart-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(249, 181, 76, 0.35)" />
            <stop offset="100%" stopColor="rgba(249, 181, 76, 0.03)" />
          </linearGradient>
        </defs>

        {ticks.map((tickValue) => {
          const y =
            PADDING.top +
            (1 - tickValue / maxValue) * innerHeight

          return (
            <g key={`tick-${tickValue}`}>
              <line
                x1={PADDING.left}
                y1={y}
                x2={VIEWBOX_WIDTH - PADDING.right}
                y2={y}
                className={styles.gridLine}
              />
              <text
                x={PADDING.left - 12}
                y={y + 4}
                className={styles.yLabel}
              >
                {formatValue(tickValue, unit)}
              </text>
            </g>
          )
        })}

        {points.map((point) => (
          <line
            key={`vertical-${point.index}`}
            x1={point.x}
            y1={PADDING.top}
            x2={point.x}
            y2={VIEWBOX_HEIGHT - PADDING.bottom}
            className={styles.verticalGuide}
            opacity={hoveredIndex === point.index ? 0.45 : 0.18}
          />
        ))}

        {areaPath && <path d={areaPath} className={styles.area} />}
        {linePath && <path d={linePath} className={styles.line} />}

        {hasTarget && targetY !== null && (
          <g className={styles.targetLine}>
            <line
              x1={PADDING.left}
              y1={targetY}
              x2={VIEWBOX_WIDTH - PADDING.right}
              y2={targetY}
            />
            <text
              x={VIEWBOX_WIDTH - PADDING.right + 8}
              y={targetY + 4}
            >
              {targetLabel}
            </text>
          </g>
        )}

        {points.map((point) => (
          <g key={`point-${point.index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === point.index ? 6 : 4}
              className={styles.point}
              onMouseEnter={() => handleHover(point)}
              onMouseLeave={handleLeave}
            />
            <text
              x={point.x}
              y={VIEWBOX_HEIGHT - PADDING.bottom + 24}
              className={styles.xLabel}
            >
              {point.label}
            </text>
          </g>
        ))}

        {hitAreas.map((area) => (
          <rect
            key={`hit-${area.index}`}
            x={area.start}
            y={PADDING.top}
            width={area.width}
            height={innerHeight}
            fill="transparent"
            onMouseEnter={() => handleHover(points[area.index])}
            onMouseLeave={handleLeave}
          />
        ))}
      </svg>

      {tooltip && (
        <div
          className={styles.tooltip}
          style={{
            left: `${tooltip.left}%`,
            top: `${tooltip.top}%`,
          }}
        >
          <span className={styles.tooltipLabel}>{tooltip.label}</span>
          <strong className={styles.tooltipValue}>
            {formatValue(tooltip.value, unit)}
          </strong>
        </div>
      )}
    </div>
  )
}
