import { Injectable, inject } from '@angular/core'

import { catchError, firstValueFrom, map } from 'rxjs'

import { HttpService } from '@core/http'
import { CatchErrors } from '@core/utils'

import { UserMap } from '@features/users/user/infra'

import { Auth, AuthRepository } from '../domain'
import { AuthDto } from './auth.dto'
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
		const resp = this.http.post<AuthDto>(`${this.path}/login`, { email, password }).pipe(
			catchError(CatchErrors.handle),
			map(resp => {
				return {
					token: resp.data.token,
					user: UserMap.toDomain(resp.data.user),
				}
			}),
		)

		return firstValueFrom(resp)
	}
	refreshToken(): Promise<Auth> {
		const resp = this.http
			.post<AuthDto>(`${this.path}/refresh`, {}, { skipAuth: true, silent: true, withCredentials: true })
			.pipe(
				catchError(CatchErrors.handle),
				map(resp => ({
					token: resp.data.token,
					user: UserMap.toDomain(resp.data.user),
				})),
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
	/*
	El path es token/validate ya que pertenece a otro recurso de la api
	*/
	validateToken(token: string, type: string): Promise<boolean> {
		const resp = this.http.post<TokenDto>(`token/validate`, { token, type }).pipe(
			catchError(CatchErrors.handle),
			map(resp => resp.data.valid),
		)

		return firstValueFrom(resp)
	}
}
