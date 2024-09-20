import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { EventAcquisitionComponent } from './pages/event-acquisition/event-acquisition.component';

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

