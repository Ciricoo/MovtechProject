import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { FormGroupModel } from '../../interfaces/FormGroup';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormgroupService {
  private apiUrl = 'https://localhost:7193/api/FormGroup/';
  
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }
  
  getFormGroups(): Observable<FormGroupModel[]> {
    return this.http.get<FormGroupModel[]>(this.apiUrl, { headers: this.getAuthHeaders(), withCredentials: true })
  }

  deleteFormGroup(groupId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}${groupId}`, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  updateFormGroup(groupId: number, updatedGroup: FormGroupModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}${groupId}`, updatedGroup, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  createFormGroup(createGroup: FormGroupModel): Observable<FormGroupModel> {
    return this.http.post<FormGroupModel>(`${this.apiUrl}`, createGroup, { headers: this.getAuthHeaders(), withCredentials: true });
  }
}
