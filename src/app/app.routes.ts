import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./auth/features/aut.routes')
    },
    {
        path: 'Ejemplo1',
        loadChildren: () => import('./auth/features/aut.routes')
    }
];
