import { PaginateDto, QueryRequestDto } from '@features/common/dto'

import { CreateCustomerDto } from './create-customer.dto'
import { Customer } from './customer.model'

export interface CustomerRepository {
	getAll(query?: QueryRequestDto): Promise<PaginateDto<Customer>>
	getById(id: string): Promise<Customer>
	create(customer: CreateCustomerDto): Promise<Customer>
	update(customer: Customer): Promise<Customer>
	delete(id: string): Promise<void>
}
