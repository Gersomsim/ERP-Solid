import { CommissionRule } from './commission-rule.model'
import { CreateCommissionRuleDto } from './create-commission-rule.dto'

export interface CommissionRuleRepository {
	getAll(): Promise<CommissionRule[]>
	getById(id: string): Promise<CommissionRule>
	create(commissionRule: CreateCommissionRuleDto): Promise<CommissionRule>
	update(commissionRule: CommissionRule): Promise<CommissionRule>
	delete(id: string): Promise<void>
}
