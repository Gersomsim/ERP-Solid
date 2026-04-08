import { Component } from '@angular/core'

@Component({
    selector: 'lib-ui-main-container',
    template: `
        <div class="p-6 max-w-7xl mx-auto">
            <ng-content />
        </div>
    `,
})
export class MainContainer {}
