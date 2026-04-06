import { Component, inject, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { NotificationService } from '@core/notifications'

import { Button, Icon } from '@ui/atoms'

import { ForgotPasswordUseCase } from '@features/users/auth/app'
import { AuthTokenProvider } from '@features/users/auth/infra'
import { ForgotPasswordForm } from '@features/users/auth/presentation'

@Component({
	selector: 'app-forgot-password-page',
	imports: [RouterLink, Button, Icon, ForgotPasswordForm],
	templateUrl: './forgot-password-page.html',
	providers: [ForgotPasswordUseCase, AuthTokenProvider],
})
export class ForgotPasswordPage {
	private readonly forgotPasswordUseCase = inject(ForgotPasswordUseCase)
	private readonly notification = inject(NotificationService)

	protected submitted = signal(false)
	protected loading = signal(false)

	async submit(email: string): Promise<void> {
		try {
			this.loading.set(true)
			await this.forgotPasswordUseCase.execute(email)
			this.submitted.set(true)
		} catch (error) {
			console.error(error)
		} finally {
			this.loading.set(false)
		}
	}

	protected resend(): void {
		this.submitted.set(false)
	}
}
