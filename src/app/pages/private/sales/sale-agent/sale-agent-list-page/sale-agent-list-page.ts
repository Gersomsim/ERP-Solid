import { Component, computed, inject, resource } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Card, CardHeader, Link, PageTitle } from '@ui/atoms'
import { Icon } from '@ui/atoms/icon/icon'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { GetSaleAgentsUseCase } from '@features/sales/sale-agent/app'
import { SaleAgent } from '@features/sales/sale-agent/domain'
import { SaleAgentProvider } from '@features/sales/sale-agent/infra'
import { SaleAgentTable } from '@features/sales/sale-agent/presentation/sale-agent-table/sale-agent-table'

@Component({
	selector: 'app-sale-agent-list-page',
	imports: [Card, CardHeader, Icon, SaleAgentTable, Link, MainContainer, PageTitle],
	templateUrl: './sale-agent-list-page.html',
	providers: [SaleAgentProvider, GetSaleAgentsUseCase],
})
export class SaleAgentListPage {
	private readonly router = inject(Router)
	private readonly route = inject(ActivatedRoute)
	private readonly getSaleAgentsUseCase = inject(GetSaleAgentsUseCase)

	agentsRes = resource({
		loader: () => this.getSaleAgentsUseCase.execute(),
	})
	pagination = computed(() => this.agentsRes.value()?.pagination ?? null)

	totalItems = computed(() => this.pagination()?.totalItems ?? 0)

	protected onView(agent: SaleAgent): void {
		this.router.navigate(['../detail', agent.id], { relativeTo: this.route })
	}

	protected onEdit(agent: SaleAgent): void {
		this.router.navigate(['../edit', agent.id], { relativeTo: this.route })
	}
}
