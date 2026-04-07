import { Injectable, inject } from '@angular/core'

import { ITenantRepository, Tenant } from '../domain'
import { TenantToken } from '../infra'

@Injectable()
export class UpdateTenantUseCase {
	private readonly repository = inject<ITenantRepository>(TenantToken)

	execute(tenant: Tenant) {
		return this.repository.updateTenant(tenant)
	}
}
