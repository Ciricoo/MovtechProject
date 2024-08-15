import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  @Input() itemId!: number; 
  @ViewChild('delete') modal!: ElementRef<HTMLDialogElement>;
  @Output() deleteConfirmed = new EventEmitter<number>();
  
  showModal() {
    if (this.modal) {
      this.modal.nativeElement.showModal();
    }
  }
  
  closeModal() {
    this.modal.nativeElement.close();
  }

  confirmDelete(){
    this.deleteConfirmed.emit(this.itemId);
    this.closeModal();
  }
}
