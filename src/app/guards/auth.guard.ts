import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthenticationService).isAuthenticated()) {
    inject(Router).navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
