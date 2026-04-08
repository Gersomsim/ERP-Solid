import { CreateSalePaymentDto } from './create-sale-payment.dto'
import { SalePayment } from './sale-payment.model'

export interface SalePaymentRepository {
	getAll(): Promise<SalePayment[]>
	getById(id: string): Promise<SalePayment>
	create(salePayment: CreateSalePaymentDto): Promise<SalePayment>
	update(salePayment: SalePayment): Promise<SalePayment>
	delete(id: string): Promise<void>
}
