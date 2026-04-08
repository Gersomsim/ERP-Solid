import { CreatePriceListDto } from './create-price-list.dto'
import { PriceList } from './price-list.model'

export interface PriceListRepository {
	getAll(): Promise<PriceList[]>
	getById(id: string): Promise<PriceList>
	create(priceList: CreatePriceListDto): Promise<PriceList>
	update(priceList: PriceList): Promise<PriceList>
	delete(id: string): Promise<void>
}
