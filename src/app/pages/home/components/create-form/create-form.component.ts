import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/Form';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { QuestionModel } from 'src/app/interfaces/Question';
import { FormService } from 'src/app/services/form/form.service';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  @ViewChild('createForm') modal!: ElementRef<HTMLDialogElement>;
  @ViewChild(AlertModalComponent) alertModalComponent!: AlertModalComponent;
  selectedGroupId: number = 0;
  formGroups: FormGroupModel[] = [];
  forms: FormModel[] = [];
  questions: QuestionModel[] = [];
  formName: string = '';
  errorMessage: string | null = null;

  constructor(private formService: FormService, private formGroupService: FormgroupService) {}

  loadFormGroups() {
    this.formGroupService.getFormGroups().subscribe((data) => {this.formGroups = data;});
  }

  showModal() {
    this.modal.nativeElement.showModal();
    this.loadFormGroups();
  }

  closeModal() {
    this.modal.nativeElement.close();
    this.resetForm();
  }

  verificaForm(): boolean{
    this.errorMessage = null;

    if(this.selectedGroupId == 0){
      this.errorMessage = 'O grupo precisa ser preenchido.';
      return false;
    }
    if (!this.formName.trim()) {
      this.errorMessage = 'O nome do Formulário não pode estar vazio.';
      return false;
    }
  
    for (const question of this.questions) {
      if (!question.text.trim()) {
          this.errorMessage = `O conteúdo das perguntas não pode estar vazio.`;
          return false;
      }
    }

    return true;
  }

  submit() {
    if(!this.verificaForm()){
      return;
    }
    const form: FormModel = {id: 0, name: this.formName, IdFormsGroup: this.selectedGroupId, questions: this.questions};
    this.formService.createForm(form).subscribe( () =>
      {
        this.closeModal();
        this.resetForm();
        this.alertModalComponent.open('Formulário criado com Sucesso!');
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
