import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/form/form.service';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  @Input() itemId!: number; 
  @Input() serviceType!: 'group' | 'form' | 'question';
  @ViewChild('delete') modal!: ElementRef<HTMLDialogElement>;
  @Output() deleteConfirmed = new EventEmitter<number>();
  
  constructor(private formgroupService: FormgroupService, private formService: FormService, private questionService: QuestionService) {}
  
  showModal() {
      this.modal.nativeElement.showModal();
  }
  
  closeModal() {
    this.modal.nativeElement.close();
  }

  confirmDelete(){
    if(this.serviceType == 'group'){
      this.formgroupService.deleteFormGroup(this.itemId).subscribe(() => {
        this.deleteConfirmed.emit(this.itemId);
      });
    } else if( this.serviceType == 'form'){
      this.formService.deleteForm(this.itemId).subscribe(() => {
        this.deleteConfirmed.emit(this.itemId);
      });
    }
    else if( this.serviceType == 'question'){
      this.questionService.deleteQuestion(this.itemId).subscribe(() => {
        this.deleteConfirmed.emit(this.itemId);
      })
    }
    this.closeModal();
  }
}
