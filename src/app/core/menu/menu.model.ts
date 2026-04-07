import { IconType } from '@ui/atoms'

export interface MenuItem {
	label: string
	icon: IconType
	route: string
	viewPermission?: string // undefined = siempre visible (ej. Dashboard)
}

export interface MenuSection {
	title?: string // undefined = sin cabecera de sección
	items: MenuItem[]
}
