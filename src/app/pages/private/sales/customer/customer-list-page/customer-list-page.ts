import { Component, computed, inject, resource } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

import { map } from 'rxjs'

import { Card, CardHeader, Link, PageTitle } from '@ui/atoms'
import { Icon } from '@ui/atoms/icon/icon'
import { Paginator } from '@ui/molecules/paginator/paginator'
import { SearchInput } from '@ui/molecules/search-input/search-input'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { GetCustomersUseCase } from '@features/sales/customer/app'
import { Customer } from '@features/sales/customer/domain/customer.model'
import { CustomerProvider } from '@features/sales/customer/infra'
import { CustomerTable } from '@features/sales/customer/presentation/customer-table/customer-table'

@Component({
	selector: 'app-customer-list-page',
	imports: [Card, CardHeader, Icon, SearchInput, Paginator, CustomerTable, Link, MainContainer, PageTitle],
	templateUrl: './customer-list-page.html',
	providers: [CustomerProvider, GetCustomersUseCase],
})
export class CustomerListPage {
	private readonly router = inject(Router)
	private readonly route = inject(ActivatedRoute)
	private readonly getCustomersUseCase = inject(GetCustomersUseCase)

	protected readonly searchTerm = toSignal(this.route.queryParamMap.pipe(map(p => p.get('search') ?? '')), {
		initialValue: '',
	})

	protected readonly page = toSignal(this.route.queryParamMap.pipe(map(p => p.get('page') ?? '1')), {
		initialValue: '1',
	})

	customerRes = resource({
		loader: () => this.getCustomersUseCase.execute({ search: this.searchTerm(), page: this.page() }),
	})
	paginate = computed(() => {
		const res = this.customerRes.value()
		return res?.pagination
	})
	totalItems = computed(() => this.paginate()?.totalItems ?? 0)

	protected onView(customer: Customer): void {
		this.router.navigate(['../detail', customer.id], { relativeTo: this.route })
	}

	protected onEdit(customer: Customer): void {
		this.router.navigate(['../edit', customer.id], { relativeTo: this.route })
	}
}
