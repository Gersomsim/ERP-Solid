import { Component, computed, inject, resource, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

import { map } from 'rxjs'

import { Card, Link, PageTitle } from '@ui/atoms'
import { Icon } from '@ui/atoms/icon/icon'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { GetCustomerByIdUseCase, UpdateCustomerUseCase } from '@features/sales/customer/app'
import { CreateCustomerDto } from '@features/sales/customer/domain'
import { CustomerProvider } from '@features/sales/customer/infra'
import { CustomerForm } from '@features/sales/customer/presentation/customer-form/customer-form'

@Component({
	selector: 'app-customer-edit-page',
	imports: [Card, Link, Icon, PageTitle, CustomerForm, MainContainer],
	templateUrl: './customer-edit-page.html',
	providers: [CustomerProvider, GetCustomerByIdUseCase, UpdateCustomerUseCase],
})
export class CustomerEditPage {
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)
	private readonly getCustomerByIdUseCase = inject(GetCustomerByIdUseCase)
	private readonly updateCustomerUseCase = inject(UpdateCustomerUseCase)

	protected loading = signal(false)

	private readonly customerId = toSignal(this.route.params.pipe(map(p => p['id'])))
	customerRes = resource({
		loader: () => this.getCustomerByIdUseCase.execute(this.customerId()),
	})

	protected customer = computed(() => this.customerRes.value())

	protected initialValue = computed<CreateCustomerDto | null>(() => {
		const c = this.customer()
		if (!c) return null
		const { id: _, tenantId: __, ...rest } = c
		return rest
	})

	protected async onSubmit(value: CreateCustomerDto): Promise<void> {
		this.loading.set(true)
		try {
			const customer = this.customer()

			await this.updateCustomerUseCase.execute({
				id: customer!.id,
				tenantId: customer!.tenantId,
				...value,
			})
			this.router.navigate(['../../detail', this.customerId()], { relativeTo: this.route })
		} finally {
			this.loading.set(false)
		}
	}

	protected onCancel(): void {
		this.router.navigate(['/private/sales/customer/list'])
	}
}
