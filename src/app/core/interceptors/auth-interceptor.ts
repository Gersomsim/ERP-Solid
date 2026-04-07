import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'

import { AuthState } from '@core/auth'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const token = inject(AuthState).token()

	if (!token) return next(req)

	return next(
		req.clone({
			setHeaders: { Authorization: `Bearer ${token}` },
		}),
	)
}
