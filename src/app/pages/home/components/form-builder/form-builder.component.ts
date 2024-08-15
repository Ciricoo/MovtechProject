import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { LoginService } from 'src/app/services/login/login.service';
import { FormsComponent } from '../forms/forms.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  @ViewChild(FormsComponent) formsComponent!: FormsComponent;
  @ViewChild(DeleteComponent) DeleteComponent!: DeleteComponent;
  formGroups: FormGroupModel[] = [];
  selectedGroupId!: number;
  userRole: string | null = null;
  modalForms: boolean = false;
  modalDelete: boolean = false;
  activeMenuIndex: number | null = null;

  constructor(
    private formgroupService: FormgroupService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();
    this.formgroupService.getFormGroups().subscribe(
      (data) => {
        this.formGroups = data;
      },
      (error) => {
        console.error('Erro ao buscar grupos de formulários:', error);
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

  editGroup(groupId: number): void {
    console.log('Editar grupo:', groupId);
  }

  deleteGroup(groupId: number): void {
    this.selectedGroupId = groupId;
    this.modalDelete = true;
    setTimeout(() => {
      this.DeleteComponent.itemId = groupId;
      this.DeleteComponent.showModal();
    });
  }

  openModal() {
    this.modalForms = true;
    setTimeout(() => {
      this.formsComponent.showModal();
      this.formsComponent.loadForm();
    });
  }

  getFormsByGroupId(groupId: number): void {
    this.selectedGroupId = groupId;
    this.openModal();
  }

  onDeleteConfirmed(groupId: number): void {
    this.formgroupService.deleteFormGroup(groupId).subscribe(() => {
      this.formGroups = this.formGroups.filter((group) => group.id !== groupId);
      this.modalDelete = false;
    });
  }
}
