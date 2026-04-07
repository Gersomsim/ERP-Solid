import { Route } from '@angular/router'

import { SystemTemplate } from '@ui/templates'

import { DashboardPage } from './dashboard-page/dashboard-page'

export const privateRoutes: Route[] = [
	{
		path: '',
		component: SystemTemplate,
		children: [
			{
				path: 'dashboard',
				component: DashboardPage,
			},
			{
				path: '**',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
		],
	},
]
