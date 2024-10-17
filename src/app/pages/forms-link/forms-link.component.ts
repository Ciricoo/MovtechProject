import {Component,ElementRef,ViewChild,} from '@angular/core';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { QuestionModel } from 'src/app/interfaces/Question';
import { QuestionService } from 'src/app/services/question/question.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { AnswerService } from 'src/app/services/answer/answer.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { EditComponent } from 'src/app/shared/edit/edit.component';
import { CreateQuestionComponent } from '../../shared/create-question/create-question.component';
import { AnswerModal } from 'src/app/interfaces/Answer';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-forms-link',
  templateUrl: './forms-link.component.html',
  styleUrls: ['./forms-link.component.scss'],
})
export class FormsLinkComponent {
  constructor(
    private questionService: QuestionService,
    private loginService: LoginService,
    private answerService: AnswerService,
    private route: ActivatedRoute,
    private formsService: FormService
  ) {}

  @ViewChild('modalQuestion') modal!: ElementRef<HTMLDialogElement>;
  @ViewChild(DeleteComponent) deleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
  @ViewChild(AlertModalComponent) alertModalComponent!: AlertModalComponent;
  @ViewChild(CreateQuestionComponent)

  createQuestionComponent!: CreateQuestionComponent;
  formId!: number;
  userRole: string | null = null;
  questions: QuestionModel[] = [];
  activeMenuIndex: number | null = null;
  modalType: 'edit' | 'delete' | null = null;
  grades: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  answers: AnswerModal[] = [];
  nameForm!: string;

  ngOnInit(): void {
      this.userRole = this.loginService.getUserRole();
      this.route.params.subscribe((params) => {
        this.formId = params['id'];
        this.loadQuestions();
        this.loadNameForm();
      });
  }

  loadQuestions(): void {
    this.questionService.getQuestionByFormId(this.formId)
      .subscribe((data) => (this.questions = data));
  }

  loadNameForm(): void {
    this.formsService.getFormById(this.formId)
      .subscribe((data) => (this.nameForm = data.name))
  }

  canShow(): boolean {
    if (this.userRole != 'Administrador') {
      return false;
    }
    return true;
  }

  onInputChange(questionId: number,field: keyof AnswerModal,event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    if (target === null) return;

    const answer: AnswerModal = this.answers.find((a) => a.idQuestion === questionId) || {id: 0,grade: null,description: '',idQuestion: questionId,idUser: 0,};

    if (field === 'grade') {
      answer.grade = target.value !== '' ? Number(target.value) : null;
    } else if (field === 'description') {
      answer.description = target.value;
    }

    this.answers = [...this.answers.filter(a => a.idQuestion !== questionId),answer,];
    //atualiza o array removendo a resposta antiga (se houver) e adicionando a nova resposta modificada.
  }

  answersValidator(): boolean{
    for(const question of this.questions){
      const answer: AnswerModal | undefined = this.answers.find(a => a.idQuestion === question.id);
  
      if(answer?.description && answer.description.length > 150){
        this.alertModalComponent.open("Limite de caracteres na descrição excedido!");
        return false;
      }
  
      if(!answer || answer.grade == null){
        this.alertModalComponent.open('Por favor, selecione uma nota para todas as perguntas antes de enviar as respostas!');
        return false;
      }
    };
    return true;
  }

  submitAnswers(): void {
    if(!this.answersValidator())
      return
    
    this.answerService.sendAnswer(this.answers).subscribe(() => {
      this.alertModalComponent.open('Respostas enviadas com sucesso!');
      this.answers = [];
      this.alertModalComponent.goToHome = true;
    });
  }
}
