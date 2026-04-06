import { Injectable, inject } from '@angular/core'

import { AuthRepository } from '../domain'
import { AuthToken } from '../infra'

@Injectable()
export class ForgotPasswordUseCase {
	private readonly authRepository = inject<AuthRepository>(AuthToken)

	execute(email: string): Promise<void> {
		return this.authRepository.forgotPassword(email)
	}
}
