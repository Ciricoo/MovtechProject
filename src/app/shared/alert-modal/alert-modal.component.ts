import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {
  @ViewChild('alertModal') modal!: ElementRef<HTMLDialogElement>;
  message: string = '';

  open(message: string): void {
    this.message = message;
    this.modal.nativeElement.showModal();
  }

  close(): void {
    this.modal.nativeElement.close();
  }
}
