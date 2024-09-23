// alert-modal.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';


@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements AfterViewInit {
  @ViewChild('alertModal') modal!: ElementRef<HTMLDialogElement>;
  message: string = '';

  constructor(private alertService: AlertService) {}

  ngAfterViewInit(): void {
    this.alertService.message$.subscribe(message => {
        this.open(message);
    });
  }
  open(message: string): void {
    this.message = message;
    this.modal.nativeElement.showModal();
}


  close(): void {
    this.modal.nativeElement.close();
  }
}
