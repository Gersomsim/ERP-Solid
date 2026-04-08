import { CommissionPayment } from './commission-payment.model'
import { CreateCommissionPaymentDto } from './create-commission-payment.dto'

export interface CommissionPaymentRepository {
	getAll(): Promise<CommissionPayment[]>
	getById(id: string): Promise<CommissionPayment>
	create(commissionPayment: CreateCommissionPaymentDto): Promise<CommissionPayment>
	update(commissionPayment: CommissionPayment): Promise<CommissionPayment>
	delete(id: string): Promise<void>
}
