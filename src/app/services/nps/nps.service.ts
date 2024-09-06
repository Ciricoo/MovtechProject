import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NpsService {
  private apiUrl = 'https://localhost:7193/api/Nps';
  
  constructor(private http: HttpClient) {}

  getNpsScore(): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<number>(this.apiUrl, { headers, withCredentials: true });
  }
}
