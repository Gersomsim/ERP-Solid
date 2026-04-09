import { Component, effect, inject, input, output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'

import { Button, Input } from '@ui/atoms'

import { CreateSaleAgentDto } from '../../domain'

@Component({
	selector: 'app-sale-agent-form',
	imports: [ReactiveFormsModule, Input, Button],
	templateUrl: './sale-agent-form.html',
})
export class SaleAgentForm {
	loading = input<boolean>(false)
	initialValue = input<CreateSaleAgentDto | null>(null)

	Submit = output<CreateSaleAgentDto>()
	cancel = output<void>()

	private readonly fb = inject(FormBuilder)

	protected form = this.fb.nonNullable.group({
		name: ['', [Validators.required, Validators.maxLength(120)]],
		userId: [''],
		commissionRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
	})

	constructor() {
		effect(() => {
			const val = this.initialValue()
			if (!val) return
			this.form.patchValue({
				...val,
				commissionRate: String(val.commissionRate),
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
			userId: raw.userId || undefined,
			commissionRate: Number(raw.commissionRate),
		})
	}
}
