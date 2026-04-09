import { Injectable, inject } from '@angular/core'

import { firstValueFrom, map } from 'rxjs'

import { HttpService } from '@core/http'

import { CreateSaleAgentDto, SaleAgent, SaleAgentRepository } from '../domain'

@Injectable()
export class SaleAgentImplRepository implements SaleAgentRepository {
	private readonly path = '/sale-agents'
	private readonly http = inject(HttpService)

	getAll(): Promise<SaleAgent[]> {
		const response = this.http.get<SaleAgent[]>(this.path).pipe(map(response => response.data))
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
