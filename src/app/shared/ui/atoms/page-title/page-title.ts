import { Component } from '@angular/core'

@Component({
    selector: 'lib-ui-page-title',
    template: `
        <div>
            <h1 class="text-xl font-semibold text-surface-900 dark:text-surface-50">
                <ng-content />
            </h1>
            <p class="mt-0.5 text-sm text-surface-500 dark:text-surface-400">
                <ng-content select="[subtitle]" />
            </p>
        </div>
    `,
})
export class PageTitle {}
