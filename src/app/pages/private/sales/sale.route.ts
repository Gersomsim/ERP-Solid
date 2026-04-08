import { Route } from '@angular/router'

export const SaleRoutes: Route[] = [
	{
		path: 'customer',
		loadChildren: () => import('./customer/customer.route').then(m => m.CustomerRoutes),
	},
]
