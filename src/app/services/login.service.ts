import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlLogin: string = 'https://localhost:7193/api/User';

  constructor(private router:Router , private http: HttpClient) {}

  login(login: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.urlLogin}/login`, login).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', login.username)
      })
    );
  }

  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.post<string>(`${this.urlLogin}/logout`, {}, { headers, responseType: 'text' as 'json' }).subscribe(
        response => {
          localStorage.removeItem('token');
          localStorage.removeItem('username')
          console.log("Resposta do logout:", response);
        },
        error => {
          console.error('Erro no logout:', error);
        }
      );
    }
  }

  getUsername(): string | null{
    return localStorage.getItem('username');
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    }

    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(new Date().getTime() / 1000);

    if(decodedToken.exp < currentTime){
      this.logout();
      return true;
    }
    return false;
  }
}
