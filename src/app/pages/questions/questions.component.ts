import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { EditComponent } from 'src/app/shared/edit/edit.component';
import { CreateQuestionComponent } from '../../shared/create-question/create-question.component';
import { SeeAnswersComponent } from '../../shared/see-answers/see-answers.component';
import { QuestionModel } from 'src/app/interfaces/Question';
import { AnswerModal } from 'src/app/interfaces/Answer';
import { QuestionService } from 'src/app/services/question/question.service';
import { LoginService } from 'src/app/services/login/login.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { FormService } from 'src/app/services/form/form.service';
import { FormModel } from 'src/app/interfaces/Form';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {
  @ViewChild(DeleteComponent) deleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
  @ViewChild(CreateQuestionComponent) createQuestionComponent!: CreateQuestionComponent;
  @ViewChild(SeeAnswersComponent) seeAnswersComponent!: SeeAnswersComponent;
  @ViewChild(AlertModalComponent) alertModalComponent!: AlertModalComponent;

  @Input() formId!: number;
  @Input() formName!: string;
  
  userRole: string | null = null;
  questions: QuestionModel[] = [];
  forms: FormModel[] = [];
  activeMenuIndex: number | null = null;
  modalType: 'edit' | 'delete' | null = null;
  grades: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  answers: AnswerModal[] = [];
  filteredQuestions: QuestionModel[] = []

  constructor(private questionService: QuestionService, private loginService: LoginService, private formService: FormService) {}

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();
    this.loadQuestion();
  }

  loadQuestion(): void {
    this.userRole = this.loginService.getUserRole();
    this.questionService.getQuestion().subscribe((data) => {
      this.questions = data;
      this.filteredQuestions = data;

      this.formService.getForms().subscribe((data) => {
        console.log(data)
        this.forms = data;
        this.associatedFormName();
      })
    });
  }

  associatedFormName(): void{
    this.questions.forEach(question => {
      console.log(question)
      const form = this.forms.find(f => f.id == question.idForms);
      if(form)
        question.formName = form.name;
    })
  }

  canShow(): boolean{
    if(this.userRole != 'Administrador'){
      return false
    }
    return true
  }

  filterQuestions(search: string): void{
    if(search.trim()){
      this.filteredQuestions = this.questions.filter(question =>
        question.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    } else{
      this.filteredQuestions = this.questions;
    }
  }

  openModalDelete(questionId: number): void {
      this.deleteComponent.itemId = questionId;
      this.deleteComponent.serviceType = 'question';
      this.deleteComponent.showModal();
  }

  openModalEdit(questionId: number, questionName: string, idForms: number): void {
      this.editComponent.itemId = questionId;
      this.editComponent.oldName = questionName;
      this.editComponent.currentFormId = idForms;
      this.editComponent.serviceType = 'question';
      this.editComponent.showModal();
  }
  
  toggleMenu(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(): void {
    this.activeMenuIndex = null;
  }

  openModalCreateQuestion(): void {
    this.createQuestionComponent.showModal();
  }
  
  openModalSeeAnswers(): void {
    this.seeAnswersComponent.open();
  }
}
