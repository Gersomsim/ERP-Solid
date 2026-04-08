import { CreateSaleTargetDto } from './create-sale-target.dto'
import { SaleTarget } from './sale-target.model'

export interface SaleTargetRepository {
	getAll(): Promise<SaleTarget[]>
	getById(id: string): Promise<SaleTarget>
	create(saleTarget: CreateSaleTargetDto): Promise<SaleTarget>
	update(saleTarget: SaleTarget): Promise<SaleTarget>
	delete(id: string): Promise<void>
}
