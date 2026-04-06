import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http'
import { inject } from '@angular/core'

import { catchError, tap, throwError } from 'rxjs'

import { ApiResponseDto } from '@core/dto'
import { HTTP_NOTIFY_ERROR, HTTP_NOTIFY_SUCCESS, HTTP_SILENT } from '@core/http/http.context'
import { NotificationService } from '@core/notifications'
import { CatchErrors } from '@core/utils'

const MUTATION_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']

function isApiResponse(body: unknown): body is ApiResponseDto<unknown> {
    return (
        typeof body === 'object' &&
        body !== null &&
        'success' in body &&
        'message' in body &&
        typeof (body as ApiResponseDto<unknown>).message === 'string'
    )
}

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {
    const notification = inject(NotificationService)

    const silent = req.context.get(HTTP_SILENT)
    const notifySuccess = req.context.get(HTTP_NOTIFY_SUCCESS)
    const notifyError = req.context.get(HTTP_NOTIFY_ERROR)
    const isMutation = MUTATION_METHODS.includes(req.method)

    return next(req).pipe(
        // ── Éxito ────────────────────────────────────────────────
        tap(event => {
            if (silent || !isMutation || !notifySuccess) return
            if (!(event instanceof HttpResponse)) return
            if (!isApiResponse(event.body)) return

            if (event.body.success && event.body.message) {
                notification.success(event.body.message)
            }

            // 2xx con success:false (backend retorna 200 con error de negocio)
            if (!event.body.success && event.body.message && notifyError) {
                notification.error(event.body.message)
            }
        }),

        // ── Error HTTP (4xx, 5xx, red) ────────────────────────────
        catchError((error: unknown) => {
            if (!silent && notifyError && error instanceof HttpErrorResponse) {
                const appError = CatchErrors.fromHttp(error)
                notification.error(appError.message)
            }

            // Relanza el error original para que catchError del repositorio
            // lo transforme en AppError tipado
            return throwError(() => error)
        }),
    )
}
