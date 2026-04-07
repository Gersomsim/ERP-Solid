import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

import { AuthState } from '@core/auth'

export const authGuard: CanActivateFn = (route, state) => {
	const authState = inject(AuthState)
	const router = inject(Router)

	if (authState.isAuthenticated()) {
		return true
	}

	router.navigate(['/auth/login'])
	return false
}
