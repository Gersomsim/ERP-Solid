import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'

import { DI_TOKEN } from '@core/providers'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
	providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes), ...DI_TOKEN],
}
