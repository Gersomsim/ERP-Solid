import { TemplateRef } from '@angular/core'

import { IconType } from '../../atoms/icon/icon.type'

export type TableActionColor = 'default' | 'primary' | 'danger'

export interface TableColumn {
    /** Clave del campo en el objeto fila */
    key: string
    /** Texto del encabezado */
    label: string
    align?: 'left' | 'right'
    /** Ocultar la columna por debajo de este breakpoint */
    hideBelow?: 'md' | 'lg'
    /** Clases extra aplicadas al span del valor por defecto */
    cellClass?: string
    /** Transforma el valor a string. Si no se define, se usa row[key] */
    render?: (row: any) => string
    /** Template personalizado para la celda. Sobrescribe render. Contexto: { $implicit: row } */
    cellTemplate?: TemplateRef<any>
}

export interface TableAction {
    key: string
    icon: IconType
    label: string
    color?: TableActionColor
}
