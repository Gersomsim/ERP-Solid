import { Commission } from './commission.model'
import { CreateCommissionDto } from './create-commission.dto'

export interface CommissionRepository {
	getAll(): Promise<Commission[]>
	getById(id: string): Promise<Commission>
	create(commission: CreateCommissionDto): Promise<Commission>
	update(commission: Commission): Promise<Commission>
	delete(id: string): Promise<void>
}
