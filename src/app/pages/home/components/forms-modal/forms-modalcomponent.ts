import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { FormModel } from 'src/app/interfaces/Form';
import { FormService } from 'src/app/services/form/form.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { EditComponent } from 'src/app/shared/edit/edit.component';
import { QuestionsModalComponent } from '../../../../shared/questions-modal/questions-modal.component';
import { LoginService } from 'src/app/services/login/login.service';
import { CreateFormComponent } from '../../../../shared/create-form/create-form.component';

@Component({
  selector: 'app-forms-modal',
  templateUrl: './forms-modal.component.html',
  styleUrls: ['./forms-modal.component.scss'],
})
export class FormsModalComponent {
  @ViewChild(DeleteComponent) deleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
  @ViewChild(QuestionsModalComponent) questionComponent!: QuestionsModalComponent;
  @ViewChild(CreateFormComponent) createFormComponent!: CreateFormComponent;
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Input() groupId!: number;
  @Input() groupName!: string;
  @Output() formsLoaded = new EventEmitter<number>();

  forms: FormModel[] = [];
  activeMenuIndex: number | null = null;
  userRole: string | null = null;
  modalType: 'edit' | 'delete' | 'question' | null = null;

  constructor(
    private formService: FormService,
    private loginService: LoginService
  ) {}

  loadForm(): void {
    this.userRole = this.loginService.getUserRole();
    this.formService.getFormsByGroupId(this.groupId)
      .subscribe((data) => (this.forms = data));
  }

  canShow(): boolean{
    if(this.userRole != 'Administrador'){
      return false
    }
    return true
  }
  
  showModal(): void {
    this.modal.nativeElement.showModal();
  }
  
  closeModal(): void {
    this.modal.nativeElement.close();
  }
  
  openModalQuestion(formId: number, formName: string): void {
    this.questionComponent.formId = formId;
    this.questionComponent.formName = formName;
    this.questionComponent.showModal();
    this.questionComponent.loadQuestion();
  }
  
  openModalDelete(formId: number): void {
    this.deleteComponent.itemId = formId;
    this.deleteComponent.serviceType = 'form';
    this.deleteComponent.showModal();
  }
  
  openModalEdit(formId: number, formName: string): void {
    this.editComponent.itemId = formId;
    this.editComponent.oldName = formName;
    this.editComponent.serviceType = 'form';
    this.editComponent.currentGroupId = this.groupId;
    this.editComponent.showModal();
  }
  
  openModalCreateForm(): void {
    this.createFormComponent.currentGroupId = this.groupId;
    this.createFormComponent.showModal();
  }
  
  toggleMenu(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }
  
  @HostListener('document:click', ['$event'])
  handleClickOutside(): void {
    this.activeMenuIndex = null;
  }
}
