import { Component, computed, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

import { map } from 'rxjs'

import { Link, PageTitle } from '@ui/atoms'
import { Icon } from '@ui/atoms/icon/icon'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { Customer } from '@features/sales/customer/domain/customer.model'
import { CustomerForm, CustomerFormValue } from '@features/sales/customer/presentation/customer-form/customer-form'

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
]

@Component({
	selector: 'app-customer-edit-page',
	imports: [Link, Icon, PageTitle, CustomerForm, MainContainer],
	templateUrl: './customer-edit-page.html',
})
export class CustomerEditPage {
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)

	protected loading = signal(false)

	private readonly customerId = toSignal(this.route.params.pipe(map(p => p['id'] as string | undefined)))

	protected customer = computed<Customer | null>(() => {
		const id = this.customerId()
		if (!id) return null
		return MOCK_CUSTOMERS.find(c => c.id === id) ?? null
	})

	protected initialValue = computed<CustomerFormValue | null>(() => {
		const c = this.customer()
		if (!c) return null
		const { id: _, tenantId: __, ...rest } = c
		return rest
	})

	protected async onSubmit(value: CustomerFormValue): Promise<void> {
		this.loading.set(true)
		try {
			// TODO: llamar al use case de actualización
			console.log('update customer', this.customerId(), value)
			this.router.navigate(['/private/sales/customer/list'])
		} finally {
			this.loading.set(false)
		}
	}

	protected onCancel(): void {
		this.router.navigate(['/private/sales/customer/list'])
	}
}
