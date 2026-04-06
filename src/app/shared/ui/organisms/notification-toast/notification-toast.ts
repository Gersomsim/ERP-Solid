import { Component, inject } from '@angular/core'

import { NotificationService } from '@core/notifications'
import { Notification, NotificationType } from '@core/notifications/notification.model'

import { Icon } from '../../atoms/icon/icon'
import { IconType } from '../../atoms/icon/icon.type'

interface ToastConfig {
    icon: IconType
    borderClass: string
    iconClass: string
    progressClass: string
}

const CONFIG: Record<NotificationType, ToastConfig> = {
    success: {
        icon: 'circle-check',
        borderClass: 'border-l-success-500',
        iconClass: 'text-success-500',
        progressClass: 'bg-success-500',
    },
    error: {
        icon: 'circle-alert',
        borderClass: 'border-l-danger-500',
        iconClass: 'text-danger-500',
        progressClass: 'bg-danger-500',
    },
    warning: {
        icon: 'triangle-alert',
        borderClass: 'border-l-warning-500',
        iconClass: 'text-warning-500',
        progressClass: 'bg-warning-500',
    },
    info: {
        icon: 'info',
        borderClass: 'border-l-primary-500',
        iconClass: 'text-primary-500',
        progressClass: 'bg-primary-500',
    },
}

@Component({
    selector: 'app-notification-toast',
    imports: [Icon],
    templateUrl: './notification-toast.html',
})
export class NotificationToast {
    protected service = inject(NotificationService)

    protected config(type: NotificationType): ToastConfig {
        return CONFIG[type]
    }

    protected trackById(_: number, n: Notification): string {
        return n.id
    }
}
