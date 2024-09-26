import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();

  showMessage(message: string): void  {
    this.messageSource.next(message);
  }
}
