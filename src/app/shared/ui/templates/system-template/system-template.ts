import { Component, computed, inject, signal } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'

import { AuthState } from '@core/auth'
import { MenuService } from '@core/menu'
import { ThemeService } from '@core/theme'

import { Icon } from '../../atoms/icon/icon'

@Component({
	selector: 'app-system-template',
	imports: [Icon, RouterLink, RouterLinkActive, RouterOutlet],
	templateUrl: './system-template.html',
})
export class SystemTemplate {
	protected theme = inject(ThemeService)
	protected authState = inject(AuthState)
	protected menu = inject(MenuService)

	protected collapsed = signal(false)
	protected userMenuOpen = signal(false)

	protected displayName = computed(() => {
		const p = this.authState.user()?.profile
		return p ? `${p.firstName} ${p.lastName}` : '—'
	})

	protected roleName = computed(() => this.authState.role()?.name ?? '—')

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
