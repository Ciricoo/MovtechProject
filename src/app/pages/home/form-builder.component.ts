import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { LoginService } from 'src/app/services/login/login.service';
import { FormsModalComponent } from './components/forms-modal/forms-modalcomponent';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { SeeAnswersComponent } from './components/see-answers/see-answers.component';
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
      });
  }

  filterGroups(search:string): void{
    if(search.trim()){
      this.filteredGroups = this.formGroups.filter(group =>
        group.name.toLowerCase().includes(search.toLowerCase())
      );
    }else {
      this.filteredGroups = [...this.formGroups]; 
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

  openModalForm(groupId: number, groupName: string) {
    this.formsComponent.groupId = groupId;
    this.formsComponent.groupName = groupName;
    setTimeout(() => {
      this.formsComponent.showModal();
      this.formsComponent.loadForm();
    });
  }

  openModalDelete(groupId: number, event: MouseEvent) {
      this.handleClickOutside()
      event.stopPropagation();
      this.DeleteComponent.itemId = groupId;
      this.DeleteComponent.serviceType = 'group';
      this.DeleteComponent.showModal();
  }

  openModalEdit(groupId: number, groupName: string, event: MouseEvent) {
    this.handleClickOutside()
    event.stopPropagation();
    this.editComponent.itemId = groupId;
    this.editComponent.oldName = groupName
    this.editComponent.serviceType = 'group';
    this.editComponent.showModal();
  }

  openModalCreateGroup() {
    this.createGroupComponent.showModal();
  }
  
  openModalSeeAnswers() {
    this.seeAnswersComponent.open();
  }
}
