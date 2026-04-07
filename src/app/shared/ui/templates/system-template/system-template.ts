import { Component, computed, inject, signal } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

import { AuthState } from '@core/auth'
import { ThemeService } from '@core/theme'

import { Icon } from '../../atoms/icon/icon'
import { IconType } from '../../atoms/icon/icon.type'

export interface MenuItem {
	icon: IconType
	label: string
	route: string
	permission?: string
}

@Component({
	selector: 'app-system-template',
	imports: [Icon, RouterLink, RouterLinkActive],
	templateUrl: './system-template.html',
})
export class SystemTemplate {
	protected theme = inject(ThemeService)
	protected authState = inject(AuthState)

	protected collapsed = signal(false)
	protected userMenuOpen = signal(false)

	protected displayName = computed(() => {
		const p = this.authState.user()?.profile
		return p ? `${p.firstName} ${p.lastName}` : '—'
	})

	protected roleName = computed(() => this.authState.role()?.name ?? '—')

	protected readonly menuItems: MenuItem[] = [
		{ icon: 'house', label: 'Dashboard', route: 'dashboard' },
		{ icon: 'shopping-cart', label: 'Ventas', route: 'sales', permission: 'sales.view' },
		{ icon: 'users', label: 'Usuarios', route: 'users', permission: 'users.view' },
		{ icon: 'settings', label: 'Configuración', route: 'settings', permission: 'settings.view' },
	]

	protected visibleItems = computed(() =>
		this.menuItems.filter(
			item => !item.permission || this.authState.hasPermission(item.permission),
		),
	)

	protected toggleCollapse(): void {
		this.collapsed.update(v => !v)
	}

	protected toggleUserMenu(): void {
		this.userMenuOpen.update(v => !v)
	}

	protected closeUserMenu(): void {
		this.userMenuOpen.set(false)
	}
}
