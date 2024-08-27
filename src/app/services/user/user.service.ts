import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7193/api/User/'; 

  constructor(private http: HttpClient) {}

  getUserById(idUser: number): Observable<{ id: number, name: string }> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<{ id: number, name: string }>(`${this.apiUrl}${idUser}`, { headers });
  }

  getUsers(): Observable<{ id: number, name: string }[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<{ id: number, name: string }[]>(`${this.apiUrl}`, { headers });
  }
}
