import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (!this.loginService.isTokenExpired()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.loginService.logout();
      return false;
    }
  }
}
