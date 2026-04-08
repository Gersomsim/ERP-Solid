import { CreateProductSaleDataDto } from './create-product-sales.dto'
import { ProductSaleData } from './product-sales.model'

export interface ProductSaleDataRepository {
	getAll(): Promise<ProductSaleData[]>
	getById(id: string): Promise<ProductSaleData>
	create(productSaleData: CreateProductSaleDataDto): Promise<ProductSaleData>
	update(productSaleData: ProductSaleData): Promise<ProductSaleData>
	delete(id: string): Promise<void>
}
