import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionModel } from 'src/app/interfaces/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl: string = 'https://localhost:7193/api/Question/'

  constructor(private http: HttpClient) {}

  getQuestionByFormId(formId: number): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.apiUrl}Form/${formId}`, { withCredentials: true });
  }

  deleteQuestion(questionId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}${questionId}`, { withCredentials: true });
  }

  updateQuestion(questionId: number, updatedQuestion: QuestionModel): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}${questionId}`, updatedQuestion, { withCredentials: true });
  }

  createQuestion(createQuestion: QuestionModel[]): Observable<QuestionModel[]> {
    return this.http.post<QuestionModel[]>(`${this.apiUrl}`, createQuestion, { withCredentials: true });
  }

  getQuestion(): Observable<QuestionModel[]>{
    return this.http.get<QuestionModel[]>(`${this.apiUrl}`, { withCredentials: true});
  }

  getQuestionById(questionId: number): Observable<QuestionModel>{
    return this.http.get<QuestionModel>(`${this.apiUrl}${questionId}`, { withCredentials: true});
  }

}
