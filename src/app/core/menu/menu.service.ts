import { Injectable, computed, inject } from '@angular/core'

import { AuthState } from '@core/auth'

import { MenuSection } from './menu.model'

@Injectable({ providedIn: 'root' })
export class MenuService {
	private readonly authState = inject(AuthState)

	private readonly sections: MenuSection[] = [
		// ── General ───────────────────────────────────────────────────
		{
			items: [{ label: 'Dashboard', icon: 'house', route: 'dashboard' }],
		},

		// ── Ventas ────────────────────────────────────────────────────
		{
			title: 'Ventas',
			items: [
				{
					label: 'Ventas',
					icon: 'shopping-cart',
					route: 'sales',
					viewPermission: 'sales.view',
				},
				{
					label: 'Clientes',
					icon: 'users',
					route: 'customers',
					viewPermission: 'customers.view',
				},
				{
					label: 'Agentes de venta',
					icon: 'circle-user-round',
					route: 'sale-agents',
					viewPermission: 'sale-agents.view',
				},
				{
					label: 'Comisiones',
					icon: 'chart-candlestick',
					route: 'commissions',
					viewPermission: 'commissions.view',
				},
				{
					label: 'Condiciones de pago',
					icon: 'landmark',
					route: 'payment-terms',
					viewPermission: 'payment-terms.view',
				},
				{
					label: 'Productos',
					icon: 'tag',
					route: 'products',
					viewPermission: 'product-sales-data.view',
				},
				{
					label: 'Devoluciones',
					icon: 'arrow-left',
					route: 'sale-returns',
					viewPermission: 'sale-returns.view',
				},
				{
					label: 'Metas de ventas',
					icon: 'chart-area',
					route: 'sale-targets',
					viewPermission: 'sale-targets.view',
				},
			],
		},

		// ── Administración ────────────────────────────────────────────
		{
			title: 'Administración',
			items: [
				{
					label: 'Usuarios',
					icon: 'user',
					route: 'users',
					viewPermission: 'users.view',
				},
				{
					label: 'Roles',
					icon: 'shield',
					route: 'roles',
					viewPermission: 'roles.view',
				},
				{
					label: 'Permisos',
					icon: 'key-round',
					route: 'permissions',
					viewPermission: 'permissions.view',
				},
				{
					label: 'Tenant',
					icon: 'building',
					route: 'tenant',
					viewPermission: 'tenants.view',
				},
			],
		},
	]

	readonly visibleSections = computed(() =>
		this.sections
			.map(section => ({
				...section,
				items: section.items.filter(
					item => !item.viewPermission || this.authState.hasPermission(item.viewPermission),
				),
			}))
			.filter(section => section.items.length > 0),
	)
}
