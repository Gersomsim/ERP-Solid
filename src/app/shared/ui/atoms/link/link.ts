import { Component, computed, input } from '@angular/core'
import { RouterLink } from '@angular/router'

import { ButtonSize, ButtonVariant } from '../button/button.type'
import { Icon } from '../icon/icon'
import { LinkType } from './link.type'

/**
 * Componente polimórfico: renderiza como <a [routerLink]> cuando se le pasa `link`,
 * como <a [href]> cuando se le pasa `href`, o como <button> en caso contrario.
 * Comparte los mismos estilos y variantes que Button.
 */
@Component({
	selector: 'lib-ui-link',
	imports: [RouterLink, Icon],
	templateUrl: './link.html',
})
export class Link {
	variant = input<ButtonVariant>('primary')
	size = input<ButtonSize>('md')
	type = input<LinkType>('link')
	fullWidth = input<boolean>(false)
	disabled = input<boolean>(false)
	loading = input<boolean>(false)

	link = input<string | string[] | null>(null)

	protected iconSize = computed<number>(() => ({ sm: 14, md: 16, lg: 18 })[this.size()])

	protected classes = computed<string>(() => {
		const base = [
			'inline-flex items-center justify-center gap-2 font-medium rounded-lg',
			'transition-colors duration-150 cursor-pointer',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
			'disabled:opacity-50 disabled:cursor-not-allowed',
			this.fullWidth() ? 'w-full' : '',
		]

		const sizes: Record<ButtonSize, string> = {
			sm: 'h-8 px-3 text-xs',
			md: 'h-10 px-4 text-sm',
			lg: 'h-12 px-6 text-base',
		}

		const variants: Record<ButtonVariant, string> = {
			primary: [
				'bg-primary-800 text-white',
				'hover:bg-primary-700',
				'focus-visible:ring-primary-800',
				'dark:bg-primary-700 dark:hover:bg-primary-600',
				'dark:focus-visible:ring-primary-700',
			].join(' '),
			secondary: [
				'bg-surface-100 text-surface-700 border border-surface-200',
				'hover:bg-surface-200',
				'focus-visible:ring-surface-300',
				'dark:bg-surface-800 dark:text-surface-200 dark:border-surface-700',
				'dark:hover:bg-surface-700',
			].join(' '),
			ghost: [
				'bg-transparent text-surface-600',
				'hover:bg-surface-100 hover:text-surface-800',
				'focus-visible:ring-surface-300',
				'dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-200',
			].join(' '),
			danger: [
				'bg-danger-500 text-white',
				'hover:bg-danger-600',
				'focus-visible:ring-danger-500',
				'dark:bg-danger-600 dark:hover:bg-danger-700',
			].join(' '),
		}

		return [...base, sizes[this.size()], variants[this.variant()]].join(' ')
	})
}
