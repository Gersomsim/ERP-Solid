import { CommonModule, CurrencyPipe, NgClass } from '@angular/common'
import { afterNextRender, Component, computed, inject, signal, TemplateRef, viewChild } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

import { map } from 'rxjs'

import { Avatar, Badge, Card, CardHeader, Icon, Link, PageTitle, type BadgeVariant } from '@ui/atoms'
import { StatCard } from '@ui/molecules/stat-card'
import { Chart, type ChartData } from '@ui/organisms/chart'
import { DataTable, type TableColumn } from '@ui/organisms/data-table'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { Customer } from '@features/sales/customer/domain/customer.model'

type SaleStatus = 'paid' | 'pending' | 'overdue' | 'cancelled'

interface Sale {
	id: string
	folio: string
	date: string
	description: string
	amount: number
	status: SaleStatus
}

// TODO: reemplazar con llamada al repositorio
const MOCK_CUSTOMERS: Customer[] = [
	{
		id: '1',
		name: 'Constructora del Norte SA',
		taxId: 'CNO-980123-AB1',
		email: 'contacto@constructoranorte.mx',
		phone: '555-1001',
		address: 'Av. Industrial 45',
		city: 'Monterrey',
		state: 'NL',
		zip: '64000',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 150000,
	},
	{
		id: '2',
		name: 'Distribuidora Omega',
		taxId: 'DOM-770412-CD2',
		email: 'ventas@omega.mx',
		phone: '555-2002',
		address: 'Blvd. Central 12',
		city: 'Guadalajara',
		state: 'JL',
		zip: '44100',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 80000,
	},
	{
		id: '3',
		name: 'Grupo Industrial Alfa',
		taxId: 'GIA-650301-EF3',
		email: '',
		phone: '555-3003',
		address: 'Calz. Obrera 88',
		city: 'CDMX',
		state: 'CDMX',
		zip: '06800',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 200000,
	},
	{
		id: '4',
		name: 'Servicios Logísticos Beta',
		taxId: 'SLB-890615-GH4',
		email: 'ops@beta.mx',
		phone: '',
		address: '',
		city: 'Puebla',
		state: 'PUE',
		zip: '72000',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 50000,
	},
	{
		id: '5',
		name: 'Importaciones Gamma',
		taxId: 'IGA-910820-IJ5',
		email: 'contacto@gamma.mx',
		phone: '555-5005',
		address: 'Libramiento 33',
		city: 'Querétaro',
		state: 'QRO',
		zip: '76000',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 120000,
	},
	{
		id: '6',
		name: 'Exportaciones Delta',
		taxId: 'EDE-840205-KL6',
		email: 'info@delta.mx',
		phone: '555-6006',
		address: 'Av. Constitución 7',
		city: 'Tijuana',
		state: 'BC',
		zip: '22000',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 90000,
	},
	{
		id: '7',
		name: 'Tecnología Épsilon',
		taxId: 'TEC-001130-MN7',
		email: 'soporte@epsilon.mx',
		phone: '555-7007',
		address: 'Parque Tec 101',
		city: 'Monterrey',
		state: 'NL',
		zip: '64849',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 60000,
	},
	{
		id: '8',
		name: 'Alimentos Zeta Corp',
		taxId: 'AZC-750918-OP8',
		email: 'ventas@zeta.mx',
		phone: '555-8008',
		address: 'Zona Industrial 22',
		city: 'León',
		state: 'GTO',
		zip: '37490',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 35000,
	},
	{
		id: '9',
		name: 'Maquinaria Eta',
		taxId: 'MAE-680310-QR9',
		email: '',
		phone: '555-9009',
		address: 'Av. Maquinaria 5',
		city: 'Saltillo',
		state: 'COAH',
		zip: '25000',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 175000,
	},
	{
		id: '10',
		name: 'Consultora Theta',
		taxId: 'CTH-930714-ST0',
		email: 'hola@theta.mx',
		phone: '555-0010',
		address: 'Torre Ejecutiva P12',
		city: 'CDMX',
		state: 'CDMX',
		zip: '11000',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 40000,
	},
	{
		id: '11',
		name: 'Agroindustrias Iota',
		taxId: 'AGI-820525-UV1',
		email: 'campo@iota.mx',
		phone: '555-1011',
		address: 'Carr. Federal Km 12',
		city: 'Culiacán',
		state: 'SIN',
		zip: '80000',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 25000,
	},
	{
		id: '12',
		name: 'Energía Kappa SA',
		taxId: 'EKA-710403-WX2',
		email: 'energia@kappa.mx',
		phone: '555-2012',
		address: 'Col. Industrial Norte',
		city: 'Hermosillo',
		state: 'SON',
		zip: '83000',
		country: 'MX',
		tenantId: 't1',
		creditLimit: 300000,
	},
]

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
	imports: [Avatar, Badge, Card, CardHeader, Icon, Link, PageTitle, MainContainer, Chart, DataTable, StatCard, CurrencyPipe, NgClass, CommonModule],
	templateUrl: './customer-detail-page.html',
})
export class CustomerDetailPage {
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)

	private readonly customerId = toSignal(this.route.params.pipe(map(p => p['id'] as string | undefined)))

	protected customer = computed<Customer | null>(() => {
		const id = this.customerId()
		if (!id) return null
		return MOCK_CUSTOMERS.find(c => c.id === id) ?? null
	})

	private readonly statusCellTpl = viewChild.required<TemplateRef<{ $implicit: Sale }>>('statusCell')

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
						const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
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
