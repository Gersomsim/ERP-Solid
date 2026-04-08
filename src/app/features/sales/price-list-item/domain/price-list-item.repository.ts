import { CreatePriceListItemDto } from './create-price-list-item.dto'
import { PriceListItem } from './price-list-item.model'

export interface PriceListItemRepository {
	getAll(): Promise<PriceListItem[]>
	getById(id: string): Promise<PriceListItem>
	create(priceListItem: CreatePriceListItemDto): Promise<PriceListItem>
	update(priceListItem: PriceListItem): Promise<PriceListItem>
	delete(id: string): Promise<void>
}
