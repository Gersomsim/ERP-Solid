import { Route } from "@angular/router";

export const publicRoutes: Route[] = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: '**',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
]