import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { ThemeService } from '@core/theme'

import { NotificationToast } from '@ui/organisms/notification-toast/notification-toast'

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NotificationToast],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App implements OnInit {
    private theme = inject(ThemeService)

    ngOnInit(): void {
        this.theme.init()
    }
}
