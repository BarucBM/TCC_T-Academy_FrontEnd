import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { RegisterComponent } from './features/user-register/pages/register/register.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { UnauthorizedComponent } from './features/error/pages/unauthorized/unauthorized.component';
import { NotFoundComponent } from './features/error/pages/not-found/not-found.component';
import { LoginComponent } from './features/login/pages/login/login.component';
import { EventAcquisitionComponent } from './features/event-acquisition/pages/event-acquisition.component';
import { EventsComponent } from './features/events/pages/events/events.component';
import { CartPageComponent } from './features/cart/pages/cart-page/cart-page.component';
import { CreateEventComponent } from './features/events/pages/create-event/create-event.component';
import { FormStepBasicComponent } from './features/events/components/form-step-basic/form-step-basic.component';
import { FormStepAddressComponent } from './features/events/components/form-step-address/form-step-address.component';
import { FormStepConfirmationComponent } from './features/events/components/form-step-confirmation/form-step-confirmation.component';
import { FormStepTicketsComponent } from './features/events/components/form-step-tickets/form-step-tickets.component';
import { UpdateEventComponent } from './features/events/pages/update-event/update-event.component';
import { CustomerEventsComponent } from './features/events/pages/customer-events/customer-events.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { UserRole } from './core/models/user.model';

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
        canActivateChild: [authGuard, roleGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'event/:id',
                component: EventAcquisitionComponent
            },
            {
                path: 'events',
                component: EventsComponent
            },
            {
                path: 'customer-events',
                component: CustomerEventsComponent,
                data: { roles: [UserRole.CUSTOMER] }
            },
            {
                path: 'events/create',
                component: CreateEventComponent,
                children: [
                    { path: 'information', component: FormStepBasicComponent },
                    { path: 'address', component: FormStepAddressComponent },
                    { path: 'tickets', component: FormStepTicketsComponent },
                    { path: 'confirmation', component: FormStepConfirmationComponent },
                    { path: '', redirectTo: 'information', pathMatch: 'full' }
                ],
                data: { roles: [UserRole.COMPANY] }
            },
            {
                path: 'cart',
                component: CartPageComponent
            },
            {
                path: 'events/update/:id',
                component: UpdateEventComponent,
                children: [
                    { path: 'information', component: FormStepBasicComponent },
                    { path: 'address', component: FormStepAddressComponent },
                    { path: 'tickets', component: FormStepTicketsComponent },
                    { path: 'confirmation', component: FormStepConfirmationComponent },
                    { path: '', redirectTo: 'information', pathMatch: 'full' }
                ],
                data: { roles: [UserRole.COMPANY] }
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