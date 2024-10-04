import { Component, HostListener, ViewChild } from '@angular/core';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { EditComponent } from 'src/app/shared/edit/edit.component';
import { CreateFormComponent } from '../../shared/create-form/create-form.component';
import { SeeAnswersComponent } from '../../shared/see-answers/see-answers.component';
import { FormModel } from 'src/app/interfaces/Form';
import { FormService } from 'src/app/services/form/form.service';
import { LoginService } from 'src/app/services/login/login.service';
import { QuestionsModalComponent } from '../../shared/questions-modal/questions-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  @ViewChild(DeleteComponent) deleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
  @ViewChild(CreateFormComponent) createFormComponent!: CreateFormComponent;
  @ViewChild(SeeAnswersComponent) seeAnswersComponent!: SeeAnswersComponent;
  @ViewChild(QuestionsModalComponent) questionComponent!: QuestionsModalComponent;

  forms: FormModel[] = [];
  filteredForms: FormModel[] = [];
  userRole: string | null = null;
  activeMenuIndex: number | null = null;
  formId!: number;

  constructor(private formService: FormService,private loginService: LoginService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();
    this.loadForms();
  }

  loadForms(): void {
      this.formService.getForms().subscribe((data) => {
        this.forms = data;
        this.filteredForms = data;
      });
  }

  canShow(): boolean{
    if(this.userRole != 'Administrador'){
      return false
    }
    return true
  }

  filterForms(search:string): void{
    if(search.trim()){
      this.filteredForms = this.forms.filter(form =>
        form.name.toLowerCase().includes(search.toLowerCase())
      );
    }else {
      this.filteredForms = [...this.forms]; 
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

  openModalDelete(formId: number, event: MouseEvent): void {
    this.handleClickOutside();
    event.stopPropagation();
    this.deleteComponent.itemId = formId;
    this.deleteComponent.serviceType = 'form';
    this.deleteComponent.showModal();
  }

  openModalEdit(formId: number, formName: string, event: MouseEvent): void {
    this.handleClickOutside();
    event.stopPropagation();
    this.editComponent.itemId = formId;
    this.editComponent.oldName = formName;
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
