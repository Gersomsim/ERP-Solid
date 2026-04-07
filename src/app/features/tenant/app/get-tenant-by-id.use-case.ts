import { Injectable, inject } from '@angular/core'

import { ITenantRepository } from '../domain'
import { TenantToken } from '../infra'

@Injectable()
export class GetTenantByIdUseCase {
	private readonly repository = inject<ITenantRepository>(TenantToken)

	execute(tenantId: string) {
		return this.repository.getTenantById(tenantId)
	}
}
