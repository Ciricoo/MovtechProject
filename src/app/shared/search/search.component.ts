import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();

  onSearchChange(event: Event): void{
    const input = event.target as HTMLInputElement;
    if(input){
      const value: string = input.value.trim();
      this.searchEvent.emit(value);
    }
  }
}
