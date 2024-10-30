import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { LoginResponse } from '../auth/models/login.model';
import { catchError, switchMap, throwError } from 'rxjs';

const EXCLUDED_URLS = ['https://api.openweathermap.org'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  if (EXCLUDED_URLS.some(url => req.url.includes(url))) {
    return next(req);
  }

  const clonedReq = token && !authService.isTokenExpired() ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(clonedReq).pipe(
    catchError(error => {
      if (token && authService.isTokenExpired() && authService.getRefreshToken()) {
        return authService.refreshToken(authService.getRefreshToken()!).pipe(
          switchMap((response: LoginResponse) => {
            authService.setAuthToken(response.token);
            authService.setRefreshToken(response.refreshToken);

            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${response.token}` }
            });

            return next(retryReq);
          }),
          catchError((refreshError) => {
            authService.removeAuthToken();
            authService.removeRefreshToken();

            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
