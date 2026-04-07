import { Component, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'

import { AuthState } from '@core/auth/auth.state'

import { LoginUseCase } from '@features/users/auth/app'
import { AuthTokenProvider } from '@features/users/auth/infra'
import { LoginForm } from '@features/users/auth/presentation'

@Component({
	selector: 'app-login-page',
	imports: [RouterLink, LoginForm],
	templateUrl: './login-page.html',
	providers: [LoginUseCase, AuthTokenProvider],
})
export class LoginPage {
	private readonly router = inject(Router)
	private readonly loginUseCase = inject(LoginUseCase)
	private readonly authState = inject(AuthState)

	loading = signal<boolean>(false)

	async submit(login: { email: string; password: string }): Promise<void> {
		this.loading.set(true)
		try {
			const auth = await this.loginUseCase.execute(login.email, login.password)
			this.authState.setAuth(auth)

			this.router.navigate(['/load-data'])
		} catch (error) {
		} finally {
			this.loading.set(false)
		}
	}
}
