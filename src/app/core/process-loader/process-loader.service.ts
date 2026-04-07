import { Injectable, signal } from '@angular/core'

import { ProcessStep, StepState } from './process-loader.model'

@Injectable({ providedIn: 'root' })
export class ProcessLoaderService {
    readonly visible = signal(false)
    readonly steps = signal<StepState[]>([])

    /**
     * Ejecuta una lista de pasos secuencialmente mostrando el overlay.
     * Si un paso falla, marca el error, espera brevemente y relanza la excepción.
     */
    async execute(steps: ProcessStep[]): Promise<void> {
        this.steps.set(steps.map(s => ({ label: s.label, status: 'pending' })))
        this.visible.set(true)

        for (let i = 0; i < steps.length; i++) {
            this.updateStep(i, 'running')

            try {
                await steps[i].fn()
                this.updateStep(i, 'done')
            } catch (error) {
                this.updateStep(i, 'error')
                steps[i].onError?.(error)
                await this.delay(1200)
                this.hide()
                throw error
            }
        }

        await this.delay(700)
        this.hide()
    }

    private updateStep(index: number, status: StepState['status']): void {
        this.steps.update(list =>
            list.map((step, i) => (i === index ? { ...step, status } : step)),
        )
    }

    private hide(): void {
        this.visible.set(false)
        this.steps.set([])
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}
