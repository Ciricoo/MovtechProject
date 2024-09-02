import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { LoginService } from 'src/app/services/login/login.service';
import { FormsComponent } from '../forms/forms.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';
import { EditComponent } from 'src/app/shared/edit/edit.component';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { CreateFormComponent } from '../create-form/create-form.component';
import { CreateQuestionComponent } from '../create-question/create-question.component';
import { SeeAnswersComponent } from '../see-answers/see-answers.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  @ViewChild(FormsComponent) formsComponent!: FormsComponent;
  @ViewChild(DeleteComponent) DeleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
  @ViewChild(CreateGroupComponent) createGroupComponent!: CreateGroupComponent;
  @ViewChild(CreateFormComponent) createFormComponent!: CreateFormComponent;
  @ViewChild(CreateQuestionComponent)  createQuestionComponent!: CreateQuestionComponent;
  @ViewChild(SeeAnswersComponent) seeAnswersComponent!: SeeAnswersComponent;

  formGroups: FormGroupModel[] = [];
  selectedGroupId!: number;
  userRole: string | null = null;
  activeMenuIndex: number | null = null;

  constructor(private formgroupService: FormgroupService,private loginService: LoginService) {}

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();
    this.loadGroups();
  }

  loadGroups(): void {
    this.formgroupService.getFormGroups().subscribe((data) => {
      this.formGroups = data;
    });
  }

  toggleMenu(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(): void {
    this.activeMenuIndex = null;
  }

  openModalForm(groupId: number) {
    this.selectedGroupId = groupId;
    setTimeout(() => {
      this.formsComponent.showModal();
      this.formsComponent.loadForm();
    });
  }

  openModalDelete(groupId: number) {
    this.selectedGroupId = groupId;
    setTimeout(() => {
      this.DeleteComponent.itemId = groupId;
      this.DeleteComponent.serviceType = 'group';
      this.DeleteComponent.showModal();
    });
  }

  openModalEdit(groupId: number) {
    this.selectedGroupId = groupId;
    setTimeout(() => {
      this.editComponent.itemId = groupId;
      this.editComponent.serviceType = 'group';
      this.editComponent.showModal();
    });
  }

  openModalCreateGroup() {
    this.createGroupComponent.showModal();
  }

  openModalCreateForm() {
    this.createFormComponent.showModal();
  }

  openModalCreateQuestion() {
    this.createQuestionComponent.showModal();
  }

  openModalSeeAnswers() {
    this.seeAnswersComponent.open();
  }
}
