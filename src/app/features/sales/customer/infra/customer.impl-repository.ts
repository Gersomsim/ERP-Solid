import { Injectable, inject } from '@angular/core'

import { firstValueFrom, map } from 'rxjs'

import { HttpService } from '@core/http'

import { QueryRequestDto } from '@features/common/dto'
import { PaginateDto } from '@features/common/dto/paginate.dto'

import { CreateCustomerDto, Customer, CustomerRepository } from '../domain'

@Injectable()
export class CustomerImplRepository implements CustomerRepository {
	private readonly path = '/customers'
	private readonly http = inject(HttpService)

	getAll(query?: QueryRequestDto): Promise<PaginateDto<Customer>> {
		const filters = query as Record<string, string>
		const response = this.http.get<Customer[]>(this.path, { withCredentials: true, params: filters }).pipe(
			map(response => {
				return {
					data: response.data,
					pagination: response.meta.pagination!,
				}
			}),
		)
		return firstValueFrom(response)
	}
	getById(id: string): Promise<Customer> {
		const response = this.http.get<Customer>(`${this.path}/${id}`).pipe(map(response => response.data))
		return firstValueFrom(response)
	}
	create(customer: CreateCustomerDto): Promise<Customer> {
		const response = this.http.post<Customer>(this.path, customer).pipe(map(response => response.data))
		return firstValueFrom(response)
	}
	update(customer: Customer): Promise<Customer> {
		const response = this.http
			.patch<Customer>(`${this.path}/${customer.id}`, customer)
			.pipe(map(response => response.data))
		return firstValueFrom(response)
	}
	delete(id: string): Promise<void> {
		const response = this.http.delete<void>(`${this.path}/${id}`).pipe(map(response => response.data))
		return firstValueFrom(response)
	}
}
