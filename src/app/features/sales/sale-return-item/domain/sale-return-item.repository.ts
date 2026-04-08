import { CreateSaleReturnItemDto } from './create-sale-return-item.dto'
import { SaleReturnItem } from './sale-return-item.model'

export interface SaleReturnItemRepository {
	getAll(): Promise<SaleReturnItem[]>
	getById(id: string): Promise<SaleReturnItem>
	create(saleReturnItem: CreateSaleReturnItemDto): Promise<SaleReturnItem>
	update(saleReturnItem: SaleReturnItem): Promise<SaleReturnItem>
	delete(id: string): Promise<void>
}
