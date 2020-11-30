import { AuthService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(route, state: RouterStateSnapshot) {
    if (this.service.isLoggedIn()) {
      return true;
    }
    return false;
  }

  constructor(private service: AuthService, private router: Router) {
  }

}
