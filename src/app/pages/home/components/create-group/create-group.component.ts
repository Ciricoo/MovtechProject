import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormModel } from 'src/app/interfaces/Form';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent {
  @ViewChild('createGroup') modal!: ElementRef<HTMLDialogElement>;
  @Output() createdConfirmed = new EventEmitter<number>();

  constructor(private formGroupService: FormgroupService) {}

  groupName: string = '';
  forms: FormModel[] = [];

  showModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.modal.nativeElement.close();
  }

  submit() {
    const formGroup: FormGroupModel = {id: 0,name: this.groupName,forms: this.forms,};
    this.formGroupService.createFormGroup(formGroup).subscribe(() => {
      this.closeModal();
      this.createdConfirmed.emit();
    });
  }

  addForm() {
    this.forms.push({
      id: this.forms.length + 1,
      name: '',
      IdFormsGroup: 0,
      questions: [],
    });
  }

  deleteForm(index: number) {
    this.forms.splice(index, 1);
  }

  addQuestion(formIndex: number) {
    const form = this.forms[formIndex];
    form.questions.push({
      id: form.questions.length + 1,
      text: '',
      IdForms: form.id,
    });
  }

  deleteQuestion(formIndex: number, questionIndex: number) {
    const form = this.forms[formIndex];
    form.questions.splice(questionIndex, 1);
  }
}
