import { Injectable, inject } from '@angular/core'

import { firstValueFrom, map } from 'rxjs'

import { HttpService } from '@core/http'

import { Tenant } from '../domain/tenant.model'
import { ITenantRepository } from '../domain/tenant.repository'

@Injectable()
export class TenantImpRepository implements ITenantRepository {
	private readonly path = 'tenants'
	private readonly httpService = inject(HttpService)

	getTenantById(tenantId: string): Promise<Tenant> {
		const resp = this.httpService
			.get<Tenant>(`${this.path}/${tenantId}`, { withCredentials: true })
			.pipe(map(response => response.data))
		return firstValueFrom(resp)
	}
	createTenant(tenant: Tenant): Promise<Tenant> {
		const resp = this.httpService
			.post<Tenant>(this.path, tenant, { withCredentials: true })
			.pipe(map(response => response.data))
		return firstValueFrom(resp)
	}
	updateTenant(tenant: Tenant): Promise<Tenant> {
		const resp = this.httpService
			.put<Tenant>(`${this.path}/${tenant.id}`, tenant, { withCredentials: true })
			.pipe(map(response => response.data))
		return firstValueFrom(resp)
	}
	updateSettings(tenantId: string, settings: Tenant): Promise<Tenant> {
		const resp = this.httpService
			.put<Tenant>(`${this.path}/${tenantId}/settings`, settings, { withCredentials: true })
			.pipe(map(response => response.data))
		return firstValueFrom(resp)
	}
}
