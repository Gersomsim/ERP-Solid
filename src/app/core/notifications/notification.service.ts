import { Injectable, signal } from '@angular/core'

import { Notification, NotificationType } from './notification.model'

const DEFAULTS: Record<NotificationType, number> = {
    success: 4000,
    info: 4000,
    warning: 6000,
    error: 8000,
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
    readonly notifications = signal<Notification[]>([])

    success(message: string, duration = DEFAULTS.success): void {
        this.add('success', message, duration)
    }

    error(message: string, duration = DEFAULTS.error): void {
        this.add('error', message, duration)
    }

    warning(message: string, duration = DEFAULTS.warning): void {
        this.add('warning', message, duration)
    }

    info(message: string, duration = DEFAULTS.info): void {
        this.add('info', message, duration)
    }

    dismiss(id: string): void {
        this.notifications.update(list => list.filter(n => n.id !== id))
    }

    private add(type: NotificationType, message: string, duration: number): void {
        const id = crypto.randomUUID()
        this.notifications.update(list => [...list, { id, type, message, duration }])
        setTimeout(() => this.dismiss(id), duration)
    }
}
