import {Routes} from "@angular/router";

export default [
    {
        path: 'sign-in',
        loadComponent: () => import('./sing-in/sing-in.component'),
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./sing-up/sing-up.component'),
    },
    {
        path: 'Ejemplo1',
        loadComponent: () => import('./formularios/ejemplo1/ejemplo1.component'),
    },
    
] as Routes;
