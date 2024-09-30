import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.loginService.isTokenExpired()) {
      return true; 
    } else {
      const returnUrl: string = state.url; 
      console.log( returnUrl)
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
      return false;
    }
  }
}
