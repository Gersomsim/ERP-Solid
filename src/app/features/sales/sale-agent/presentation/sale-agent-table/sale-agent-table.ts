import { Component, TemplateRef, afterNextRender, input, output, signal, viewChild } from '@angular/core'

import { Avatar, Badge } from '@ui/atoms'
import { DataTable, TableAction, TableColumn } from '@ui/organisms/data-table'

import { SaleAgent } from '../../domain/sale-agent.model'

@Component({
	selector: 'app-sale-agent-table',
	imports: [Avatar, Badge, DataTable],
	templateUrl: './sale-agent-table.html',
})
export class SaleAgentTable {
	agents = input.required<SaleAgent[]>()
	loading = input<boolean>(false)

	view = output<SaleAgent>()
	edit = output<SaleAgent>()

	private readonly nameCellTpl = viewChild.required<TemplateRef<{ $implicit: SaleAgent }>>('nameCell')
	private readonly commissionCellTpl = viewChild.required<TemplateRef<{ $implicit: SaleAgent }>>('commissionCell')

	protected columns = signal<TableColumn[]>([])

	protected readonly actions: TableAction[] = [
		{ key: 'view', icon: 'eye', label: 'Ver detalle', color: 'primary' },
		{ key: 'edit', icon: 'user-pen', label: 'Editar' },
	]

	constructor() {
		afterNextRender(() => {
			this.columns.set([
				{ key: 'name', label: 'Agente', cellTemplate: this.nameCellTpl() },
				{ key: 'commissionRate', label: 'Comisión', cellTemplate: this.commissionCellTpl(), hideBelow: 'md' },
			])
		})
	}

	protected onAction(event: { key: string; row: any }): void {
		const agent = event.row as SaleAgent
		if (event.key === 'view') this.view.emit(agent)
		if (event.key === 'edit') this.edit.emit(agent)
	}
}
