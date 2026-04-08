import { Component, computed, input } from '@angular/core'

import type { BadgeSize, BadgeVariant } from './badge.type'

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
	default: 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400',
	primary: 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
	success: 'bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-400',
	danger: 'bg-danger-50 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400',
	warning: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
	sm: 'px-2 py-0.5 text-[10px]',
	md: 'px-2.5 py-0.5 text-xs',
}

@Component({
	selector: 'lib-ui-badge',
	imports: [],
	template: `<span [class]="classes()"><ng-content /></span>`,
})
export class Badge {
	variant = input<BadgeVariant>('default')
	size = input<BadgeSize>('md')

	protected classes = computed(
		() =>
			`inline-flex items-center rounded-full font-medium ${VARIANT_CLASSES[this.variant()]} ${SIZE_CLASSES[this.size()]}`,
	)
}
