import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserRole } from '../models/user.model';
import { AuthService } from '../auth/services/auth.service';

export const roleGuard: CanActivateChildFn = (childRoute, state) => {
  const expectedRoles = childRoute.data['roles'] as Array<UserRole>;

  if (!expectedRoles || expectedRoles.includes(inject(AuthService).getUserRole() as UserRole)) {
    return true;
  }

  return inject(Router).createUrlTree(['/unauthorized']);
};
