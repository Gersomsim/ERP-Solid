import { Component, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'

import { map } from 'rxjs'

import { ProcessLoaderService } from '@core/process-loader'
import { AppError } from '@core/utils'

import { Button } from '@ui/atoms/button/button'
import { Icon } from '@ui/atoms/icon/icon'

import { ResetPasswordUseCase, ValidateTokenUseCase } from '@features/users/auth/app'
import { AuthTokenProvider } from '@features/users/auth/infra'
import { RegisterForm } from '@features/users/auth/presentation'

@Component({
	selector: 'app-reset-password-page',
	imports: [RouterLink, Button, Icon, RegisterForm],
	templateUrl: './reset-password-page.html',
	providers: [ValidateTokenUseCase, AuthTokenProvider, ResetPasswordUseCase],
})
export class ResetPasswordPage {
	private readonly loader = inject(ProcessLoaderService)
	private readonly route = inject(ActivatedRoute)
	private readonly router = inject(Router)
	private readonly validateTokenUseCase = inject(ValidateTokenUseCase)
	private readonly resetPasswordUseCase = inject(ResetPasswordUseCase)

	private readonly token = toSignal(this.route.queryParams.pipe(map(params => params['token'])))
	protected submitted = signal(false)
	protected loading = signal(false)

	constructor() {
		this.loader.execute([
			{
				label: 'Validando token...',
				fn: () => this.validateToken(),
			},
		])
	}

	protected async submit(password: string): Promise<void> {
		this.loading.set(true)
		try {
			await this.resetPasswordUseCase.execute(this.token()!, password)
			this.submitted.set(true)
		} catch (error) {
			console.error(error)
		} finally {
			this.loading.set(false)
		}
	}

	async validateToken(): Promise<void> {
		try {
			await this.validateTokenUseCase.execute(this.token()!, 'reset-password')
		} catch (error) {
			const message = (error as AppError).message
			if (message === 'Token invalido') {
				this.router.navigate(['/auth/login'])
			}
		}
	}
}
