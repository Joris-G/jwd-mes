import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CoreRoutes } from '../../core.routes';
import { AuthStore } from './auth.store';

/**
 * Guard fonctionnel protégeant les routes nécessitant une authentification.
 * Redirige vers la page de login si l'utilisateur n'est pas authentifié.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (authStore.isAuthenticated()) {
    return true;
  }

  // Redirection avec "UrlTree" est la bonne pratique Angular
  return router.createUrlTree([CoreRoutes.LOGIN]);
};