import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form/form.service';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent{
  @Input() itemId!: number; 
  @Input() serviceType!: 'group' | 'form' | 'question';
  @ViewChild('delete') modal!: ElementRef<HTMLDialogElement>;
  @ViewChild(AlertModalComponent) alertModalComponent!: AlertModalComponent;
  @Output() deleteConfirmed = new EventEmitter<number>();
  
  constructor(private formgroupService: FormgroupService, private formService: FormService, private questionService: QuestionService) {}

  showModal(): void {
      this.modal.nativeElement.showModal();
  }
  
  closeModal(): void {
    this.modal.nativeElement.close();
  }

  confirmDelete(): void{
    if(this.serviceType == 'group'){
      this.formgroupService.deleteFormGroup(this.itemId).subscribe(() => {
        this.deleteConfirmed.emit();
        this.alertModalComponent.open('Grupo de Formulário excluido com sucesso!')
      });
    } else if( this.serviceType == 'form'){
      this.formService.deleteForm(this.itemId).subscribe(() => {
        this.deleteConfirmed.emit();
        this.alertModalComponent.open('Formulário excluido com sucesso!')
      });
    }
    else if( this.serviceType == 'question'){
      this.questionService.deleteQuestion(this.itemId).subscribe(() => {
        this.deleteConfirmed.emit();
        this.alertModalComponent.open('Pergunta excluida com sucesso!')
      })
    }
    this.closeModal();
  }
}
