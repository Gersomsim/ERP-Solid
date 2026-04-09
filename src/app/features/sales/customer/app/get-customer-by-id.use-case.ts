import { Injectable, inject } from '@angular/core'

import { Customer } from '../domain'
import { CustomerToken } from '../infra'

@Injectable()
export class GetCustomerByIdUseCase {
	private readonly customerRepository = inject(CustomerToken)

	execute(id: string): Promise<Customer> {
		return this.customerRepository.getById(id)
	}
}
