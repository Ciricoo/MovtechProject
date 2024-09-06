import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7193/api/User/'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  getUserById(idUser: number): Observable<{ id: number, name: string }> {
    return this.http.get<{ id: number, name: string }>(`${this.apiUrl}${idUser}`, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  getUsers(): Observable<{ id: number, name: string }[]>{
    return this.http.get<{ id: number, name: string }[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  npsList(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}Npslist`, { headers: this.getAuthHeaders(), withCredentials: true });
  }

}
