import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { from, switchMap, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { AuthState } from '@core/auth'
import { HTTP_SKIP_AUTH } from '@core/http/http.context'
import { AuthToken } from '@features/users/auth/infra'

// Compartido entre todas las invocaciones para evitar llamadas paralelas al
// endpoint de refresh cuando hay múltiples 401 simultáneos
let refreshInProgress: Promise<string> | null = null

const addBearer = <T>(req: HttpRequest<T>, token: string): HttpRequest<T> =>
	req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	if (req.context.get(HTTP_SKIP_AUTH)) return next(req)

	const authState = inject(AuthState)
	const authRepo = inject(AuthToken)
	const router = inject(Router)

	const token = authState.token()

	return next(token ? addBearer(req, token) : req).pipe(
		catchError((error: unknown) => {
			if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
				return throwError(() => error)
			}

			// Si no hay usuario en estado, no tiene sentido intentar el refresh
			if (!authState.user()) {
				router.navigate(['/auth/login'])
				return throwError(() => error)
			}

			// Los requests 401 simultáneos esperan el mismo refresh en lugar de
			// lanzar llamadas duplicadas al endpoint
			if (!refreshInProgress) {
				refreshInProgress = authRepo
					.refreshToken()
					.then(auth => {
						authState.setToken(auth.token)
						return auth.token
					})
					.catch(err => {
						authState.clear()
						router.navigate(['/auth/login'])
						throw err
					})
					.finally(() => {
						refreshInProgress = null
					})
			}

			return from(refreshInProgress).pipe(
				switchMap(newToken => next(addBearer(req, newToken))),
				catchError(err => throwError(() => err)),
			)
		}),
	)
}
