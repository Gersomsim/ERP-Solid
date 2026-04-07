import { Component, inject, input, output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { Button, Input } from '@ui/atoms'

@Component({
	selector: 'app-login-form',
	imports: [Input, Button, ReactiveFormsModule],
	templateUrl: './login-form.html',
	styles: ``,
})
export class LoginForm {
	private readonly fb = inject(FormBuilder)

	Submit = output<{ email: string; password: string }>()
	loading = input<boolean>(false)

	loginForm = this.fb.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
	})

	onSubmit() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched()
			return
		}
		const value = this.loginForm.getRawValue()
		this.Submit.emit(value)
	}
}
