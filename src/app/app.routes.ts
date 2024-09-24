import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { RegisterComponent } from './features/user-register/pages/register/register.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { UnauthorizedComponent } from './features/error/pages/unauthorized/unauthorized.component';
import { NotFoundComponent } from './features/error/pages/not-found/not-found.component';
import { LoginComponent } from './features/login/pages/login/login.component';
import { EventsComponent } from './features/events/pages/events/events.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
              path: 'login',
              component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        // canActivateChild: [authGuard, roleGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path:'events',
                component:EventsComponent
            }
        ]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];