import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = 'https://localhost:7193/api/User/'; 

  constructor(private http: HttpClient) {}

  getUserById(idUser: number): Observable<{ id: number, name: string }> {
    return this.http.get<{ id: number, name: string }>(`${this.apiUrl}${idUser}`, { withCredentials: true });
  }

  getUsers(): Observable<{ id: number, name: string }[]>{
    return this.http.get<{ id: number, name: string }[]>(`${this.apiUrl}`, { withCredentials: true });
  }

  npsList(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}Npslist`, { withCredentials: true });
  }

}
