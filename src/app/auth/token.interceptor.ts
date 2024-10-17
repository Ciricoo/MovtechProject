import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService,private router: Router, private alertService: AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token');

    let clonedRequest = req;
    if (token) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const newToken: string | undefined = event.headers.get('Authorization')?.replace('Bearer ', '');
          if (newToken) {
            this.loginService.saveToken(newToken);
          }
        }
      }),catchError((error: HttpErrorResponse) => {
        if(error.status == 401 && this.loginService.isTokenExpired()){
          this.loginService.clearLocalStorage();
          this.loginService.logout();
          this.alertService.showMessage('Sua sessão expirou. Faça login novamente.');
          this.router.navigate(['/login'])
        }
        throw error;
      })
    )
  }
}
