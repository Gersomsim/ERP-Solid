import { Component, computed, input } from '@angular/core'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

const PADDING_CLASSES: Record<CardPadding, string> = {
	none: '',
	sm: 'p-4',
	md: 'p-5',
	lg: 'p-6',
}

@Component({
	selector: 'lib-ui-card',
	host: { class: 'block' },
	imports: [],
	template: `
		<div
			class="rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 shadow-sm overflow-hidden"
		>
			<!-- Acento superior (e.g. barra de gradiente) -->
			<ng-content select="[card-accent]" />

			<!-- Header con border-b (lib-ui-card-header) -->
			<ng-content select="lib-ui-card-header" />

			<!-- Cuerpo principal -->
			<div [class]="bodyClass()">
				<ng-content />
			</div>
		</div>
	`,
})
export class Card {
	/** Padding interno del cuerpo. Usa 'none' cuando el contenido va de borde a borde (tablas, listas). */
	padding = input<CardPadding>('md')

	protected bodyClass = computed(() => PADDING_CLASSES[this.padding()])
}
