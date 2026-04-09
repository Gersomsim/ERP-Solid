import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Card, Link, PageTitle } from '@ui/atoms'
import { Icon } from '@ui/atoms/icon/icon'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { CreateCustomerUseCase } from '@features/sales/customer/app'
import { CreateCustomerDto } from '@features/sales/customer/domain'
import { CustomerProvider } from '@features/sales/customer/infra'
import { CustomerForm } from '@features/sales/customer/presentation/customer-form/customer-form'

@Component({
	selector: 'app-customer-crete-page',
	imports: [Card, Link, Icon, PageTitle, CustomerForm, MainContainer],
	templateUrl: './customer-crete-page.html',
	providers: [CreateCustomerUseCase, CustomerProvider],
})
export class CustomerCretePage {
	private readonly createCustomerUseCase = inject(CreateCustomerUseCase)
	private readonly router = inject(Router)
	private readonly route = inject(ActivatedRoute)

	protected loading = signal(false)

	protected async onSubmit(value: CreateCustomerDto): Promise<void> {
		this.loading.set(true)
		try {
			const customer = await this.createCustomerUseCase.execute(value)
			this.router.navigate(['../detail', customer.id], { relativeTo: this.route })
		} finally {
			this.loading.set(false)
		}
	}

	protected onCancel(): void {
		this.router.navigate(['../list'], { relativeTo: this.route })
	}
}
