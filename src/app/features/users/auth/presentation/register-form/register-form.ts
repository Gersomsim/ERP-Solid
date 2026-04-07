import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'


import { Button, Input } from '@ui/atoms'

@Component({
	selector: 'app-register-form',
	imports: [Button, Input, ReactiveFormsModule],
	templateUrl: './register-form.html',
	styles: ``,
})
export class RegisterForm {
	
}
