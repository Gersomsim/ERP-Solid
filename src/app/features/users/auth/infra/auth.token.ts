import { InjectionToken, Provider } from '@angular/core'

import { AuthRepository } from '../domain'
import { AuthImplRepository } from './auth.impl-repository'

export const AuthToken = new InjectionToken<AuthRepository>('AuthRepository')

export const AuthTokenProvider: Provider = {
	provide: AuthToken,
	useClass: AuthImplRepository,
}
