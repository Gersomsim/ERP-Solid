import { Component, TemplateRef, afterNextRender, input, output, signal, viewChild } from '@angular/core'

import { Avatar } from '@ui/atoms/avatar/avatar'
import { DataTable, TableAction, TableColumn } from '@ui/organisms/data-table'

import { Customer } from '../../domain/customer.model'

@Component({
    selector: 'app-customer-table',
    imports: [Avatar, DataTable],
    templateUrl: './customer-table.html',
})
export class CustomerTable {
    customers = input.required<Customer[]>()
    loading = input<boolean>(false)

    view = output<Customer>()
    edit = output<Customer>()
    delete = output<Customer>()

    private readonly nameCellTpl = viewChild.required<TemplateRef<{ $implicit: Customer }>>('nameCell')

    protected columns = signal<TableColumn[]>([])

    protected readonly actions: TableAction[] = [
        { key: 'view',   icon: 'eye',      label: 'Ver detalle', color: 'primary' },
        { key: 'edit',   icon: 'user-pen', label: 'Editar' },
        { key: 'delete', icon: 'trash-2',  label: 'Eliminar',    color: 'danger' },
    ]

    constructor() {
        afterNextRender(() => {
            this.columns.set([
                { key: 'name',        label: 'Cliente' ,          cellTemplate: this.nameCellTpl() },
                { key: 'taxId',       label: 'RFC / Tax ID',      cellClass: 'font-mono text-xs' },
                { key: 'email',       label: 'Correo',            hideBelow: 'md' },
                { key: 'city',        label: 'Ciudad',            hideBelow: 'lg' },
                {
                    key: 'creditLimit',
                    label: 'Límite de crédito',
                    align: 'right',
                    hideBelow: 'lg',
                    cellClass: 'font-medium',
                    render: (c: Customer) =>
                        c.creditLimit.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                },
            ])
        })
    }

    protected onAction(event: { key: string; row: any }): void {
        const customer = event.row as Customer
        if (event.key === 'view')   this.view.emit(customer)
        if (event.key === 'edit')   this.edit.emit(customer)
        if (event.key === 'delete') this.delete.emit(customer)
    }
}
