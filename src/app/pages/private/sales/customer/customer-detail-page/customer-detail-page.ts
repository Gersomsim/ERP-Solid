import { CommonModule, CurrencyPipe, NgClass } from '@angular/common'
import { Component, TemplateRef, afterNextRender, computed, inject, resource, signal, viewChild } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

import { map } from 'rxjs'

import { Avatar, Badge, type BadgeVariant, Card, CardHeader, Icon, Link, PageTitle } from '@ui/atoms'
import { StatCard } from '@ui/molecules/stat-card'
import { Chart, type ChartData } from '@ui/organisms/chart'
import { DataTable, type TableColumn } from '@ui/organisms/data-table'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { GetCustomerByIdUseCase } from '@features/sales/customer/app'
import { CustomerProvider } from '@features/sales/customer/infra'

type SaleStatus = 'paid' | 'pending' | 'overdue' | 'cancelled'

interface Sale {
	id: string
	folio: string
	date: string
	description: string
	amount: number
	status: SaleStatus
}

const MOCK_SALES: Sale[] = [
	{
		id: 's1',
		folio: 'VTA-2024-001',
		date: '2024-11-05',
		description: 'Varilla corrugada 3/8"',
		amount: 48500,
		status: 'paid',
	},
	{
		id: 's2',
		folio: 'VTA-2024-002',
		date: '2024-11-18',
		description: 'Cemento Portland ×100 sacos',
		amount: 22000,
		status: 'paid',
	},
	{
		id: 's3',
		folio: 'VTA-2024-003',
		date: '2024-12-03',
		description: 'Blocks de concreto ×500',
		amount: 35000,
		status: 'pending',
	},
	{
		id: 's4',
		folio: 'VTA-2024-004',
		date: '2024-12-10',
		description: 'Acero estructural 1/2"',
		amount: 67000,
		status: 'pending',
	},
	{
		id: 's5',
		folio: 'VTA-2024-005',
		date: '2024-10-22',
		description: 'Arena y grava ×20 m³',
		amount: 18000,
		status: 'paid',
	},
	{
		id: 's6',
		folio: 'VTA-2024-006',
		date: '2024-09-14',
		description: 'Tubería PVC 6" ×50 tramos',
		amount: 29500,
		status: 'overdue',
	},
	{
		id: 's7',
		folio: 'VTA-2024-007',
		date: '2024-08-30',
		description: 'Lámina galvanizada cal. 22',
		amount: 41000,
		status: 'paid',
	},
	{
		id: 's8',
		folio: 'VTA-2024-008',
		date: '2024-07-11',
		description: 'Herrajes y tornillería',
		amount: 8500,
		status: 'cancelled',
	},
]

const MONTHLY_DATA = [
	{ month: 'Ene', value: 32000 },
	{ month: 'Feb', value: 28000 },
	{ month: 'Mar', value: 45000 },
	{ month: 'Abr', value: 38000 },
	{ month: 'May', value: 52000 },
	{ month: 'Jun', value: 41000 },
	{ month: 'Jul', value: 47000 },
	{ month: 'Ago', value: 35000 },
	{ month: 'Sep', value: 58000 },
	{ month: 'Oct', value: 63000 },
	{ month: 'Nov', value: 70500 },
	{ month: 'Dic', value: 55000 },
]

@Component({
	selector: 'app-customer-detail-page',
	imports: [
		Avatar,
		Badge,
		Card,
		CardHeader,
		Icon,
		Link,
		PageTitle,
		MainContainer,
		Chart,
		DataTable,
		StatCard,
		CurrencyPipe,
		NgClass,
		CommonModule,
	],
	templateUrl: './customer-detail-page.html',
	providers: [GetCustomerByIdUseCase, CustomerProvider],
})
export class CustomerDetailPage {
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)
	private readonly getCustomerByIdUseCase = inject(GetCustomerByIdUseCase)

	readonly customerId = toSignal(this.route.params.pipe(map(p => p['id'] as string | undefined)))

	private readonly statusCellTpl = viewChild.required<TemplateRef<{ $implicit: Sale }>>('statusCell')

	customerRes = resource({
		loader: () => this.getCustomerByIdUseCase.execute(this.customerId()!),
	})
	customer = computed(() => this.customerRes.value())

	protected readonly sales = MOCK_SALES
	protected salesColumns = signal<TableColumn[]>([])

	protected totalRevenue = computed(() =>
		MOCK_SALES.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0),
	)

	protected pendingAmount = computed(() =>
		MOCK_SALES.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0),
	)

	protected overdueAmount = computed(() =>
		MOCK_SALES.filter(s => s.status === 'overdue').reduce((sum, s) => sum + s.amount, 0),
	)

	protected readonly totalOrders = MOCK_SALES.length

	private static formatMXN(value: number): string {
		return new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			maximumFractionDigits: 0,
		}).format(value)
	}

	protected totalRevenueFormatted = computed(() => CustomerDetailPage.formatMXN(this.totalRevenue()))
	protected pendingAmountFormatted = computed(() => CustomerDetailPage.formatMXN(this.pendingAmount()))
	protected overdueAmountFormatted = computed(() => CustomerDetailPage.formatMXN(this.overdueAmount()))

	protected readonly saleCountByStatus = {
		paid: MOCK_SALES.filter(s => s.status === 'paid').length,
		pending: MOCK_SALES.filter(s => s.status === 'pending').length,
		overdue: MOCK_SALES.filter(s => s.status === 'overdue').length,
		cancelled: MOCK_SALES.filter(s => s.status === 'cancelled').length,
	}

	protected creditUsedPercent = computed(() => {
		const c = this.customer()
		if (!c || c.creditLimit === 0) return 0
		return Math.min(((this.pendingAmount() + this.overdueAmount()) / c.creditLimit) * 100, 100)
	})

	protected creditAvailable = computed(() => {
		const c = this.customer()
		if (!c) return 0
		return Math.max(c.creditLimit - this.pendingAmount() - this.overdueAmount(), 0)
	})

	protected creditBarClass = computed(() => {
		const pct = this.creditUsedPercent()
		if (pct > 80) return 'bg-danger-500'
		if (pct > 55) return 'bg-primary-400'
		return 'bg-success-500'
	})

	constructor() {
		afterNextRender(() => {
			this.salesColumns.set([
				{ key: 'folio', label: 'Folio', cellClass: 'font-mono text-xs' },
				{ key: 'description', label: 'Descripción', hideBelow: 'md' },
				{
					key: 'date',
					label: 'Fecha',
					hideBelow: 'lg',
					render: (s: Sale) => {
						const [y, m, d] = s.date.split('-').map(Number)
						const months = [
							'Ene',
							'Feb',
							'Mar',
							'Abr',
							'May',
							'Jun',
							'Jul',
							'Ago',
							'Sep',
							'Oct',
							'Nov',
							'Dic',
						]
						return `${String(d).padStart(2, '0')} ${months[m - 1]} ${y}`
					},
				},
				{
					key: 'amount',
					label: 'Importe',
					align: 'right',
					cellClass: 'font-medium tabular-nums',
					render: (s: Sale) =>
						new Intl.NumberFormat('es-MX', {
							style: 'currency',
							currency: 'MXN',
							maximumFractionDigits: 0,
						}).format(s.amount),
				},
				{ key: 'status', label: 'Estado', cellTemplate: this.statusCellTpl() },
			])
		})
	}

	protected readonly revenueChartData: ChartData = {
		labels: MONTHLY_DATA.map(d => d.month),
		datasets: [{ label: 'Ingresos', data: MONTHLY_DATA.map(d => d.value) }],
	}

	protected statusConfig(status: SaleStatus): { label: string; variant: BadgeVariant } {
		const configs: Record<SaleStatus, { label: string; variant: BadgeVariant }> = {
			paid: { label: 'Pagado', variant: 'success' },
			pending: { label: 'Pendiente', variant: 'primary' },
			overdue: { label: 'Vencido', variant: 'danger' },
			cancelled: { label: 'Cancelado', variant: 'default' },
		}
		return configs[status]
	}

	protected onEdit(): void {
		const id = this.customerId()
		if (id) this.router.navigate(['/private/sales/customer/edit', id])
	}
}
