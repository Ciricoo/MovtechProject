import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token')) {
      return true; 
    } else {
      const returnUrl: string = state.url; 
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
      return false;
    }
  }
}
