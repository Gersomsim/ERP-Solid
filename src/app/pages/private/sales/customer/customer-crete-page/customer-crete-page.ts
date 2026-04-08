import { Component, signal } from '@angular/core'
import { Router } from '@angular/router'
import { inject } from '@angular/core'

import { Icon } from '@ui/atoms/icon/icon'
import { Link, PageTitle } from '@ui/atoms'
import { MainContainer } from '@ui/templates/main-container/main-container'

import { CustomerForm, CustomerFormValue } from '@features/sales/customer/presentation/customer-form/customer-form'

@Component({
    selector: 'app-customer-crete-page',
    imports: [Link, Icon, PageTitle, CustomerForm, MainContainer],
    templateUrl: './customer-crete-page.html',
})
export class CustomerCretePage {
    private readonly router = inject(Router)

    protected loading = signal(false)

    protected async onSubmit(value: CustomerFormValue): Promise<void> {
        this.loading.set(true)
        try {
            // TODO: llamar al use case de creación
            console.log('create customer', value)
            this.router.navigate(['/private/sales/customer/list'])
        } finally {
            this.loading.set(false)
        }
    }

    protected onCancel(): void {
        this.router.navigate(['/private/sales/customer/list'])
    }
}
