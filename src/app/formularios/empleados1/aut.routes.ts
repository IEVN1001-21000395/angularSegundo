import {Routes} from "@angular/router";

export default[
    {
        path: 'empleados1',
        loadComponent:()=>import('./empleados1.component'),
    },
    
]as Routes