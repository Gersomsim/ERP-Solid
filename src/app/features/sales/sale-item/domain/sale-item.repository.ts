import { CreateSaleItemDto } from './create-sale-item.dto'
import { SaleItem } from './sale-item.model'

export interface SaleItemRepository {
	getAll(): Promise<SaleItem[]>
	getById(id: string): Promise<SaleItem>
	create(saleItem: CreateSaleItemDto): Promise<SaleItem>
	update(saleItem: SaleItem): Promise<SaleItem>
	delete(id: string): Promise<void>
}
