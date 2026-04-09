import { Injectable, inject } from '@angular/core'

import { SaleAgent } from '../domain'
import { SaleAgentToken } from '../infra'

@Injectable()
export class GetSaleAgentsUseCase {
	private readonly saleAgentRepository = inject(SaleAgentToken)

	execute(): Promise<SaleAgent[]> {
		return this.saleAgentRepository.getAll()
	}
}
