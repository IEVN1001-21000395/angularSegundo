import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./auth/features/aut.routes')
    },
    {
        path:'formulario',
        loadChildren:()=> import('./formularios/ejemplo1/aut.routes')
    },
    {
    path: 'formulario',
    loadChildren: () => import('./formularios/resistencia/autresistencia.routes')
    },
    {
    path: 'formulario',
    loadChildren: () => import('./formularios/empleados1/aut.routes')
    }

];

