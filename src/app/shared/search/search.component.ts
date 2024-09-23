import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();

  onSearchChange(event: Event){
    const input = event.target as HTMLInputElement;
    if(input){
      const value = input.value.trim();
      this.searchEvent.emit(value);
    }
  }
}
