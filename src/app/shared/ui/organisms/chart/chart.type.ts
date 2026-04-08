export type ChartType = 'area' | 'bar' | 'doughnut'

export interface ChartDataset {
	label: string
	data: number[]
	/** Hex color, e.g. '#3b82f6'. Falls back to the built-in design-system palette. */
	color?: string
}

export interface ChartData {
	labels: string[]
	datasets: ChartDataset[]
}
