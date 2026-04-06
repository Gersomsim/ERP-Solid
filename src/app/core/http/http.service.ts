import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'

import { Observable } from 'rxjs'

import { environment } from '@env/environment'

export interface RequestOptions {
    params?: Record<string, string | number | boolean>
    headers?: Record<string, string>
    withCredentials?: boolean
}

@Injectable({ providedIn: 'root' })
export class HttpService {
    private readonly baseUrl = environment.baseUrl
    private readonly http = inject(HttpClient)

    get<T>(url: string, options?: RequestOptions): Observable<T> {
        return this.http.get<T>(this.buildUrl(url), this.buildOptions(options))
    }

    post<T>(url: string, body: unknown, options?: RequestOptions): Observable<T> {
        return this.http.post<T>(this.buildUrl(url), body, this.buildOptions(options))
    }

    put<T>(url: string, body: unknown, options?: RequestOptions): Observable<T> {
        return this.http.put<T>(this.buildUrl(url), body, this.buildOptions(options))
    }

    patch<T>(url: string, body: unknown, options?: RequestOptions): Observable<T> {
        return this.http.patch<T>(this.buildUrl(url), body, this.buildOptions(options))
    }

    delete<T>(url: string, options?: RequestOptions): Observable<T> {
        return this.http.delete<T>(this.buildUrl(url), this.buildOptions(options))
    }

    private buildUrl(url: string): string {
        const base = this.baseUrl.replace(/\/$/, '')
        const path = url.replace(/^\//, '')
        return `${base}/${path}`
    }

    private buildOptions(options?: RequestOptions): object {
        const params = options?.params
            ? new HttpParams({ fromObject: options.params as Record<string, string> })
            : undefined

        return {
            params,
            headers: options?.headers,
            withCredentials: options?.withCredentials ?? true,
        }
    }
}
