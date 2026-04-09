import { Injectable, inject } from '@angular/core'

import { PaginateDto, QueryRequestDto } from '@features/common/dto'

import { SaleAgent } from '../domain'
import { SaleAgentToken } from '../infra'

@Injectable()
export class GetSaleAgentsUseCase {
	private readonly saleAgentRepository = inject(SaleAgentToken)

	execute(query?: QueryRequestDto): Promise<PaginateDto<SaleAgent>> {
		return this.saleAgentRepository.getAll(query)
	}
}
