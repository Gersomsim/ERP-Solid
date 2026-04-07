import { Component, OnInit, inject, signal } from '@angular/core'
import { Router } from '@angular/router'

import { AuthState } from '@core/auth'
import { TenantState } from '@core/global'
import { ProcessLoaderService } from '@core/process-loader'

import { SystemTemplate } from '@ui/templates'

import { GetTenantByIdUseCase } from '@features/tenant/app'
import { TenantProvider } from '@features/tenant/infra'
import { AuthToken, AuthTokenProvider } from '@features/users/auth/infra'

@Component({
	selector: 'app-load-data-page',
	imports: [SystemTemplate],
	templateUrl: './load-data-page.html',
	providers: [GetTenantByIdUseCase, TenantProvider, AuthTokenProvider],
	styles: ``,
})
export class LoadDataPage implements OnInit {
	private router = inject(Router)
	private authState = inject(AuthState)
	private authRepo = inject(AuthToken)
	private getTenantByIdUseCase = inject(GetTenantByIdUseCase)
	private processLoader = inject(ProcessLoaderService)
	private tenantState = inject(TenantState)
	private tenantId = signal<string>('')
	tenantSlug = signal<string>('')

	async ngOnInit(): Promise<void> {
		try {
			await this.processLoader.execute([
				{
					label: 'Verificando sesión',
					fn: () => this.loadSession(),
					onError: () => this.deleteSesion(),
				},
				{
					label: 'Cargando tenant',
					fn: () => this.loadTenant(),
					onError: () => this.deleteSesion(),
				},
				{
					label: 'Sincronizando permisos',
					fn: () => this.loadPermissions(),
				},
			])
			console.log('Tenant slug', this.tenantSlug())
			await this.router.navigate([this.tenantSlug(), 'dashboard'])
		} catch {
			// el onError del paso fallido ya gestionó la navegación
		}
	}

	private async loadSession(): Promise<void> {
		const user = this.authState.user()
		if (!user) {
			return Promise.reject(new Error('No se encontró el usuario'))
		}

		// Si el token murió por un page refresh, lo renovamos antes de continuar
		if (!this.authState.token()) {
			const auth = await this.authRepo.refreshToken()
			this.authState.setAuth(auth)
		}

		this.tenantId.set(user.tenantId)
	}

	private async loadTenant(): Promise<void> {
		try {
			const tenant = await this.getTenantByIdUseCase.execute(this.tenantId())
			if (tenant.status !== 'active') {
				return Promise.reject(new Error('El tenant no está activo'))
			}
			this.tenantState.setTenant(tenant)
			this.tenantSlug.set(tenant.slug)
			return Promise.resolve()
		} catch (error) {
			return Promise.reject(error)
		}
	}

	private loadPermissions(): Promise<void> {
		return Promise.resolve()
	}

	private loadModules(): Promise<void> {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve()
			}, 1000000)
		})
	}

	deleteSesion() {
		this.authState.clear()
		this.tenantState.clear()
		this.router.navigate(['/auth/login'])
	}
}
