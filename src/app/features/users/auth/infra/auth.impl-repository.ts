import { Injectable, inject } from '@angular/core'

import { catchError, firstValueFrom } from 'rxjs'

import { HttpService } from '@core/http'
import { CatchErrors } from '@core/utils'

import { Auth, AuthRepository } from '../domain'

@Injectable()
export class AuthImplRepository implements AuthRepository {
	private readonly http = inject(HttpService)
	private readonly path = 'auth'

	forgotPassword(email: string): Promise<void> {
		const resp = this.http
			.post<void>(`${this.path}/forgot-password`, { email })
			.pipe(catchError(CatchErrors.handle))

		return firstValueFrom(resp)
	}
	login(email: string, password: string): Promise<Auth> {
		const resp = this.http
			.post<Auth>(`${this.path}/login`, { email, password })
			.pipe(catchError(CatchErrors.handle))

		return firstValueFrom(resp)
	}
	logout(): Promise<void> {
		const resp = this.http.post<void>(`${this.path}/logout`, {}).pipe(catchError(CatchErrors.handle))

		return firstValueFrom(resp)
	}
	register(email: string, password: string): Promise<void> {
		const resp = this.http
			.post<void>(`${this.path}/register`, { email, password })
			.pipe(catchError(CatchErrors.handle))

		return firstValueFrom(resp)
	}
	resetPassword(token: string, password: string): Promise<void> {
		const resp = this.http
			.post<void>(`${this.path}/reset-password`, { token, password })
			.pipe(catchError(CatchErrors.handle))

		return firstValueFrom(resp)
	}
}
