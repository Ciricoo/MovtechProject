import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { LoginService } from 'src/app/services/login/login.service';
import { FormsModalComponent } from './components/forms-modal/forms-modalcomponent';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { SeeAnswersComponent } from '../../shared/see-answers/see-answers.component';
import { EditComponent } from 'src/app/shared/edit/edit.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  @ViewChild(FormsModalComponent) formsComponent!: FormsModalComponent;
  @ViewChild(DeleteComponent) DeleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
  @ViewChild(CreateGroupComponent) createGroupComponent!: CreateGroupComponent;
  @ViewChild(SeeAnswersComponent) seeAnswersComponent!: SeeAnswersComponent;

  formGroups: FormGroupModel[] = [];
  filteredGroups: FormGroupModel[] = [];
  userRole: string | null = null;
  activeMenuIndex: number | null = null;
  searchTerm: string = '';  

  constructor(
    private formgroupService: FormgroupService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();
    this.loadGroups();
  }

  loadGroups(): void {
      this.formgroupService.getFormGroups().subscribe((data) => {
        this.formGroups = data;
        this.filteredGroups = data;
        this.filterGroups(this.searchTerm);
      });
  }

  canShow(): boolean{
    if(this.userRole != 'Administrador'){
      return false
    }
    return true
  }

  filterGroups(search: string): void {
    this.searchTerm = search
    if (this.searchTerm) {
      this.filteredGroups = this.formGroups.filter(group =>
        group.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredGroups = this.formGroups;
    }
  }

  toggleMenu(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(): void {
    this.activeMenuIndex = null;
  }

  openModalForm(groupId: number, groupName: string): void {
    this.formsComponent.groupId = groupId;
    this.formsComponent.groupName = groupName;
    this.formsComponent.showModal();
    this.formsComponent.loadForm();
  }

  openModalDelete(groupId: number): void {
      this.DeleteComponent.itemId = groupId;
      this.DeleteComponent.serviceType = 'group';
      this.DeleteComponent.showModal();
  }

  openModalEdit(groupId: number, groupName: string): void {
    this.editComponent.itemId = groupId;
    this.editComponent.oldName = groupName;
    this.editComponent.serviceType = 'group';
    this.editComponent.showModal();
  }

  openModalCreateGroup(): void {
    this.createGroupComponent.showModal();
  }
  
  openModalSeeAnswers(): void {
    this.seeAnswersComponent.open();
  }
}
