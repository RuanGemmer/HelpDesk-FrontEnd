
import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function authGuardFactory(authService: AuthService, router: Router): CanActivateFn {
  return (route, state) => {
    let authenticated = authService.isAuthenticated();

    if(authenticated){
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate = authGuardFactory(this.authService, this.router);
}