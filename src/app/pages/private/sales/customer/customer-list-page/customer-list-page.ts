import { Component, computed, inject, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Link, PageTitle } from '@ui/atoms'
import { Icon } from '@ui/atoms/icon/icon'
import { Paginator } from '@ui/molecules/paginator/paginator'
import { SearchInput } from '@ui/molecules/search-input/search-input'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { Customer } from '@features/sales/customer/domain/customer.model'
import { CustomerTable } from '@features/sales/customer/presentation/customer-table/customer-table'

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

@Component({
	selector: 'app-customer-list-page',
	imports: [Icon, SearchInput, Paginator, CustomerTable, Link, MainContainer, PageTitle],
	templateUrl: './customer-list-page.html',
})
export class CustomerListPage {
	private router = inject(Router)
	private readonly route = inject(ActivatedRoute)

	protected searchTerm = signal('')
	protected page = signal(1)
	protected readonly pageSize = 5

	protected filteredCustomers = computed(() => {
		const term = this.searchTerm().toLowerCase()
		if (!term) return MOCK_CUSTOMERS
		return MOCK_CUSTOMERS.filter(
			c =>
				c.name.toLowerCase().includes(term) ||
				c.taxId.toLowerCase().includes(term) ||
				(c.email?.toLowerCase().includes(term) ?? false) ||
				(c.city?.toLowerCase().includes(term) ?? false),
		)
	})

	protected total = computed(() => this.filteredCustomers().length)

	protected pagedCustomers = computed(() => {
		const start = (this.page() - 1) * this.pageSize
		return this.filteredCustomers().slice(start, start + this.pageSize)
	})

	protected onSearch(term: string): void {
		this.searchTerm.set(term)
		this.page.set(1)
	}

	protected onPageChange(page: number): void {
		this.page.set(page)
	}

	protected onView(customer: Customer): void {
		this.router.navigate(['../detail', customer.id], { relativeTo: this.route })
	}

	protected onEdit(customer: Customer): void {
		this.router.navigate(['../edit', customer.id], { relativeTo: this.route })
	}
}
