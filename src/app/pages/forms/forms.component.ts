import { Component, HostListener, ViewChild } from '@angular/core';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { EditComponent } from 'src/app/shared/edit/edit.component';
import { CreateFormComponent } from '../../shared/create-form/create-form.component';
import { SeeAnswersComponent } from '../../shared/see-answers/see-answers.component';
import { FormModel } from 'src/app/interfaces/Form';
import { FormService } from 'src/app/services/form/form.service';
import { LoginService } from 'src/app/services/login/login.service';
import { QuestionsModalComponent } from '../../shared/questions-modal/questions-modal.component';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  @ViewChild(QuestionsModalComponent) questionComponent!: QuestionsModalComponent;
  @ViewChild(DeleteComponent) deleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
  @ViewChild(CreateFormComponent) createFormComponent!: CreateFormComponent;
  @ViewChild(SeeAnswersComponent) seeAnswersComponent!: SeeAnswersComponent;

  forms: FormModel[] = [];
  groups: FormGroupModel[] = [];
  filteredForms: FormModel[] = [];
  userRole: string | null = null;
  activeMenuIndex: number | null = null;
  formId!: number;
  searchTerm!: string;

  constructor(private formService: FormService,private loginService: LoginService, private formGroupService: FormgroupService) {}

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();
    this.loadFormsAndGroups();
  }

  loadFormsAndGroups(): void {
      this.formService.getForms().subscribe((data) => {
        this.forms = data;
        this.filteredForms = data;

        this.formGroupService.getFormGroups().subscribe((data) => {
          this.groups = data;
          this.associateGroupName();
        })
        this.filterForms(this.searchTerm);
      });
  }

  associateGroupName(): void{
    this.forms.forEach(form => {
      const group = this.groups.find(g => g.id == form.idFormsGroup);
      if(group)
        form.groupName = group.name;
    })
  }

  canShow(): boolean{
    if(this.userRole != 'Administrador'){
      return false
    }
    return true
  }

  filterForms(search:string): void{
    this.searchTerm = search
    if(search){
      this.filteredForms = this.forms.filter(form =>
        form.name.toLowerCase().includes(search.toLowerCase())
      );
    }else {
      this.filteredForms = this.forms; 
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

  openModalQuestion(formId: number, formName: string): void {
    this.questionComponent.formId = formId;
    this.questionComponent.formName = formName;
    setTimeout(() => {
      this.questionComponent.showModal();
      this.questionComponent.loadQuestion();
    });
  }

  openModalDelete(formId: number): void {
    this.deleteComponent.itemId = formId;
    this.deleteComponent.serviceType = 'form';
    this.deleteComponent.showModal();
  }

  openModalEdit(formId: number, formName: string, groupId: number): void {
    this.editComponent.itemId = formId;
    this.editComponent.oldName = formName;
    this.editComponent.currentGroupId = groupId;
    this.editComponent.serviceType = 'form';
    this.editComponent.showModal();
  }
  openModalCreateForm(): void {
    this.createFormComponent.showModal();
  }
  
  openModalSeeAnswers(): void {
    this.seeAnswersComponent.open();
  }
}
