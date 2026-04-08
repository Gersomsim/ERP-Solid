import { CommissionPaymentStatus } from './commission-payment-status.enum'

export interface CommissionPayment {
	id: string
	agentId: string
	tenantId: string
	periodFrom: Date
	periodTo: Date
	totalAmount: number
	status: CommissionPaymentStatus
}
