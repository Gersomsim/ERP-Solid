import { Component, input, output } from '@angular/core'
import { DecimalPipe } from '@angular/common'

import { Avatar } from '@ui/atoms/avatar/avatar'
import { Icon } from '@ui/atoms/icon/icon'
import { Customer } from '../../domain/customer.model'

@Component({
    selector: 'app-customer-table',
    imports: [Avatar, DecimalPipe, Icon],
    templateUrl: './customer-table.html',
})
export class CustomerTable {
    customers = input.required<Customer[]>()
    loading = input<boolean>(false)

    view = output<Customer>()
    edit = output<Customer>()
    delete = output<Customer>()
}
