import { Component, computed, input } from '@angular/core'

import { Card } from '@ui/atoms/card/card'
import { Icon } from '@ui/atoms/icon/icon'
import { IconType } from '@ui/atoms/icon/icon.type'

export type StatCardVariant = 'default' | 'primary' | 'success' | 'danger' | 'warning'

const ICON_WRAPPER: Record<StatCardVariant, string> = {
	default: 'bg-surface-100 dark:bg-surface-800',
	primary: 'bg-primary-50 dark:bg-primary-900/30',
	success: 'bg-success-50 dark:bg-success-900/30',
	danger: 'bg-danger-50 dark:bg-danger-900/30',
	warning: 'bg-amber-50 dark:bg-amber-900/30',
}

const ICON_COLOR: Record<StatCardVariant, string> = {
	default: 'text-surface-500 dark:text-surface-400',
	primary: 'text-primary-600 dark:text-primary-400',
	success: 'text-success-600 dark:text-success-400',
	danger: 'text-danger-600 dark:text-danger-400',
	warning: 'text-amber-600 dark:text-amber-400',
}

const ACCENT_VALUE_COLOR: Record<StatCardVariant, string> = {
	default: 'text-surface-900 dark:text-surface-50',
	primary: 'text-primary-600 dark:text-primary-400',
	success: 'text-success-600 dark:text-success-400',
	danger: 'text-danger-600 dark:text-danger-400',
	warning: 'text-amber-600 dark:text-amber-400',
}

@Component({
	selector: 'lib-ui-stat-card',
	host: { class: 'block' },
	imports: [Card, Icon],
	template: `
		<lib-ui-card>
			<div class="rounded-lg p-2 w-fit" [class]="iconWrapperClass()">
				<lib-ui-icon [icon]="icon()" [size]="16" [class]="iconColorClass()" />
			</div>

			<p class="mt-4 text-2xl font-bold tabular-nums" [class]="valueClass()">
				{{ value() }}
			</p>

			<p class="mt-0.5 text-xs text-surface-500 dark:text-surface-400">
				{{ label() }}
			</p>
		</lib-ui-card>
	`,
})
export class StatCard {
	icon = input.required<IconType>()
	value = input.required<string>()
	label = input.required<string>()
	variant = input<StatCardVariant>('default')
	/** Cuando es true aplica el color del variant al valor (útil para destacar importes críticos) */
	accentValue = input<boolean>(false)

	protected iconWrapperClass = computed(() => ICON_WRAPPER[this.variant()])
	protected iconColorClass = computed(() => ICON_COLOR[this.variant()])
	protected valueClass = computed(() =>
		this.accentValue()
			? ACCENT_VALUE_COLOR[this.variant()]
			: 'text-surface-900 dark:text-surface-50',
	)
}
