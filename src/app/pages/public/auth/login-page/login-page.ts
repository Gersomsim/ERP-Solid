import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Button } from '@ui/atoms/button/button'
import { Input } from '@ui/atoms/input/input'

@Component({
    selector: 'app-login-page',
    imports: [RouterLink, Button, Input],
    templateUrl: './login-page.html',
})
export class LoginPage {}
