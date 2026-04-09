import { Route } from '@angular/router'

export const SaleRoutes: Route[] = [
	{
		path: 'customer',
		loadChildren: () => import('./customer/customer.route').then(m => m.CustomerRoutes),
	},
	{
		path: 'sale-agents',
		loadChildren: () => import('./sale-agent/sale-agent.routes').then(m => m.SaleAgentRoutes),
	},
]
