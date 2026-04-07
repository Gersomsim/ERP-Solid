import { Injectable, signal } from '@angular/core'

import { Tenant } from '@features/tenant/domain'

const STORAGE_KEY = 'erp_tenant'

interface PersistedTenant {
	id: string
	name: string
	slug: string
	taxIdentifier: string
	settings: Record<string, unknown>
}

@Injectable({ providedIn: 'root' })
export class TenantState {
	private readonly _tenant = signal<Tenant | null>(null)

	readonly tenant = this._tenant.asReadonly()

	constructor() {
		this.restore()
	}

	setTenant(tenant: Tenant): void {
		this._tenant.set(tenant)
		this.persist(tenant)
	}

	clear(): void {
		this._tenant.set(null)
		localStorage.removeItem(STORAGE_KEY)
	}

	private persist(tenant: Tenant): void {
		const safe: PersistedTenant = {
			id: tenant.id,
			name: tenant.name,
			slug: tenant.slug,
			taxIdentifier: tenant.taxIdentifier,
			settings: tenant.settings,
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(safe))
	}

	private restore(): void {
		try {
			const raw = localStorage.getItem(STORAGE_KEY)
			if (!raw) return
			const persisted = JSON.parse(raw) as PersistedTenant
			this._tenant.set(persisted as Tenant)
		} catch {
			localStorage.removeItem(STORAGE_KEY)
		}
	}
}
