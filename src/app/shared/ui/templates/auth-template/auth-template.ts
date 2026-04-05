import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { ThemeService } from '@core/theme'

import { Icon } from '../../atoms/icon/icon'
import { IconType } from '../../atoms/icon/icon.type'

interface Feature {
    icon: IconType
    label: string
}

@Component({
    selector: 'app-auth-template',
    imports: [RouterOutlet, Icon],
    templateUrl: './auth-template.html',
})
export class AuthTemplate {
    theme = inject(ThemeService)

    protected currentYear = new Date().getFullYear()

    protected features: Feature[] = [
        { icon: 'chart-area', label: 'Analíticas en tiempo real' },
        { icon: 'users', label: 'Gestión de equipos y roles' },
        { icon: 'shield-check', label: 'Seguridad y auditoría completa' },
        { icon: 'zap', label: 'Operaciones sin fricciones' },
    ]
}
