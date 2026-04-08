import { CreateSaleDto } from './create-sale.dto'
import { Sale } from './sale.model'

export interface SaleRepository {
	getAll(): Promise<Sale[]>
	getById(id: string): Promise<Sale>
	create(sale: CreateSaleDto): Promise<Sale>
	update(sale: Sale): Promise<Sale>
	delete(id: string): Promise<void>
}
