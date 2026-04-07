import { Injectable, inject } from '@angular/core'

import { Auth, AuthRepository } from '../domain'
import { AuthToken } from '../infra'

@Injectable()
export class LoginUseCase {
	private readonly authRepository = inject<AuthRepository>(AuthToken)

	execute(email: string, password: string): Promise<Auth> {
		return this.authRepository.login(email, password)
	}
}
