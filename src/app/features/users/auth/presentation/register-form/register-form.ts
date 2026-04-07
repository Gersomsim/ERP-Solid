import { Component, inject, input, output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { NotificationService } from '@core/notifications'

import { Button, Input } from '@ui/atoms'

@Component({
	selector: 'app-register-form',
	imports: [Button, Input, ReactiveFormsModule],
	templateUrl: './register-form.html',
	styles: ``,
})
export class RegisterForm {
	private readonly notificationService = inject(NotificationService)
	private readonly fb = inject(FormBuilder)

	Submit = output<string>()
	loading = input(false)

	protected form = this.fb.nonNullable.group({
		password: ['', Validators.required],
		confirmPassword: ['', Validators.required],
	})

	protected onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		const value = this.form.getRawValue()
		if (value.password !== value.confirmPassword) {
			this.notificationService.error('Las contraseñas no coinciden')
			return
		}
		this.Submit.emit(value.password)
	}
}
