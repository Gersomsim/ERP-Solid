import { Injectable, inject } from '@angular/core'

import { firstValueFrom, map } from 'rxjs'

import { HttpService } from '@core/http'

import { PaginateDto, QueryRequestDto } from '@features/common/dto'

import { CreateSaleAgentDto, SaleAgent, SaleAgentRepository } from '../domain'

@Injectable()
export class SaleAgentImplRepository implements SaleAgentRepository {
	private readonly path = '/sale-agents'
	private readonly http = inject(HttpService)

	getAll(query: QueryRequestDto): Promise<PaginateDto<SaleAgent>> {
		const filtres = query as Record<string, string | number | boolean>
		const response = this.http.get<SaleAgent[]>(this.path, { params: filtres }).pipe(
			map(response => {
				return {
					data: response.data,
					pagination: response.meta.pagination!,
				}
			}),
		)
		return firstValueFrom(response)
	}

	getById(id: string): Promise<SaleAgent> {
		const response = this.http.get<SaleAgent>(`${this.path}/${id}`).pipe(map(response => response.data))
		return firstValueFrom(response)
	}

	create(saleAgent: CreateSaleAgentDto): Promise<SaleAgent> {
		const response = this.http.post<SaleAgent>(this.path, saleAgent).pipe(map(response => response.data))
		return firstValueFrom(response)
	}

	update(saleAgent: SaleAgent): Promise<SaleAgent> {
		const response = this.http
			.patch<SaleAgent>(`${this.path}/${saleAgent.id}`, saleAgent)
			.pipe(map(response => response.data))
		return firstValueFrom(response)
	}

	delete(id: string): Promise<void> {
		const response = this.http.delete<void>(`${this.path}/${id}`).pipe(map(response => response.data))
		return firstValueFrom(response)
	}
}
