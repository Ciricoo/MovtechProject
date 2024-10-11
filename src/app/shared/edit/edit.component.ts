import {Component,ElementRef,EventEmitter,Input,Output,ViewChild,} from '@angular/core';
import { FormModel } from 'src/app/interfaces/Form';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { QuestionModel } from 'src/app/interfaces/Question';
import { FormService } from 'src/app/services/form/form.service';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  @ViewChild('edit') modal!: ElementRef<HTMLDialogElement>;
  @ViewChild(AlertModalComponent) alertModalComponent!: AlertModalComponent;
  @Input() serviceType!: 'group' | 'form' | 'question';
  @Input() itemId!: number;
  @Input() oldName!: string;
  @Input() currentGroupId!: number; 
  @Input() currentFormId!: number; 
  @Output() editConfirmed = new EventEmitter<number>();

  name: string = '';
  fk!: number;
  forms: FormModel[] = [];
  formGroups: FormGroupModel[] = [];
  errorMessage: string | null = null;

  constructor( private formgroupService: FormgroupService,private formService: FormService,private questionService: QuestionService) {}

  loadForms(): void {
    this.formService.getForms().subscribe((data) => {
      this.forms = data;
    });
  }
  
  loadFormGroups(): void {
    this.formgroupService.getFormGroups().subscribe((data) => {
      this.formGroups = data;
    });
  }

  showModal(): void {
    this.modal.nativeElement.showModal();
    if (this.serviceType === 'form') {
      this.loadFormGroups();
      this.fk = this.currentGroupId;
    } else if (this.serviceType === 'question') {
      this.fk = this.currentFormId;
      this.loadForms();
    }
  }

  closeModal(): void {
    this.modal.nativeElement.close();
    this.errorMessage = null
    this.name = ''
  }

  editValidator(): boolean{
    this.errorMessage = null;

    if (!this.name.trim()) {
      this.errorMessage = 'O nome não pode estar vazio.';
      return false;
    }

    if(this.name.length > 150){
      this.errorMessage = 'O nome não pode passar de 150 caracteres'
      return false;
    }
    
    if(this.serviceType != 'group' && !this.fk){
      this.errorMessage = 'Todos os campos precisam sem preenchidos.';
      return false;
    }

    return true;
  }

  confirmEdit(): void {
    if(!this.editValidator()){
      return;
    }
    if (this.serviceType === 'group') {
      const updatedGroup: FormGroupModel = { id: this.itemId, name: this.name, forms: []};
      this.formgroupService.updateFormGroup(updatedGroup).subscribe(() => {
        this.editConfirmed.emit();
        this.alertModalComponent.open('Grupo de Formulário editado com sucesso!')
      });
    } else if (this.serviceType === 'form') {
      const updatedForm: FormModel = { id: this.itemId, name: this.name, idFormsGroup: this.fk, questions: []}; 
      this.formService.updateForm(updatedForm).subscribe(() => {
        this.editConfirmed.emit();
        this.alertModalComponent.open('Formulário editado com sucesso!')
      });
    } else if (this.serviceType === 'question') {
      const updatedQuestion: QuestionModel = {id: this.itemId, text: this.name, idForms: this.fk};
      this.questionService.updateQuestion(updatedQuestion).subscribe(() => {
        this.editConfirmed.emit();
      this.alertModalComponent.open('Pergunta editado com sucesso!')
      });
    }
    this.closeModal();
  }
}
