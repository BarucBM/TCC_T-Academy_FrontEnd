import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/pages/login/login.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { EventAcquisitionComponent } from './features/event-acquisition/pages/event-acquisition.component';
import { LayoutComponent } from './core/layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'event',
                component:EventAcquisitionComponent
            }
        ]
    }
];

