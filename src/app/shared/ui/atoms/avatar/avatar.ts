import { Component, computed, input } from '@angular/core'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

@Component({
    selector: 'lib-ui-avatar',
    template: `
        <div [class]="containerClasses()">
            <span [class]="textClasses()">{{ initials() }}</span>
        </div>
    `,
})
export class Avatar {
    name = input.required<string>()
    size = input<AvatarSize>('md')

    protected initials = computed<string>(() => {
        const words = this.name().trim().split(/\s+/).filter(Boolean)
        if (words.length === 1) {
            return words[0].slice(0, 2).toUpperCase()
        }
        return (words[0][0] + words[1][0]).toUpperCase()
    })

    protected containerClasses = computed<string>(() => {
        const sizes: Record<AvatarSize, string> = {
            sm: 'w-6 h-6',
            md: 'w-8 h-8',
            lg: 'w-10 h-10',
            xl: 'w-12 h-12',
        }
        return [
            sizes[this.size()],
            'rounded-full flex items-center justify-center flex-shrink-0',
            'bg-primary-100 dark:bg-primary-900/40',
        ].join(' ')
    })

    protected textClasses = computed<string>(() => {
        const sizes: Record<AvatarSize, string> = {
            sm: 'text-[9px]',
            md: 'text-xs',
            lg: 'text-sm',
            xl: 'text-base',
        }
        return [sizes[this.size()], 'font-semibold text-primary-700 dark:text-primary-400'].join(' ')
    })
}
