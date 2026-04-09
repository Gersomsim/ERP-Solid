import { CurrencyPipe } from '@angular/common'
import {
	Component,
	TemplateRef,
	afterNextRender,
	computed,
	inject,
	resource,
	signal,
	viewChild,
} from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

import { map } from 'rxjs'

import { Avatar, Badge, type BadgeVariant, Card, CardHeader, Icon, Link, PageTitle } from '@ui/atoms'
import { StatCard } from '@ui/molecules/stat-card'
import { Chart, type ChartData } from '@ui/organisms/chart'
import { DataTable, type TableColumn } from '@ui/organisms/data-table'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { GetSaleAgentByIdUseCase } from '@features/sales/sale-agent/app'
import { SaleAgentProvider } from '@features/sales/sale-agent/infra'

// ── Tipos locales ────────────────────────────────────────────────────────────

type MockSaleStatus = 'confirmed' | 'invoiced' | 'paid' | 'cancelled'
type MockCommissionStatus = 'pending' | 'approved' | 'paid' | 'cancelled'
type MockPaymentStatus = 'draft' | 'paid'

interface MockSale {
	id: string
	folio: string
	date: string
	customerName: string
	total: number
	status: MockSaleStatus
}

interface MockCommission {
	id: string
	folio: string
	date: string
	customerName: string
	saleTotal: number
	percentage: number
	amount: number
	status: MockCommissionStatus
}

interface MockCommissionPayment {
	id: string
	period: string
	commissionsCount: number
	totalAmount: number
	status: MockPaymentStatus
}

// ── Datos de ejemplo ─────────────────────────────────────────────────────────

const MOCK_SALES: MockSale[] = [
	{
		id: 's1',
		folio: 'VTA-2024-031',
		date: '2024-03-05',
		customerName: 'Constructora del Norte',
		total: 85000,
		status: 'paid',
	},
	{
		id: 's2',
		folio: 'VTA-2024-045',
		date: '2024-04-12',
		customerName: 'Ferretera Central SA',
		total: 42500,
		status: 'paid',
	},
	{
		id: 's3',
		folio: 'VTA-2024-062',
		date: '2024-05-20',
		customerName: 'Inmobiliaria Robles',
		total: 128000,
		status: 'invoiced',
	},
	{
		id: 's4',
		folio: 'VTA-2024-078',
		date: '2024-06-08',
		customerName: 'Distribuidora López',
		total: 33000,
		status: 'paid',
	},
	{
		id: 's5',
		folio: 'VTA-2024-094',
		date: '2024-07-15',
		customerName: 'Industrias Norteña',
		total: 75500,
		status: 'paid',
	},
	{
		id: 's6',
		folio: 'VTA-2024-112',
		date: '2024-08-22',
		customerName: 'Constructora del Norte',
		total: 98000,
		status: 'confirmed',
	},
	{
		id: 's7',
		folio: 'VTA-2024-129',
		date: '2024-09-10',
		customerName: 'Materiales Pérez',
		total: 55000,
		status: 'paid',
	},
	{
		id: 's8',
		folio: 'VTA-2024-147',
		date: '2024-10-03',
		customerName: 'Ferretera Central SA',
		total: 18500,
		status: 'cancelled',
	},
]

const MOCK_COMMISSIONS: MockCommission[] = [
	{
		id: 'c1',
		folio: 'VTA-2024-031',
		date: '2024-03-05',
		customerName: 'Constructora del Norte',
		saleTotal: 85000,
		percentage: 8,
		amount: 6800,
		status: 'paid',
	},
	{
		id: 'c2',
		folio: 'VTA-2024-045',
		date: '2024-04-12',
		customerName: 'Ferretera Central SA',
		saleTotal: 42500,
		percentage: 8,
		amount: 3400,
		status: 'paid',
	},
	{
		id: 'c3',
		folio: 'VTA-2024-062',
		date: '2024-05-20',
		customerName: 'Inmobiliaria Robles',
		saleTotal: 128000,
		percentage: 8,
		amount: 10240,
		status: 'approved',
	},
	{
		id: 'c4',
		folio: 'VTA-2024-078',
		date: '2024-06-08',
		customerName: 'Distribuidora López',
		saleTotal: 33000,
		percentage: 8,
		amount: 2640,
		status: 'paid',
	},
	{
		id: 'c5',
		folio: 'VTA-2024-094',
		date: '2024-07-15',
		customerName: 'Industrias Norteña',
		saleTotal: 75500,
		percentage: 8,
		amount: 6040,
		status: 'paid',
	},
	{
		id: 'c6',
		folio: 'VTA-2024-112',
		date: '2024-08-22',
		customerName: 'Constructora del Norte',
		saleTotal: 98000,
		percentage: 8,
		amount: 7840,
		status: 'pending',
	},
	{
		id: 'c7',
		folio: 'VTA-2024-129',
		date: '2024-09-10',
		customerName: 'Materiales Pérez',
		saleTotal: 55000,
		percentage: 8,
		amount: 4400,
		status: 'pending',
	},
]

const MOCK_COMMISSION_PAYMENTS: MockCommissionPayment[] = [
	{ id: 'cp1', period: 'Enero – Febrero 2024', commissionsCount: 2, totalAmount: 4200, status: 'paid' },
	{ id: 'cp2', period: 'Marzo – Abril 2024', commissionsCount: 3, totalAmount: 10200, status: 'paid' },
	{ id: 'cp3', period: 'Mayo – Junio 2024', commissionsCount: 2, totalAmount: 12880, status: 'draft' },
]

const MONTHLY_SALES_DATA = [
	{ month: 'Ene', value: 0 },
	{ month: 'Feb', value: 18000 },
	{ month: 'Mar', value: 85000 },
	{ month: 'Abr', value: 42500 },
	{ month: 'May', value: 128000 },
	{ month: 'Jun', value: 33000 },
	{ month: 'Jul', value: 75500 },
	{ month: 'Ago', value: 98000 },
	{ month: 'Sep', value: 55000 },
	{ month: 'Oct', value: 18500 },
	{ month: 'Nov', value: 0 },
	{ month: 'Dic', value: 0 },
]

const MONTHLY_COMMISSION_DATA = [
	{ month: 'Ene', value: 0 },
	{ month: 'Feb', value: 1440 },
	{ month: 'Mar', value: 6800 },
	{ month: 'Abr', value: 3400 },
	{ month: 'May', value: 10240 },
	{ month: 'Jun', value: 2640 },
	{ month: 'Jul', value: 6040 },
	{ month: 'Ago', value: 7840 },
	{ month: 'Sep', value: 4400 },
	{ month: 'Oct', value: 1480 },
	{ month: 'Nov', value: 0 },
	{ month: 'Dic', value: 0 },
]

// ── Componente ───────────────────────────────────────────────────────────────

@Component({
	selector: 'app-sale-agent-detail-page',
	imports: [Avatar, Badge, Card, CardHeader, Icon, Link, PageTitle, MainContainer, Chart, DataTable, StatCard, CurrencyPipe],
	templateUrl: './sale-agent-detail-page.html',
	providers: [GetSaleAgentByIdUseCase, SaleAgentProvider],
})
export class SaleAgentDetailPage {
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)
	private readonly getSaleAgentByIdUseCase = inject(GetSaleAgentByIdUseCase)

	readonly agentId = toSignal(this.route.params.pipe(map(p => p['id'] as string | undefined)))

	private readonly commissionStatusCellTpl =
		viewChild.required<TemplateRef<{ $implicit: MockCommission }>>('commissionStatusCell')
	private readonly paymentStatusCellTpl =
		viewChild.required<TemplateRef<{ $implicit: MockCommissionPayment }>>('paymentStatusCell')
	private readonly saleStatusCellTpl =
		viewChild.required<TemplateRef<{ $implicit: MockSale }>>('saleStatusCell')

	agentRes = resource({
		loader: () => this.getSaleAgentByIdUseCase.execute(this.agentId()!),
	})
	agent = computed(() => this.agentRes.value())

	// Datos mock
	protected readonly mockSales = MOCK_SALES
	protected readonly mockCommissions = MOCK_COMMISSIONS
	protected readonly mockCommissionPayments = MOCK_COMMISSION_PAYMENTS

	protected salesColumns = signal<TableColumn[]>([])
	protected commissionColumns = signal<TableColumn[]>([])
	protected paymentColumns = signal<TableColumn[]>([])

	// Métricas computadas
	protected readonly totalSalesAmount = computed(() =>
		MOCK_SALES.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.total, 0),
	)
	protected readonly totalSalesCount = MOCK_SALES.length

	protected readonly totalCommissionsEarned = computed(() =>
		MOCK_COMMISSIONS.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0),
	)
	protected readonly pendingCommissions = computed(() =>
		MOCK_COMMISSIONS.filter(c => c.status === 'pending' || c.status === 'approved').reduce(
			(sum, c) => sum + c.amount,
			0,
		),
	)

	protected readonly commissionCountByStatus = {
		pending: MOCK_COMMISSIONS.filter(c => c.status === 'pending').length,
		approved: MOCK_COMMISSIONS.filter(c => c.status === 'approved').length,
		paid: MOCK_COMMISSIONS.filter(c => c.status === 'paid').length,
		cancelled: MOCK_COMMISSIONS.filter(c => c.status === 'cancelled').length,
	}

	private static formatMXN(value: number): string {
		return new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			maximumFractionDigits: 0,
		}).format(value)
	}

	protected totalSalesFormatted = computed(() => SaleAgentDetailPage.formatMXN(this.totalSalesAmount()))
	protected totalCommissionsFormatted = computed(() =>
		SaleAgentDetailPage.formatMXN(this.totalCommissionsEarned()),
	)
	protected pendingCommissionsFormatted = computed(() =>
		SaleAgentDetailPage.formatMXN(this.pendingCommissions()),
	)

	// Gráficas
	protected readonly monthlySalesChartData: ChartData = {
		labels: MONTHLY_SALES_DATA.map(d => d.month),
		datasets: [{ label: 'Ventas', data: MONTHLY_SALES_DATA.map(d => d.value) }],
	}

	protected readonly monthlyCommissionChartData: ChartData = {
		labels: MONTHLY_COMMISSION_DATA.map(d => d.month),
		datasets: [{ label: 'Comisiones', data: MONTHLY_COMMISSION_DATA.map(d => d.value), color: '#22c55e' }],
	}

	constructor() {
		afterNextRender(() => {
			this.salesColumns.set([
				{ key: 'folio', label: 'Folio', cellClass: 'font-mono text-xs' },
				{ key: 'customerName', label: 'Cliente', hideBelow: 'md' },
				{
					key: 'date',
					label: 'Fecha',
					hideBelow: 'lg',
					render: (s: MockSale) => {
						const [y, m, d] = s.date.split('-').map(Number)
						const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
						return `${String(d).padStart(2, '0')} ${months[m - 1]} ${y}`
					},
				},
				{
					key: 'total',
					label: 'Total',
					align: 'right',
					cellClass: 'font-medium tabular-nums',
					render: (s: MockSale) => SaleAgentDetailPage.formatMXN(s.total),
				},
				{ key: 'status', label: 'Estado', cellTemplate: this.saleStatusCellTpl() },
			])

			this.commissionColumns.set([
				{ key: 'folio', label: 'Folio venta', cellClass: 'font-mono text-xs' },
				{ key: 'customerName', label: 'Cliente', hideBelow: 'md' },
				{
					key: 'saleTotal',
					label: 'Venta',
					align: 'right',
					hideBelow: 'lg',
					cellClass: 'tabular-nums text-xs',
					render: (c: MockCommission) => SaleAgentDetailPage.formatMXN(c.saleTotal),
				},
				{
					key: 'amount',
					label: 'Comisión',
					align: 'right',
					cellClass: 'font-semibold tabular-nums',
					render: (c: MockCommission) => SaleAgentDetailPage.formatMXN(c.amount),
				},
				{ key: 'status', label: 'Estado', cellTemplate: this.commissionStatusCellTpl() },
			])

			this.paymentColumns.set([
				{ key: 'period', label: 'Período' },
				{
					key: 'commissionsCount',
					label: 'Comisiones',
					render: (p: MockCommissionPayment) => `${p.commissionsCount}`,
				},
				{
					key: 'totalAmount',
					label: 'Total liquidado',
					align: 'right',
					cellClass: 'font-semibold tabular-nums',
					render: (p: MockCommissionPayment) => SaleAgentDetailPage.formatMXN(p.totalAmount),
				},
				{ key: 'status', label: 'Estado', cellTemplate: this.paymentStatusCellTpl() },
			])
		})
	}

	protected commissionStatusConfig(status: MockCommissionStatus): { label: string; variant: BadgeVariant } {
		const configs: Record<MockCommissionStatus, { label: string; variant: BadgeVariant }> = {
			pending: { label: 'Pendiente', variant: 'warning' },
			approved: { label: 'Aprobada', variant: 'primary' },
			paid: { label: 'Pagada', variant: 'success' },
			cancelled: { label: 'Cancelada', variant: 'default' },
		}
		return configs[status]
	}

	protected paymentStatusConfig(status: MockPaymentStatus): { label: string; variant: BadgeVariant } {
		const configs: Record<MockPaymentStatus, { label: string; variant: BadgeVariant }> = {
			draft: { label: 'Pendiente', variant: 'warning' },
			paid: { label: 'Liquidado', variant: 'success' },
		}
		return configs[status]
	}

	protected saleStatusConfig(status: MockSaleStatus): { label: string; variant: BadgeVariant } {
		const configs: Record<MockSaleStatus, { label: string; variant: BadgeVariant }> = {
			confirmed: { label: 'Confirmada', variant: 'primary' },
			invoiced: { label: 'Facturada', variant: 'warning' },
			paid: { label: 'Pagada', variant: 'success' },
			cancelled: { label: 'Cancelada', variant: 'default' },
		}
		return configs[status]
	}
}
