import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormModel } from '../../interfaces/Form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'https://localhost:7193/api/Form/Group/';

  constructor(private http: HttpClient) {}

  getFormsByGroupId(groupId: number): Observable<FormModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<FormModel[]>(`${this.apiUrl}${groupId}`, { headers });
  }
}
