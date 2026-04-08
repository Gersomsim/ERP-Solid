export interface CreateSalePaymentDto {
	saleId: string
	amount: number
	date: Date
	reference: string
	paymentMethodId: string
}
