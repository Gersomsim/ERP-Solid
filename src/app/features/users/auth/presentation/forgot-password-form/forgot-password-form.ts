import { Component, inject, output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { Button, Input } from '@ui/atoms'

@Component({
	selector: 'app-forgot-password-form',
	imports: [ReactiveFormsModule, Button, Input],
	templateUrl: './forgot-password-form.html',
	styles: ``,
})
export class ForgotPasswordForm {
	private readonly fb = inject(FormBuilder)

	onSubmit = output<string>()

	form = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
	})

	protected submit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		this.onSubmit.emit(this.form.value.email!)
	}
}
