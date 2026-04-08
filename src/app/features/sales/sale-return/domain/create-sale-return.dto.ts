import { SaleReturnResolution } from './sale-return-resolution.enum'
import { SaleReturnStatus } from './sale-return-status.enum'

export interface CreateSaleReturnDto {
	saleId: string
	reason: string
	status: SaleReturnStatus
	resolutionType: SaleReturnResolution
	notes: string | null
}
