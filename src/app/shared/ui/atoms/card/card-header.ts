import { Component } from '@angular/core'

/**
 * Header estándar para lib-ui-card.
 * Aplica el padding, border-b y layout consistentes.
 * Proyectar título a la izquierda y acciones a la derecha con flex.
 *
 * @example
 * <lib-ui-card padding="none">
 *   <lib-ui-card-header>
 *     <h3>Título</h3>
 *     <span>Acción</span>
 *   </lib-ui-card-header>
 *   <app-my-content />
 * </lib-ui-card>
 */
@Component({
	selector: 'lib-ui-card-header',
	host: { class: 'block' },
	imports: [],
	template: `
		<div
			class="px-5 py-4 border-b border-surface-100 dark:border-surface-700/60 flex items-center justify-between"
		>
			<ng-content />
		</div>
	`,
})
export class CardHeader {}
