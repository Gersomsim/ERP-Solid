import { Component, inject } from '@angular/core'

import { ProcessLoaderService } from '@core/process-loader'
import { StepStatus } from '@core/process-loader/process-loader.model'

import { Icon } from '../../atoms/icon/icon'
import { IconType } from '../../atoms/icon/icon.type'

@Component({
    selector: 'app-process-loader',
    imports: [Icon],
    templateUrl: './process-loader.html',
})
export class ProcessLoader {
    protected loader = inject(ProcessLoaderService)

    protected iconFor(status: StepStatus): IconType {
        const icons: Record<StepStatus, IconType> = {
            pending: 'circle-user-round',
            running: 'loader-circle',
            done: 'circle-check',
            error: 'circle-alert',
        }
        return icons[status]
    }

    protected trackByIndex(index: number): number {
        return index
    }
}
