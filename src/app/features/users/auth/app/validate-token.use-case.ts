import { Injectable, inject } from '@angular/core'

import { AuthRepository } from '../domain'
import { AuthToken } from '../infra'

@Injectable()
export class ValidateTokenUseCase {
	private readonly authRepository = inject<AuthRepository>(AuthToken)

	execute(token: string, type: string): Promise<boolean> {
		return this.authRepository.validateToken(token, type)
	}
}
