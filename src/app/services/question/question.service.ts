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

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  getQuestionByFormId(formId: number): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.apiUrl}Form/${formId}`, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  deleteQuestion(questionId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}${questionId}`, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  updateQuestion(questionId: number, updatedQuestion: QuestionModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}${questionId}`, updatedQuestion, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  createQuestion(createQuestion: QuestionModel[]): Observable<QuestionModel[]> {
    return this.http.post<QuestionModel[]>(`${this.apiUrl}`, createQuestion, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  getQuestion(): Observable<QuestionModel[]>{
    return this.http.get<QuestionModel[]>(`${this.apiUrl}`, {headers: this.getAuthHeaders(), withCredentials: true});
  }

  getQuestionById(questionId: number): Observable<QuestionModel>{
    return this.http.get<QuestionModel>(`${this.apiUrl}${questionId}`, {headers: this.getAuthHeaders(), withCredentials: true});
  }

}
