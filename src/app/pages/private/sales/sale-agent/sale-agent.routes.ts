import { Route } from '@angular/router'

export const SaleAgentRoutes: Route[] = [
	{
		path: 'list',
		loadComponent: () => import('./sale-agent-list-page/sale-agent-list-page').then(m => m.SaleAgentListPage),
	},
	{
		path: 'new',
		loadComponent: () => import('./sale-agent-create-page/sale-agent-create-page').then(m => m.SaleAgentCreatePage),
	},
	{
		path: 'edit/:id',
		loadComponent: () => import('./sale-agent-edit-page/sale-agent-edit-page').then(m => m.SaleAgentEditPage),
	},
	{
		path: 'detail/:id',
		loadComponent: () => import('./sale-agent-detail-page/sale-agent-detail-page').then(m => m.SaleAgentDetailPage),
	},
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full',
	},
]
