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
    return this.http.post<boolean>(`${this.apiUrl}`, answers, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  getAnswersByQuestionId(questionId: number): Observable<AnswerModal[]>{
    return this.http.get<AnswerModal[]>(`${this.apiUrl}QuestionId/${questionId}`, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  getAnswersByUserId(userId: number): Observable<AnswerModal[]>{
    return this.http.get<AnswerModal[]>(`${this.apiUrl}UserId/${userId}`, { headers: this.getAuthHeaders(), withCredentials: true });
  }

  getAnswersWithDetails(questionId?: number, userId?: number): Observable<AnswerModal[]> {
    let url = `${this.apiUrl}AnswersWithDetails`;
  
    const params = new URLSearchParams();
    if (questionId != null) {
      params.append('questionId', questionId.toString());
    }
    if (userId != null) {
      params.append('userId', userId.toString());
    }
  
    return this.http.get<AnswerModal[]>(url, { headers: this.getAuthHeaders(), withCredentials: true });
  }
}
