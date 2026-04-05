import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { ThemeService } from '@core/theme'

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App implements OnInit {
    private theme = inject(ThemeService)

    ngOnInit(): void {
        this.theme.init()
    }
}
