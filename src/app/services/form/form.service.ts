import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormModel } from '../../interfaces/Form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'https://localhost:7193/api/Form/';

  constructor(private http: HttpClient) {}

  getFormsByGroupId(groupId: number): Observable<FormModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<FormModel[]>(`${this.apiUrl}Group/${groupId}`, { headers });
  }

  deleteForm(formId: number): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<boolean>(`${this.apiUrl}${formId}`, { headers });
  }

  updateForm(formId: number, updatedForm: FormModel): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<boolean>(`${this.apiUrl}${formId}`, updatedForm, { headers });
  }
  
  createForm(createForm: FormModel): Observable<FormModel> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<FormModel>(`${this.apiUrl}`, createForm, { headers });
  }

  getForms(): Observable<FormModel[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<FormModel[]>(`${this.apiUrl}`, { headers });
  }
}
