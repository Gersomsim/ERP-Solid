import { Route } from '@angular/router'

import { LoadDataPage } from '@pages/private/load-data-page/load-data-page'

export const publicRoutes: Route[] = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
	},
	{
		path: 'load-data',
		component: LoadDataPage,
	},
	{
		path: '**',
		redirectTo: 'auth/login',
		pathMatch: 'full',
	},
]
