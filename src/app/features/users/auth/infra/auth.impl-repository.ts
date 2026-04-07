import { Injectable, inject } from '@angular/core'

import { catchError, firstValueFrom, map } from 'rxjs'

import { HttpService } from '@core/http'
import { CatchErrors } from '@core/utils'

import { Auth, AuthRepository } from '../domain'
import { TokenDto } from './token.dto'

@Injectable()
export class AuthImplRepository implements AuthRepository {
	private readonly http = inject(HttpService)
	private readonly path = 'auth'

	forgotPassword(email: string): Promise<void> {
		const resp = this.http.post<void>(`${this.path}/forgot-password`, { email }, { withCredentials: false }).pipe(
			catchError(CatchErrors.handle),
			map(resp => resp.data),
		)

		return firstValueFrom(resp)
	}
	login(email: string, password: string): Promise<Auth> {
		const resp = this.http.post<Auth>(`${this.path}/login`, { email, password }).pipe(
			catchError(CatchErrors.handle),
			map(resp => resp.data),
		)

		return firstValueFrom(resp)
	}
	logout(): Promise<void> {
		const resp = this.http.post<void>(`${this.path}/logout`, {}).pipe(
			catchError(CatchErrors.handle),
			map(resp => resp.data),
		)

		return firstValueFrom(resp)
	}
	register(email: string, password: string): Promise<void> {
		const resp = this.http.post<void>(`${this.path}/register`, { email, password }).pipe(
			catchError(CatchErrors.handle),
			map(resp => resp.data),
		)

		return firstValueFrom(resp)
	}
	resetPassword(token: string, password: string): Promise<void> {
		const resp = this.http.post<void>(`${this.path}/reset-password`, { token, password }).pipe(
			catchError(CatchErrors.handle),
			map(resp => resp.data),
		)

		return firstValueFrom(resp)
	}

	validateToken(token: string, type: string): Promise<boolean> {
		const resp = this.http.post<TokenDto>(`token/validate`, { token, type }).pipe(
			catchError(CatchErrors.handle),
			map(resp => resp.data.valid),
		)

		return firstValueFrom(resp)
	}
}
