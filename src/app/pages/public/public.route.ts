import { Route } from '@angular/router'

import { authGuard, guestGuard } from '@core/guards'

import { LoadDataPage } from '@pages/private/load-data-page/load-data-page'

export const publicRoutes: Route[] = [
	{
		path: 'auth',
		canActivate: [guestGuard],
		loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
	},
	{
		path: 'load-data',
		canActivate: [authGuard],
		component: LoadDataPage,
	},
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full',
	},
]
