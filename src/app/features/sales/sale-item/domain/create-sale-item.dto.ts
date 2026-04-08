export interface CreateSaleItemDto {
	productId: string
	quantity: number
	unitPrice: number
	tax: number
	discount: number
	total: number
}
