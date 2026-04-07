import { Injectable, inject } from '@angular/core'

import { AuthRepository } from '../domain'
import { AuthToken } from '../infra'

@Injectable()
export class ResetPasswordUseCase {
	private readonly authRepository = inject<AuthRepository>(AuthToken)

	execute(token: string, password: string): Promise<void> {
		return this.authRepository.resetPassword(token, password)
	}
}
