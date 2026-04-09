import { Component, computed, inject, resource, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

import { map } from 'rxjs'

import { Card, Icon, Link, PageTitle } from '@ui/atoms'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { GetSaleAgentByIdUseCase, UpdateSaleAgentUseCase } from '@features/sales/sale-agent/app'
import { CreateSaleAgentDto } from '@features/sales/sale-agent/domain'
import { SaleAgentProvider } from '@features/sales/sale-agent/infra'
import { SaleAgentForm } from '@features/sales/sale-agent/presentation/sale-agent-form/sale-agent-form'

@Component({
	selector: 'app-sale-agent-edit-page',
	imports: [Card, Icon, Link, PageTitle, SaleAgentForm, MainContainer],
	templateUrl: './sale-agent-edit-page.html',
	providers: [SaleAgentProvider, GetSaleAgentByIdUseCase, UpdateSaleAgentUseCase],
})
export class SaleAgentEditPage {
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)
	private readonly getSaleAgentByIdUseCase = inject(GetSaleAgentByIdUseCase)
	private readonly updateSaleAgentUseCase = inject(UpdateSaleAgentUseCase)

	protected loading = signal(false)

	private readonly agentId = toSignal(this.route.params.pipe(map(p => p['id'] as string)))

	agentRes = resource({
		loader: () => this.getSaleAgentByIdUseCase.execute(this.agentId()!),
	})

	protected agent = computed(() => this.agentRes.value())

	protected initialValue = computed<CreateSaleAgentDto | null>(() => {
		const a = this.agent()
		if (!a) return null
		const { id: _, tenantId: __, ...rest } = a
		return rest
	})

	protected async onSubmit(value: CreateSaleAgentDto): Promise<void> {
		this.loading.set(true)
		try {
			const agent = this.agent()
			await this.updateSaleAgentUseCase.execute({
				id: agent!.id,
				tenantId: agent!.tenantId,
				...value,
			})
			this.router.navigate(['../../detail', this.agentId()], { relativeTo: this.route })
		} finally {
			this.loading.set(false)
		}
	}

	protected onCancel(): void {
		this.router.navigate(['../../detail', this.agentId()], { relativeTo: this.route })
	}
}
