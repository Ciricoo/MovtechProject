import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormModel } from '../../interfaces/Form';


@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl: string = 'https://localhost:7193/api/Form/';

  constructor(private http: HttpClient) {}

  getFormsByGroupId(groupId: number): Observable<FormModel[]> {
    return this.http.get<FormModel[]>(`${this.apiUrl}Group/${groupId}`, {withCredentials: true});
  }

  deleteForm(formId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}${formId}`, {withCredentials: true });
  }

  updateForm(updatedForm: FormModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}${updatedForm.id}`, updatedForm, {withCredentials: true });
  }
  
  createForm(createForm: FormModel): Observable<FormModel> {
    return this.http.post<FormModel>(`${this.apiUrl}`, createForm, {withCredentials: true });
  }

  getForms(): Observable<FormModel[]>{
    return this.http.get<FormModel[]>(`${this.apiUrl}`, {withCredentials: true });
  }

  getFormById(formId: number): Observable<FormModel>{
    return this.http.get<FormModel>(`${this.apiUrl}${formId}`, {withCredentials: true });
  }
}
