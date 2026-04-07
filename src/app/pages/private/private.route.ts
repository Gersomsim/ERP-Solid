import { Route } from '@angular/router'

import { DashboardPage } from './dashboard-page/dashboard-page'

export const privateRoutes: Route[] = [
	{
		path: 'dashboard',
		component: DashboardPage,
	},
	{
		path: '**',
		redirectTo: 'dashboard',
		pathMatch: 'full',
	},
]
