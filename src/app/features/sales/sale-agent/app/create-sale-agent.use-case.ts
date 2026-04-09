import { Injectable, inject } from '@angular/core'

import { CreateSaleAgentDto, SaleAgent } from '../domain'
import { SaleAgentToken } from '../infra'

@Injectable()
export class CreateSaleAgentUseCase {
	private readonly saleAgentRepository = inject(SaleAgentToken)

	execute(dto: CreateSaleAgentDto): Promise<SaleAgent> {
		return this.saleAgentRepository.create(dto)
	}
}
