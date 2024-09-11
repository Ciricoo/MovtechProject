import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/interfaces/LoginResponse';
import { DecodedToken } from 'src/app/interfaces/DecodedToken ';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlLogin: string = 'https://localhost:7193/api/User';

  constructor(private http: HttpClient, private router: Router) {}

  login(login: { name: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlLogin}/login`, login, { withCredentials: true }).pipe(
      tap((response) => {
        this.saveToken(response.token);
        localStorage.setItem('name', login.name);
      })
    );
  }
  
  saveToken(token: string) {
    localStorage.setItem('token', token);
    const decodedTokenRole: DecodedToken = jwtDecode(token);
    localStorage.setItem('role', decodedTokenRole.role);
  }

  clearLocalStorage(): void {
    localStorage.clear()
  }

  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.post<string>(`${this.urlLogin}/logout`, {}, {responseType: 'text' as 'json', withCredentials: true })
      .subscribe(() => {
          this.clearLocalStorage();
          this.router.navigate(['/login']);
        }
      );
    }
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    }
    const decodedToken: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(new Date().getTime() / 1000);
    
    if(decodedToken.exp < currentTime){
      return true;
    }
    return false;
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
