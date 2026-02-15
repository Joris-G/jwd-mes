import { Routes } from '@angular/router';
import { CoreRoutes } from './core/core.routes';
import { authGuard } from './core/features/auth/auth.guard';

export const routes: Routes = [
    {
        path:CoreRoutes.ROOT,
        redirectTo:CoreRoutes.HOME,
        pathMatch:'full'
    },
    {
        path:CoreRoutes.LOGIN,
        loadComponent:()=> import('./core/features/auth/login.page').then(m=>m.LoginPage),
        title:'JWD - MES - Authentification'
    },
    {
        path:CoreRoutes.HOME,
        canActivate: [authGuard],
        loadComponent:()=> import('./core/features/home/home.page').then(m=>m.HomePage),
        title:'JWD MES - Page d\'accueil',
    },
    {
        path:'**',
        redirectTo:CoreRoutes.HOME
    }
];
