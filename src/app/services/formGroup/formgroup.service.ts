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
  
  getFormGroups(): Observable<FormGroupModel[]> {
    return this.http.get<FormGroupModel[]>(this.apiUrl, { withCredentials: true })
  }

  deleteFormGroup(groupId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}${groupId}`, { withCredentials: true });
  }

  updateFormGroup(groupId: number, updatedGroup: FormGroupModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}${groupId}`, updatedGroup, { withCredentials: true });
  }

  createFormGroup(createGroup: FormGroupModel): Observable<FormGroupModel> {
    return this.http.post<FormGroupModel>(`${this.apiUrl}`, createGroup, { withCredentials: true });
  }
}
