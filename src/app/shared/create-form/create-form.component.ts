import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @Output() createdConfirmed = new EventEmitter<number>();
  @Input() currentGroupId!: number;
  selectedGroupId: number = 0;
  formGroups: FormGroupModel[] = [];
  forms: FormModel[] = [];
  questions: QuestionModel[] = [];
  formName: string = '';
  errorMessage: string | null = null;

  constructor(private formService: FormService, private formGroupService: FormgroupService) {}

  loadFormGroups(): void {
    this.formGroupService.getFormGroups().subscribe((data) => {this.formGroups = data;});   
  }

  showModal(): void {
    this.modal.nativeElement.showModal();
    this.selectedGroupId = this.currentGroupId;
    console.log(this.selectedGroupId)
    this.loadFormGroups();
    this.errorMessage = ''
  }

  closeModal(): void {
    this.modal.nativeElement.close();
    this.resetForm();
  }

  verificaForm(): boolean{
    this.errorMessage = null;

    if(this.selectedGroupId == 0 || this.selectedGroupId == undefined){
      this.errorMessage = 'O grupo precisa ser preenchido.';
      return false;
    }

    if (!this.formName.trim()) {
      this.errorMessage = 'O nome do Formulário não pode estar vazio.';
      return false;
    }

    if(this.formName.length > 150){
      this.errorMessage = 'O nome do Formulário não pode passar de 150 caracteres.';
      return false;
    }
  
    for (const question of this.questions) {
      if (!question.text.trim()) {
          this.errorMessage = `O conteúdo das perguntas não pode estar vazio.`;
          return false;
      }

      if(question.text.length > 150){
        this.errorMessage = 'O conteúdo das perguntas não pode passar de 150 caracteres.';
        return false;
      }
    }

    return true;
  }

  submit(): void {
    if(!this.verificaForm()){
      return;
    }
    const form: FormModel = {id: 0, name: this.formName, idFormsGroup: this.selectedGroupId, questions: this.questions};
    this.formService.createForm(form).subscribe( () =>
      {
        this.closeModal();
        this.resetForm();
        this.createdConfirmed.emit();
       this.alertModalComponent.open('Formulário criado com Sucesso!');
    });
  }

  resetForm(): void {
    this.formName = '';
    this.selectedGroupId = 0;
    this.questions = [];
  }

  deleteForm(index: number): void {
    this.forms.splice(index, 1);
  }

  addQuestion(): void {
    this.questions.push({
      id: this.questions.length + 1,
      text: '',
      idForms: 0,
    });
  }

  deleteQuestion(index: number): void {
    this.questions.splice(index, 1);
  }
}
