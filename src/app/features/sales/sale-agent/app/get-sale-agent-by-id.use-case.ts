import { Injectable, inject } from '@angular/core'

import { SaleAgent } from '../domain'
import { SaleAgentToken } from '../infra'

@Injectable()
export class GetSaleAgentByIdUseCase {
	private readonly saleAgentRepository = inject(SaleAgentToken)

	execute(id: string): Promise<SaleAgent> {
		return this.saleAgentRepository.getById(id)
	}
}
