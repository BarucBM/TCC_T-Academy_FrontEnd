import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  if (inject(AuthService).isLoggedIn()) {
    return true;
  }
    
  return inject(Router).createUrlTree(['/login'], { queryParams: { stateUrl: state.url }});;
};
