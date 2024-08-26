import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionModel } from 'src/app/interfaces/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'https://localhost:7193/api/Question/'

  constructor(private http: HttpClient) {}

  getQuestionByFormId(formId: number): Observable<QuestionModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<QuestionModel[]>(`${this.apiUrl}Form/${formId}`, { headers });
  }

  deleteQuestion(questionId: number): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<boolean>(`${this.apiUrl}${questionId}`, { headers });
  }

  updateQuestion(questionId: number, updatedQuestion: QuestionModel): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<boolean>(`${this.apiUrl}${questionId}`, updatedQuestion, { headers });
  }

  createQuestion(createQuestion: QuestionModel[]): Observable<QuestionModel[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<QuestionModel[]>(`${this.apiUrl}`, createQuestion, { headers });
  }

  getQuestion(): Observable<QuestionModel[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<QuestionModel[]>(`${this.apiUrl}`, {headers});
  }

}
