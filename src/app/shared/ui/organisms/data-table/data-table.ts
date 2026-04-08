import { Component, computed, input, output } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'

import { Icon } from '../../atoms/icon/icon'
import { IconType } from '../../atoms/icon/icon.type'
import { TableAction, TableActionColor, TableColumn } from './data-table.type'

@Component({
    selector: 'lib-ui-data-table',
    imports: [Icon, NgTemplateOutlet],
    templateUrl: './data-table.html',
})
export class DataTable {
    columns = input.required<TableColumn[]>()
    rows = input.required<any[]>()
    actions = input<TableAction[]>([])
    loading = input<boolean>(false)
    trackByKey = input<string>('id')
    emptyIcon = input<IconType>('file')
    emptyMessage = input<string>('No hay elementos')
    emptyHint = input<string>('')

    action = output<{ key: string; row: any }>()

    protected readonly skeletonRows = [1, 2, 3, 4, 5]

    protected totalCols = computed(
        () => this.columns().length + (this.actions().length > 0 ? 1 : 0),
    )

    protected getValue(row: any, col: TableColumn): string {
        if (col.render) return col.render(row)
        const value = row[col.key]
        return value != null && value !== '' ? String(value) : '—'
    }

    protected thClass(col: TableColumn): string {
        return [
            'px-4 py-3 font-medium text-surface-500 dark:text-surface-400 tracking-wide text-xs uppercase',
            col.align === 'right' ? 'text-right' : 'text-left',
            col.hideBelow === 'md' ? 'hidden md:table-cell' : '',
            col.hideBelow === 'lg' ? 'hidden lg:table-cell' : '',
        ].filter(Boolean).join(' ')
    }

    protected tdClass(col: TableColumn): string {
        return [
            'px-4 py-3',
            col.align === 'right' ? 'text-right' : '',
            col.hideBelow === 'md' ? 'hidden md:table-cell' : '',
            col.hideBelow === 'lg' ? 'hidden lg:table-cell' : '',
        ].filter(Boolean).join(' ')
    }

    protected actionClass(color: TableActionColor = 'default'): string {
        const colors: Record<TableActionColor, string> = {
            default: 'hover:text-surface-700 hover:bg-surface-100 dark:hover:text-surface-200 dark:hover:bg-surface-700',
            primary:  'hover:text-primary-600 hover:bg-primary-50 dark:hover:text-primary-400 dark:hover:bg-primary-900/20',
            danger:   'hover:text-danger-600 hover:bg-danger-50 dark:hover:text-danger-400 dark:hover:bg-danger-900/20',
        }
        return [
            'w-8 h-8 flex items-center justify-center rounded-lg',
            'text-surface-400 transition-colors duration-150',
            colors[color],
        ].join(' ')
    }

    protected trackById(index: number, row: any): any {
        return row[this.trackByKey()] ?? index
    }
}
