import { Component, input } from '@angular/core'

import { Icon } from '../../atoms/icon/icon'

@Component({
    selector: 'lib-ui-stepper',
    imports: [Icon],
    templateUrl: './stepper.html',
})
export class Stepper {
    steps = input.required<string[]>()
    currentStep = input<number>(0)
}
