import { Injectable, inject } from '@angular/core'

import { ITenantRepository, Tenant } from '../domain'
import { TenantToken } from '../infra'

@Injectable()
export class UpdateSettingsTenantUseCase {
	private readonly repository = inject<ITenantRepository>(TenantToken)

	execute(tenantId: string, settings: Tenant) {
		return this.repository.updateSettings(tenantId, settings)
	}
}
