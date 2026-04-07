import { Injectable, inject } from '@angular/core'

import { CreateTenantDto, ITenantRepository } from '../domain'
import { TenantToken } from '../infra'

@Injectable()
export class CreateTenantUseCase {
	private readonly repository = inject<ITenantRepository>(TenantToken)

	execute(dto: CreateTenantDto) {
		return this.repository.createTenant(dto)
	}
}
