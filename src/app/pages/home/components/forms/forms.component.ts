import { Component, ElementRef, Input, ViewChild, HostListener } from '@angular/core';
import { FormModel } from 'src/app/interfaces/Form';
import { FormService } from 'src/app/services/form/form.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { EditComponent } from 'src/app/shared/edit/edit.component';
import { QuestionsComponent } from '../questions/questions.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  @ViewChild(DeleteComponent) deleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
  @ViewChild(QuestionsComponent) questionComponent!: QuestionsComponent;
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Input() groupId!: number; 
  selectedFormId!: number;
  forms: FormModel[] = [];
  activeMenuIndex: number | null = null;
  modalType: 'edit' | 'delete' | 'question' | null = null;

  constructor(private formService: FormService) {}

  loadForm(): void {
    this.formService.getFormsByGroupId(this.groupId).subscribe(
      (data) => {
        this.forms = data;
        console.log('Formulários recebidos:', this.forms);
      },
      (error) => {
        console.error('Erro ao buscar formulários:', error);
      }
    );
  }

  toggleMenu(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    this.activeMenuIndex = null;
  }

  openModal(type: 'delete' | 'edit' | 'question', formId: number) {
    this.modalType = type;
    this.selectedFormId = formId;
    setTimeout(() => {
      if ( type == 'question'){
        this.questionComponent.showModal();
        this.questionComponent.loadQuestion();
      }
      else if (type === 'delete') {
        this.deleteComponent.itemId = formId;
        this.deleteComponent.serviceType = 'group';
        this.deleteComponent.showModal();
      } else if (type === 'edit') {
        this.editComponent.itemId = formId;
        this.editComponent.serviceType = 'form';
        this.editComponent.showModal();
      }
    });
  }

  editForm(formId: number): void {
    this.openModal('edit', formId);
  }

  deleteForm(formId: number): void {
    this.openModal('delete', formId);
  }
  
  getQuestionByFormId(formId: number): void {
    this.openModal('question', formId)
  }

  showModal(): void {
    if (this.modal) {
      this.modal.nativeElement.showModal();
    }
  }

  closeModal(): void {
    this.modal.nativeElement.close();
  }
}
