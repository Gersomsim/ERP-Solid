import { Injectable, inject } from '@angular/core'

import { PaginateDto, QueryRequestDto } from '@features/common/dto'

import { Customer } from '../domain'
import { CustomerToken } from '../infra'

@Injectable()
export class GetCustomersUseCase {
	private readonly customerRepository = inject(CustomerToken)

	execute(query?: QueryRequestDto): Promise<PaginateDto<Customer>> {
		return this.customerRepository.getAll(query)
	}
}
