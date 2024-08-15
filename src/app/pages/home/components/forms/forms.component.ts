import { Component, ElementRef, Input, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { FormModel } from 'src/app/interfaces/Form';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent{
  @Input() groupId!: number; 
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  forms: FormModel[] = [];
  activeMenuIndex: number | null = null;

  constructor(private formService: FormService) {}

  loadForm() {
    this.showModal();
    this.formService.getFormsByGroupId(this.groupId).subscribe(
      (data) => {
        this.forms = data;
        console.log('Formulários recebidos:', this.forms)
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
  handleClickOutside(event: MouseEvent): void{
    this.activeMenuIndex = null;
  }

  editForm(groupId: number): void {
    console.log('Editar grupo:', groupId);
  }

  deleteForm(groupId: number): void {
    console.log('Excluir grupo:', groupId);
  }

    showModal() {
    if (this.modal) {
      this.modal.nativeElement.showModal();
    }
  }

  closeModal() {
    this.modal.nativeElement.close();
  }
}
