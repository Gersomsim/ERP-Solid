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
				path: '',
				loadChildren: () => import('./sales/sale.route').then(m => m.SaleRoutes),
			},
			{
				path: '**',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
		],
	},
]
