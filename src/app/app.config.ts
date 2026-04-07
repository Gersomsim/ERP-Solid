import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'

import { authInterceptor } from '@core/interceptors/auth-interceptor'
import { notificationInterceptor } from '@core/interceptors/notification-interceptor'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideHttpClient(withInterceptors([authInterceptor, notificationInterceptor])),
	],
}
