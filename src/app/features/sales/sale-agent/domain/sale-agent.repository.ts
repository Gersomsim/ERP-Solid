import { PaginateDto, QueryRequestDto } from '@features/common/dto'

import { CreateSaleAgentDto } from './create-sale-agent.dto'
import { SaleAgent } from './sale-agent.model'

export interface SaleAgentRepository {
	getAll(query?: QueryRequestDto): Promise<PaginateDto<SaleAgent>>
	getById(id: string): Promise<SaleAgent>
	create(saleAgent: CreateSaleAgentDto): Promise<SaleAgent>
	update(saleAgent: SaleAgent): Promise<SaleAgent>
	delete(id: string): Promise<void>
}
