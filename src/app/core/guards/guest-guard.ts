import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

import { AuthState } from '@core/auth'

export const guestGuard: CanActivateFn = (route, state) => {
	const authState = inject(AuthState)
	const router = inject(Router)

	if (authState.isAuthenticated()) {
		router.navigate(['load-data'])
		return false
	}

	return true
}
