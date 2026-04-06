import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Button } from '@ui/atoms/button/button'
import { Icon } from '@ui/atoms/icon/icon'
import { Input } from '@ui/atoms/input/input'

@Component({
    selector: 'app-reset-password-page',
    imports: [RouterLink, Button, Icon, Input],
    templateUrl: './reset-password-page.html',
})
export class ResetPasswordPage {
    protected submitted = signal(false)

    protected submit(): void {
        this.submitted.set(true)
    }
}
