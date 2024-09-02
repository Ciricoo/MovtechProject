import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerModal } from 'src/app/interfaces/Answer';
import { QuestionModel } from 'src/app/interfaces/Question';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'https://localhost:7193/api/Answer/';
  
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  sendAnswer(answers: AnswerModal[]): Observable<boolean>{
    return this.http.post<boolean>(`${this.apiUrl}`, answers, { headers: this.getAuthHeaders() });
  }

  getAnswersByQuestionId(questionId: number): Observable<AnswerModal[]>{
    return this.http.get<AnswerModal[]>(`${this.apiUrl}QuestionId/${questionId}`, { headers: this.getAuthHeaders() });
  }

  getAnswersByUserId(userId: number): Observable<AnswerModal[]>{
    return this.http.get<AnswerModal[]>(`${this.apiUrl}UserId/${userId}`, { headers: this.getAuthHeaders() });
  }
}
