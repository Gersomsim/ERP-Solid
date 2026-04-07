import { Injectable, signal } from '@angular/core'

const STORAGE_KEY = 'erp-theme'

@Injectable({ providedIn: 'root' })
export class ThemeService {
    isDark = signal(false)

    private readonly _mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    init(): void {
        const stored = localStorage.getItem(STORAGE_KEY)
        const dark = stored !== null ? stored === 'dark' : this._mediaQuery.matches

        this.apply(dark, false)

        // Escuchar cambios del sistema solo cuando el usuario no ha elegido manualmente
        this._mediaQuery.addEventListener('change', e => {
            if (localStorage.getItem(STORAGE_KEY) === null) {
                this.apply(e.matches, false)
            }
        })
    }

    toggle(): void {
        this.apply(!this.isDark(), true)
    }

    private apply(dark: boolean, persist: boolean): void {
        this.isDark.set(dark)
        document.documentElement.classList.toggle('dark', dark)

        if (persist) {
            localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
        }
    }
}
