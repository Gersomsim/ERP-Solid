import { SaleStatus } from './sale-status.enum'

export interface CreateSaleDto {
	customerId: string
	saleAgentId: string
	folio: string
	saleDate: Date
	subtotal: number
	tax: number
	discount: number
	total: number
	status: SaleStatus
	paymentTermId: string
}
