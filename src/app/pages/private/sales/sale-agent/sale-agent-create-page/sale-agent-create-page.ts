import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Card, Link, PageTitle } from '@ui/atoms'
import { Icon } from '@ui/atoms/icon/icon'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { CreateSaleAgentUseCase } from '@features/sales/sale-agent/app'
import { CreateSaleAgentDto } from '@features/sales/sale-agent/domain'
import { SaleAgentProvider } from '@features/sales/sale-agent/infra'
import { SaleAgentForm } from '@features/sales/sale-agent/presentation/sale-agent-form/sale-agent-form'

@Component({
	selector: 'app-sale-agent-create-page',
	imports: [Card, Link, Icon, PageTitle, SaleAgentForm, MainContainer],
	templateUrl: './sale-agent-create-page.html',
	providers: [SaleAgentProvider, CreateSaleAgentUseCase],
})
export class SaleAgentCreatePage {
	private readonly createSaleAgentUseCase = inject(CreateSaleAgentUseCase)
	private readonly router = inject(Router)
	private readonly route = inject(ActivatedRoute)

	protected loading = signal(false)

	protected async onSubmit(value: CreateSaleAgentDto): Promise<void> {
		this.loading.set(true)
		try {
			const agent = await this.createSaleAgentUseCase.execute(value)
			this.router.navigate(['../detail', agent.id], { relativeTo: this.route })
		} finally {
			this.loading.set(false)
		}
	}

	protected onCancel(): void {
		this.router.navigate(['../list'], { relativeTo: this.route })
	}
}
