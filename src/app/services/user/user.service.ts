import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = 'https://localhost:7193/api/User/'; 

  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.apiUrl}`, { withCredentials: true });
  }
}
