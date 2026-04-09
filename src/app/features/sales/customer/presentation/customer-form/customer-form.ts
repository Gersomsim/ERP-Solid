import { Component, effect, inject, input, output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { Button } from '@ui/atoms/button/button'
import { Input } from '@ui/atoms/input/input'

import { CreateCustomerDto } from '../../domain'

@Component({
	selector: 'app-customer-form',
	imports: [ReactiveFormsModule, Input, Button],
	templateUrl: './customer-form.html',
})
export class CustomerForm {
	loading = input<boolean>(false)
	initialValue = input<CreateCustomerDto | null>(null)

	Submit = output<CreateCustomerDto>()
	cancel = output<void>()

	private readonly fb = inject(FormBuilder)

	protected form = this.fb.nonNullable.group({
		// Información general
		name: ['', [Validators.required, Validators.maxLength(120)]],
		taxId: ['', [Validators.required, Validators.maxLength(20)]],
		creditLimit: ['', [Validators.required, Validators.min(0)]],
		// Contacto
		email: [''],
		phone: [''],
		// Dirección
		address: [''],
		city: [''],
		state: [''],
		zip: [''],
		country: [''],
	})

	constructor() {
		effect(() => {
			const val = this.initialValue()
			if (!val) return
			this.form.patchValue({
				...val,
				creditLimit: String(val.creditLimit),
			})
		})
	}

	protected onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched()
			return
		}
		const raw = this.form.getRawValue()
		this.Submit.emit({
			name: raw.name,
			taxId: raw.taxId,
			creditLimit: Number(raw.creditLimit),
			email: raw.email,
			phone: raw.phone,
			address: raw.address,
			city: raw.city,
			state: raw.state,
			zip: raw.zip,
			country: raw.country,
		})
	}
}
