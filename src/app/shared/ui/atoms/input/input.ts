import { Component, DestroyRef, OnInit, computed, inject, input, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { Icon } from '../icon/icon'
import { IconType } from '../icon/icon.type'
import { InputType } from './input.type'

@Component({
    selector: 'lib-ui-input',
    imports: [Icon],
    templateUrl: './input.html',
})
export class Input implements ControlValueAccessor, OnInit {
    // ── Inputs ───────────────────────────────────────────────────
    label = input<string>('')
    type = input<InputType>('text')
    placeholder = input<string>('')
    /** Error estático externo (p.ej. respuesta de API). Tiene prioridad sobre validadores. */
    error = input<string>('')
    hint = input<string>('')
    prefixIcon = input<IconType | null>(null)
    disabled = input<boolean>(false)

    // ── Dependencias ─────────────────────────────────────────────
    private ngControl = inject(NgControl, { optional: true, self: true })
    private destroyRef = inject(DestroyRef)

    // ── Estado interno ───────────────────────────────────────────
    protected value = signal<string>('')
    protected cvDisabled = signal<boolean>(false)
    protected showPassword = signal(false)
    protected uid = `input-${Math.random().toString(36).slice(2, 7)}`

    // Estado del control del formulario
    private controlTouched = signal(false)
    private controlStatus = signal<string>('VALID')

    // ── Constructor ──────────────────────────────────────────────
    constructor() {
        // Registra este componente como valueAccessor del NgControl
        // sin necesitar NG_VALUE_ACCESSOR + forwardRef
        if (this.ngControl) {
            this.ngControl.valueAccessor = this
        }
    }

    // ── Lifecycle ────────────────────────────────────────────────
    ngOnInit(): void {
        const control = this.ngControl?.control
        if (!control) return

        // Inicializa con el estado actual
        this.controlTouched.set(control.touched)
        this.controlStatus.set(control.status)

        // Reacciona a cualquier evento del control (touched, status, value)
        control.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.controlTouched.set(control.touched)
            this.controlStatus.set(control.status)
        })
    }

    // ── Computados de validación ─────────────────────────────────
    protected isDisabled = computed(() => this.disabled() || this.cvDisabled())

    protected resolvedType = computed<string>(() =>
        this.type() === 'password' && this.showPassword() ? 'text' : this.type(),
    )

    /** Muestra error si hay error externo O si el control está tocado e inválido */
    protected showError = computed(
        () => !!this.error() || (this.controlTouched() && this.controlStatus() === 'INVALID'),
    )

    /** Muestra estado válido si el control fue tocado y es válido (sin error externo) */
    protected showValid = computed(
        () => !this.error() && this.controlTouched() && this.controlStatus() === 'VALID',
    )

    /** Mensaje de error: prioriza error externo, luego mapea los validadores de Angular */
    protected errorMessage = computed<string>(() => {
        if (this.error()) return this.error()

        if (!this.controlTouched()) return ''

        const errors = this.ngControl?.control?.errors
        if (!errors) return ''

        if (errors['required']) return 'Este campo es requerido'
        if (errors['email']) return 'Ingresa un correo electrónico válido'
        if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`
        if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`
        if (errors['min']) return `El valor mínimo es ${errors['min'].min}`
        if (errors['max']) return `El valor máximo es ${errors['max'].max}`
        if (errors['pattern']) return 'El formato ingresado no es válido'

        return 'Campo inválido'
    })

    // ── ControlValueAccessor ─────────────────────────────────────
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
