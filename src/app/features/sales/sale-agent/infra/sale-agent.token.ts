import { InjectionToken, Provider } from '@angular/core'

import { SaleAgentRepository } from '../domain'
import { SaleAgentImplRepository } from './sale-agent.impl-repository'

export const SaleAgentToken = new InjectionToken<SaleAgentRepository>('SaleAgentRepository')

export const SaleAgentProvider: Provider = {
	provide: SaleAgentToken,
	useClass: SaleAgentImplRepository,
}
