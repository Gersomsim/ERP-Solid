import { CreatePaymentTermDto } from './create-payment-term.model'
import { PaymentTerm } from './payment-term.model'

export interface PaymentTermRepository {
	getAll(): Promise<PaymentTerm[]>
	getById(id: string): Promise<PaymentTerm>
	create(paymentTerm: CreatePaymentTermDto): Promise<PaymentTerm>
	update(paymentTerm: PaymentTerm): Promise<PaymentTerm>
	delete(id: string): Promise<void>
}
