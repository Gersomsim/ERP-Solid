import { Injectable, inject } from '@angular/core'

import { CustomerToken } from '../infra'

@Injectable()
export class DeleteCustomerUseCase {
	private readonly customerRepository = inject(CustomerToken)

	execute(id: string): Promise<void> {
		return this.customerRepository.delete(id)
	}
}
