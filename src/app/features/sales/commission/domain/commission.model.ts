import { CommissionStatus } from './commission-status.enum'

export interface Commission {
	id: string
	saleId: string
	agentId: string
	tenantId: string
	saleTotal: number
	percentage: number
	amount: number
	status: CommissionStatus
	commissionPaymentId: string
}
