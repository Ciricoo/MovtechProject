import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';


@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements AfterViewInit {
  @ViewChild('alertModal') modal!: ElementRef<HTMLDialogElement>;
  message: string = '';
  @Input() goToHome!: boolean;

  constructor(private alertService: AlertService, private router: Router) {}

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
    if(this.goToHome == true)
      this.router.navigate(['/home']);
  }
}
