import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroupModel } from '../../interfaces/FormGroup';

@Injectable({
  providedIn: 'root',
})
export class FormgroupService {
  private apiUrl = 'https://localhost:7193/api/FormGroup';
  
  constructor(private http: HttpClient) {}
  
  getFormGroups(): Observable<FormGroupModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<FormGroupModel[]>(this.apiUrl, { headers });
  }

  deleteFormGroup(groupId: number): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<boolean>(`${this.apiUrl}/${groupId}`, { headers });
  }
}
