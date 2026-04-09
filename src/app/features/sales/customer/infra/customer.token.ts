import { InjectionToken, Provider } from '@angular/core'

import { CustomerRepository } from '../domain'
import { CustomerImplRepository } from './customer.impl-repository'

export const CustomerToken = new InjectionToken<CustomerRepository>('CustomerRepository')

export const CustomerProvider: Provider = {
	provide: CustomerToken,
	useClass: CustomerImplRepository,
}
