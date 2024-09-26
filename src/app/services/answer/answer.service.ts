import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerModal } from 'src/app/interfaces/Answer';
import { QuestionModel } from 'src/app/interfaces/Question';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl: string = 'https://localhost:7193/api/Answer/';
  
  constructor(private http: HttpClient) {}

  sendAnswer(answers: AnswerModal[]): Observable<boolean>{
    return this.http.post<boolean>(`${this.apiUrl}`, answers, {withCredentials: true });
  }

  getAnswersWithDetails(questionId?: number, userId?: number): Observable<AnswerModal[]> {
    let params: { [key: string]: number } = {};
  
    if (questionId !== undefined) {
      params['questionId'] = questionId;
    }
    if (userId !== undefined) {
      params['userId'] = userId;
    }
  
    return this.http.get<AnswerModal[]>(`${this.apiUrl}AnswersWithDetails`, {withCredentials: true , params });
  }
}
