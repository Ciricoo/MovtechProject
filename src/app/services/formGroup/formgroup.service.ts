import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroupModel } from '../../interfaces/FormGroup';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormgroupService {
  private apiUrl = 'https://localhost:7193/api/FormGroup/';
  
  constructor(private http: HttpClient) {}
  
  getFormGroups(): Observable<FormGroupModel[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<FormGroupModel[]>(this.apiUrl, { headers });
  }

  deleteFormGroup(groupId: number): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<boolean>(`${this.apiUrl}${groupId}`, { headers });
  }

  updateFormGroup(groupId: number, updatedGroup: FormGroupModel): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<boolean>(`${this.apiUrl}${groupId}`, updatedGroup, { headers });
  }

  createFormGroup(createGroup: FormGroupModel): Observable<FormGroupModel> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<FormGroupModel>(`${this.apiUrl}`, createGroup, { headers });
  }
}
