import {
	afterNextRender,
	Component,
	effect,
	ElementRef,
	input,
	OnDestroy,
	untracked,
	viewChild,
} from '@angular/core'
import {
	ArcElement,
	BarController,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	DoughnutController,
	Filler,
	Legend,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	Tooltip,
} from 'chart.js'

import type { ChartData, ChartType } from './chart.type'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	LineController,
	BarController,
	DoughnutController,
	Filler,
	Tooltip,
	Legend,
)

/** Design-system palette — maps to primary, success, danger, and common accent colors */
const PALETTE = [
	'#3b82f6', // primary / blue-500
	'#22c55e', // success / green-500
	'#ef4444', // danger  / red-500
	'#a855f7', // purple-500
	'#f97316', // orange-500
	'#14b8a6', // teal-500
	'#6366f1', // indigo-500
	'#ec4899', // pink-500
]

function hexToRgba(hex: string, alpha: number): string {
	const r = parseInt(hex.slice(1, 3), 16)
	const g = parseInt(hex.slice(3, 5), 16)
	const b = parseInt(hex.slice(5, 7), 16)
	return `rgba(${r},${g},${b},${alpha})`
}

@Component({
	selector: 'lib-ui-chart',
	imports: [],
	template: `
		<div
			class="relative w-full"
			[style.height.px]="height()"
		>
			<canvas #canvas></canvas>
		</div>
	`,
})
export class Chart implements OnDestroy {
	type = input.required<ChartType>()
	data = input.required<ChartData>()
	height = input<number>(200)
	/** Show the chart legend */
	legend = input<boolean>(false)
	/** Smooth line tension (area/line charts) */
	smooth = input<boolean>(true)

	private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas')
	private chartInstance: ChartJS | null = null

	constructor() {
		afterNextRender(() => this.initChart())

		effect(() => {
			const data = this.data()
			if (!this.chartInstance) return
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			this.chartInstance.data = untracked(() => this.buildChartJSData(data)) as any
			this.chartInstance.update()
		})
	}

	private get isDark(): boolean {
		return document.documentElement.classList.contains('dark')
	}

	private buildChartJSData(data: ChartData): object {
		const canvas = this.canvasRef().nativeElement
		const ctx = canvas.getContext('2d')!
		const type = this.type()
		const smooth = this.smooth()

		const datasets = data.datasets.map((ds, i) => {
			const color = ds.color ?? PALETTE[i % PALETTE.length]

			if (type === 'area' && ctx) {
				const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight || 200)
				gradient.addColorStop(0, hexToRgba(color, 0.2))
				gradient.addColorStop(1, hexToRgba(color, 0))
				return {
					label: ds.label,
					data: ds.data,
					borderColor: color,
					backgroundColor: gradient,
					fill: true,
					tension: smooth ? 0.4 : 0,
					pointRadius: 0,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: color,
					borderWidth: 2,
				}
			}

			if (type === 'doughnut') {
				const bgColors =
					data.datasets.length === 1
						? [color, hexToRgba(color, 0.12)]
						: data.datasets.map((_, j) => PALETTE[j % PALETTE.length])
				return {
					label: ds.label,
					data: ds.data,
					backgroundColor: bgColors,
					borderWidth: 0,
					hoverOffset: 6,
				}
			}

			// bar
			return {
				label: ds.label,
				data: ds.data,
				backgroundColor: hexToRgba(color, 0.8),
				hoverBackgroundColor: color,
				borderRadius: 5,
				borderSkipped: false,
			}
		})

		return { labels: data.labels, datasets }
	}

	private buildOptions(): object {
		const dark = this.isDark
		const gridColor = dark ? 'rgba(148,163,184,0.08)' : 'rgba(100,116,139,0.1)'
		const tickColor = dark ? '#94a3b8' : '#64748b'
		const tooltipBg = dark ? '#1e293b' : '#0f172a'
		const isDoughnut = this.type() === 'doughnut'
		const showLegend = this.legend()

		const base = {
			responsive: true,
			maintainAspectRatio: false,
			animation: { duration: 500 },
			plugins: {
				legend: {
					display: showLegend,
					labels: {
						color: tickColor,
						font: { size: 11, family: 'inherit' },
						boxWidth: 10,
						padding: 16,
						usePointStyle: true,
					},
				},
				tooltip: {
					backgroundColor: tooltipBg,
					titleColor: '#f8fafc',
					bodyColor: '#cbd5e1',
					borderColor: dark ? '#334155' : '#1e293b',
					borderWidth: 1,
					padding: 10,
					cornerRadius: 8,
					titleFont: { size: 11, weight: 'bold', family: 'inherit' },
					bodyFont: { size: 11, family: 'inherit' },
				},
			},
		}

		if (isDoughnut) {
			return { ...base, cutout: '72%' }
		}

		return {
			...base,
			scales: {
				x: {
					border: { display: false },
					grid: { display: false },
					ticks: {
						color: tickColor,
						font: { size: 10, family: 'inherit' },
						maxRotation: 0,
					},
				},
				y: {
					border: { display: false },
					grid: { color: gridColor, lineWidth: 1 },
					ticks: {
						color: tickColor,
						font: { size: 10, family: 'inherit' },
						maxTicksLimit: 5,
					},
				},
			},
		}
	}

	private initChart(): void {
		const canvas = this.canvasRef().nativeElement
		const jsType = this.type() === 'area' ? 'line' : this.type()

		this.chartInstance = new ChartJS(canvas, {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			type: jsType as any,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data: this.buildChartJSData(this.data()) as any,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			options: this.buildOptions() as any,
		})
	}

	ngOnDestroy(): void {
		this.chartInstance?.destroy()
	}
}
