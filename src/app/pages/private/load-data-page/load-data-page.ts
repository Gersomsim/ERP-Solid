import { Component } from '@angular/core'

import { Icon } from '@ui/atoms'
import { SystemTemplate } from '@ui/templates'

@Component({
	selector: 'app-load-data-page',
	imports: [SystemTemplate, Icon],
	templateUrl: './load-data-page.html',
	styles: ``,
})
export class LoadDataPage {
	protected readonly steps = [
		'Verificando credenciales',
		'Cargando tenant',
		'Sincronizando permisos',
		'Preparando módulos',
	]
}
