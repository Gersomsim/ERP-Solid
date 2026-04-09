import { Injectable, inject } from '@angular/core'

import { CreateCustomerDto, Customer, CustomerRepository } from '../domain'
import { CustomerToken } from '../infra'

@Injectable()
export class CreateCustomerUseCase {
	private readonly customerRepository = inject<CustomerRepository>(CustomerToken)

	execute(customer: CreateCustomerDto): Promise<Customer> {
		return this.customerRepository.create(customer)
	}
}
