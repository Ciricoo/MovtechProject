import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();
  private searchSubject = new Subject<string>();

  constructor(){
    this.searchSubject.pipe(
      debounceTime(200)
    ).subscribe(search => {
      this.searchEvent.emit(search);
    })
  }

  onSearchChange(event: Event): void{
    const input = event.target as HTMLInputElement;
    if(input){
      const value: string = input.value.trim();
      this.searchSubject.next(value);
    }
  }
}
