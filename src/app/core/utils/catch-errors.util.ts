import { HttpErrorResponse } from '@angular/common/http'

import { Observable, throwError } from 'rxjs'

export interface AppError {
    status: number
    message: string
    code?: string
}

export class CatchErrors {
    /**
     * Maneja errores HTTP y los transforma en un AppError tipado.
     * Úsalo en los adapters/use-cases con catchError(CatchErrors.handle).
     *
     * El 401 NO se maneja aquí — lo intercepta el AuthInterceptor
     * que ejecuta el refresh token y reintenta el request.
     */
    static handle(error: unknown): Observable<never> {
        if (error instanceof HttpErrorResponse) {
            return throwError(() => CatchErrors.fromHttp(error))
        }

        // Error de red (sin conexión, CORS, timeout)
        if (error instanceof ProgressEvent) {
            return throwError(() => ({
                status: 0,
                message: 'Sin conexión. Verifica tu red e intenta de nuevo.',
            } satisfies AppError))
        }

        // Error desconocido
        return throwError(() => ({
            status: -1,
            message: 'Ocurrió un error inesperado.',
        } satisfies AppError))
    }

    static fromHttp(error: HttpErrorResponse): AppError {
        const serverMessage = error.error?.message ?? error.message

        const messages: Partial<Record<number, string>> = {
            400: error.error?.message ?? 'Solicitud incorrecta.',
            403: 'No tienes permisos para realizar esta acción.',
            404: 'El recurso solicitado no existe.',
            409: error.error?.message ?? 'Conflicto con el estado actual del recurso.',
            422: error.error?.message ?? 'Los datos enviados no son válidos.',
            429: 'Demasiadas solicitudes. Espera un momento e intenta de nuevo.',
            500: 'Error interno del servidor. Intenta más tarde.',
            503: 'Servicio no disponible temporalmente.',
        }

        return {
            status: error.status,
            message: messages[error.status] ?? serverMessage ?? 'Error desconocido.',
            code: error.error?.code,
        }
    }
}
