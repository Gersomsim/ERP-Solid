import { Routes } from '@angular/router'

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/public/public.route').then(m => m.publicRoutes),
	},
	{
		path: ':tenantSlug',
		loadChildren: () => import('./pages/private/private.route').then(m => m.privateRoutes),
	},
]
