import { InjectionToken } from '@angular/core'

import { ITenantRepository } from '../domain'
import { TenantImpRepository } from './tenant.imp-repository'

export const TenantToken = new InjectionToken<ITenantRepository>('TenantToken')

export const TenantProvider = {
	provide: TenantToken,
	useClass: TenantImpRepository,
}
