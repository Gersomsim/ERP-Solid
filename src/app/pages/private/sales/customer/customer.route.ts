import { Route } from '@angular/router'

import { CustomerCretePage } from './customer-crete-page/customer-crete-page'
import { CustomerDetailPage } from './customer-detail-page/customer-detail-page'
import { CustomerEditPage } from './customer-edit-page/customer-edit-page'
import { CustomerListPage } from './customer-list-page/customer-list-page'

export const CustomerRoutes: Route[] = [
	{
		path: 'list',
		component: CustomerListPage,
	},
	{
		path: 'create',
		component: CustomerCretePage,
	},
	{
		path: 'edit/:id',
		component: CustomerEditPage,
	},
	{
		path: 'detail/:id',
		component: CustomerDetailPage,
	},
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full',
	},
]
