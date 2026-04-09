import { Injectable, inject } from '@angular/core'

import { SaleAgent } from '../domain'
import { SaleAgentToken } from '../infra'

@Injectable()
export class UpdateSaleAgentUseCase {
	private readonly saleAgentRepository = inject(SaleAgentToken)

	execute(agent: SaleAgent): Promise<SaleAgent> {
		return this.saleAgentRepository.update(agent)
	}
}
