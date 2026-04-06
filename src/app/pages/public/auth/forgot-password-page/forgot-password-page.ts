import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { ForgotPasswordForm } from 'src/app/features/users/auth/presentation'

import { Button } from '@ui/atoms/button/button'
import { Icon } from '@ui/atoms/icon/icon'

@Component({
	selector: 'app-forgot-password-page',
	imports: [RouterLink, Button, Icon, ForgotPasswordForm],
	templateUrl: './forgot-password-page.html',
})
export class ForgotPasswordPage {
	protected submitted = signal(false)

	submit(email: string): void {
		this.submitted.set(true)
	}

	protected resend(): void {
		this.submitted.set(false)
	}
}
