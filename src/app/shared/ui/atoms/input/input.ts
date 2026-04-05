import { Component, computed, forwardRef, input, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { Icon } from '../icon/icon'
import { IconType } from '../icon/icon.type'
import { InputType } from './input.type'

@Component({
    selector: 'lib-ui-input',
    imports: [Icon],
    templateUrl: './input.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Input),
            multi: true,
        },
    ],
})
export class Input implements ControlValueAccessor {
    label = input<string>('')
    type = input<InputType>('text')
    placeholder = input<string>('')
    error = input<string>('')
    hint = input<string>('')
    prefixIcon = input<IconType | null>(null)
    disabled = input<boolean>(false)

    protected value = signal<string>('')
    protected cvDisabled = signal<boolean>(false)
    protected showPassword = signal(false)
    protected uid = `input-${Math.random().toString(36).slice(2, 7)}`

    protected isDisabled = computed(() => this.disabled() || this.cvDisabled())

    protected resolvedType = computed<string>(() =>
        this.type() === 'password' && this.showPassword() ? 'text' : this.type(),
    )

    private onChange: (value: string) => void = () => {}
    private onTouched: () => void = () => {}

    writeValue(value: string): void {
        this.value.set(value ?? '')
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn
    }

    setDisabledState(isDisabled: boolean): void {
        this.cvDisabled.set(isDisabled)
    }

    protected onInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value
        this.value.set(value)
        this.onChange(value)
    }

    protected onBlur(): void {
        this.onTouched()
    }

    protected togglePassword(): void {
        this.showPassword.update(v => !v)
    }
}
