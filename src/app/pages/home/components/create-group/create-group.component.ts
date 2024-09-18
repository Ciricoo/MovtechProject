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
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent {
  @ViewChild('createGroup') modal!: ElementRef<HTMLDialogElement>;
  @ViewChild(AlertModalComponent) alertModalComponent!: AlertModalComponent;
  @Output() createdConfirmed = new EventEmitter<number>();
  
  groupName: string = '';
  forms: FormModel[] = [];
  errorMessage: string | null = null;

  constructor(private formGroupService: FormgroupService) {}

  showModal() {
    this.modal.nativeElement.showModal();
    this.addForm()
  }

  closeModal() {
    this.modal.nativeElement.close();
    this.resetGroup();
    this.errorMessage = ''
  }

  verificaGroup(): boolean{
    this.errorMessage = null;

    if (!this.groupName.trim()) {
      this.errorMessage = 'O nome do grupo não pode estar vazio.';
      return false;
    }

    if(this.groupName.length > 150){
      this.errorMessage = 'O nome do grupo não pode passar de 150 caracteres.';
      return false;
    }
    
    for (const form of this.forms) {
      if (!form.name.trim()) {
        this.errorMessage = `O nome do formulário ${form.id} não pode estar vazio.`;
        return false;
      }

      if(form.name.length > 150){
        this.errorMessage = 'O nome do formulário não pode passar de 150 caracteres.';
        return false;
      }

      for (const question of form.questions) {
        if (!question.text.trim()) {
          this.errorMessage = `O conteúdo das perguntas no formulário ${form.id} não pode estar vazio.`;
          return false;
        }

        if(question.text.length > 150){
          this.errorMessage = 'O conteúdo das perguntas não pode passar de 150 caracteres.';
          return false;
        }
      }
    }

    return true;
  }

  submit() {
    if(!this.verificaGroup()){
      return;
    }
    const formGroup: FormGroupModel = {id: 0,name: this.groupName, forms: this.forms,};
    this.formGroupService.createFormGroup(formGroup).subscribe(() => {
      this.closeModal();
      this.resetGroup();
      this.createdConfirmed.emit();
      this.alertModalComponent.open('Grupo de Formulário criado com sucesso!')
    });
  }

  resetGroup() {
    this.groupName = '';
    this.forms = [];
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
