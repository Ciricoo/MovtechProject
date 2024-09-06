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

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  getFormsByGroupId(groupId: number): Observable<FormModel[]> {
    return this.http.get<FormModel[]>(`${this.apiUrl}Group/${groupId}`, { headers:this.getAuthHeaders(), withCredentials: true});
  }

  deleteForm(formId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}${formId}`, { headers:this.getAuthHeaders(), withCredentials: true });
  }

  updateForm(formId: number, updatedForm: FormModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}${formId}`, updatedForm, { headers:this.getAuthHeaders(), withCredentials: true });
  }
  
  createForm(createForm: FormModel): Observable<FormModel> {
    return this.http.post<FormModel>(`${this.apiUrl}`, createForm, { headers:this.getAuthHeaders(), withCredentials: true });
  }

  getForms(): Observable<FormModel[]>{
    return this.http.get<FormModel[]>(`${this.apiUrl}`, { headers:this.getAuthHeaders(), withCredentials: true });
  }
}
