export type StepStatus = 'pending' | 'running' | 'done' | 'error'

export interface ProcessStep {
    label: string
    fn: () => Promise<unknown>
}

export interface StepState {
    label: string
    status: StepStatus
}
