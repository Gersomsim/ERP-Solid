import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Button } from '@ui/atoms/button/button'
import { Icon } from '@ui/atoms/icon/icon'
import { Input } from '@ui/atoms/input/input'
import { Stepper } from '@ui/molecules/stepper/stepper'

@Component({
    selector: 'app-register-page',
    imports: [RouterLink, Button, Icon, Input, Stepper],
    templateUrl: './register-page.html',
})
export class RegisterPage {
    protected currentStep = signal(0)
    protected steps = ['Empresa', 'Cuenta']

    protected nextStep(): void {
        if (this.currentStep() < this.steps.length - 1) {
            this.currentStep.update(s => s + 1)
        }
    }

    protected prevStep(): void {
        if (this.currentStep() > 0) {
            this.currentStep.update(s => s - 1)
        }
    }
}
