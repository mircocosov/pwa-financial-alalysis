import { useState } from "react"
import styles from "./LineChart.module.css"

interface LineChartProps {
	data: number[]
	labels: string[]
}

interface Point {
	x: number
	y: number
	value: number
	label: string
}

export default function LineChart({ data, labels }: LineChartProps) {
	const [tooltip, setTooltip] = useState<Point | null>(null)

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
		.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
		.join(" ")

	return (
		<div className={styles.container} style={{ width, height }}>
			<svg className={styles.svg} width={width} height={height}>
				{/* линии сетки */}
				{[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
					const y = padding + t * (height - 2 * padding)
					return (
						<line
							key={i}
							x1={padding}
							y1={y}
							x2={width - padding}
							y2={y}
							className={styles.gridLine}
						/>
					)
				})}

				{/* линия графика */}
				<path d={pathD} className={styles.chartPath} />

				{/* точки */}
				{points.map((p, i) => (
					<circle
						key={i}
						cx={p.x}
						cy={p.y}
						r={4}
						className={styles.point}
						onMouseEnter={() =>
							setTooltip({
								x: p.x,
								y: p.y,
								value: p.value,
								label: p.label,
							})
						}
						onMouseLeave={() => setTooltip(null)}
					/>
				))}

				{/* подписи по X */}
				{points.map((p, i) => (
					<text
						key={i}
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
							key={i}
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
					style={{ left: tooltip.x + 10, top: tooltip.y - 30 }}
				>
					{tooltip.label}: {tooltip.value.toLocaleString()} ₽
				</div>
			)}
		</div>
	)
}
