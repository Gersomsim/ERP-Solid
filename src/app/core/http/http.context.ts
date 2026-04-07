import { HttpContextToken } from '@angular/common/http'

/** Suprime todas las notificaciones de este request (éxito y error) */
export const HTTP_SILENT = new HttpContextToken<boolean>(() => false)

/** Controla si se muestra notificación de éxito. Default: true en mutaciones */
export const HTTP_NOTIFY_SUCCESS = new HttpContextToken<boolean>(() => true)

/** Controla si se muestra notificación de error. Default: true */
export const HTTP_NOTIFY_ERROR = new HttpContextToken<boolean>(() => true)

/** Omite el interceptor de auth (usado en la llamada de refresh token) */
export const HTTP_SKIP_AUTH = new HttpContextToken<boolean>(() => false)
