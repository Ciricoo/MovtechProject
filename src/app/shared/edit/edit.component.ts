import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormModel } from 'src/app/interfaces/Form';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { QuestionModel } from 'src/app/interfaces/Question';
import { FormService } from 'src/app/services/form/form.service';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  @ViewChild('edit') modal!: ElementRef<HTMLDialogElement>;
  @Input() serviceType!: 'group' | 'form' | 'question';
  @Input() itemId!: number;
  @Output() editConfirmed = new EventEmitter<number>();

  name: string = ''; 
  fk!: number;

  constructor(
    private formgroupService: FormgroupService,
    private formService: FormService,
    private questionService: QuestionService
  ) {}

  showModal() {
    if (this.modal) {
      this.modal.nativeElement.showModal();
    }
  }

  closeModal() {
    this.modal.nativeElement.close();
  }

  confirmEdit() {
    if (this.serviceType == 'group') {
      const updatedGroup: FormGroupModel = { id: this.itemId, name: this.name, forms: []};
      this.formgroupService.updateFormGroup(this.itemId, updatedGroup).subscribe(() => {
        this.editConfirmed.emit(this.itemId);
      });
    } else if (this.serviceType == 'form') {
      const updatedForm: FormModel = { id: this.itemId, name: this.name, IdFormsGroup: this.fk, questions: []}; 
      this.formService.updateForm(this.itemId, updatedForm).subscribe(() => {
        this.editConfirmed.emit();
      });
    }
    else if (this.serviceType == 'question') {
      const updatedQuestion: QuestionModel = {id: this.itemId, text: this.name, IdForms: this.fk};
      this.questionService.updateQuestion(this.itemId, updatedQuestion).subscribe(() => {
        this.editConfirmed.emit();
      })
    }
    this.closeModal();
  }
}
