import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/Form';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { QuestionModel } from 'src/app/interfaces/Question';
import { FormService } from 'src/app/services/form/form.service';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  @ViewChild('createForm') modal!: ElementRef<HTMLDialogElement>;
  selectedGroupId: number = 0;
  formGroups: FormGroupModel[] = [];
  forms: FormModel[] = [];
  questions: QuestionModel[] = [];
  formName: string = '';

  constructor(private formService: FormService, private formGroupService: FormgroupService) {}


  ngOnInit(): void {
    this.loadFormGroups();
  }

  loadFormGroups() {
    this.formGroupService.getFormGroups().subscribe((data) => {this.formGroups = data;});
  }

  showModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.modal.nativeElement.close();
  }

  submit() {
    console.log(this.selectedGroupId)
    const form: FormModel = {id: 0, name: this.formName, IdFormsGroup: this.selectedGroupId, questions: this.questions};
    this.formService.createForm(form).subscribe( () =>
      {
        this.closeModal();
        this.resetForm();
    });
  }

  resetForm() {
    this.formName = '';
    this.selectedGroupId = 0;
    this.questions = [];
  }

  deleteForm(index: number) {
    this.forms.splice(index, 1);
  }

  addQuestion() {
    this.questions.push({
      id: this.questions.length + 1,
      text: '',
      IdForms: 0,
    });
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }
}
