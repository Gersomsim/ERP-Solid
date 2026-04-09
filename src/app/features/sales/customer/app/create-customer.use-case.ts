import { Injectable, inject } from '@angular/core'

import { Customer } from '../domain'
import { CustomerToken } from '../infra'

@Injectable()
export class CreateCustomerUseCase {
	private readonly customerRepository = inject(CustomerToken)

	execute(customer: Customer): Promise<Customer> {
		return this.customerRepository.create(customer)
	}
}
