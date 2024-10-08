import {Component,ElementRef,HostListener,Input,ViewChild,} from '@angular/core';
import { AnswerModal } from 'src/app/interfaces/Answer';
import { QuestionModel } from 'src/app/interfaces/Question';
import { AnswerService } from 'src/app/services/answer/answer.service';
import { LoginService } from 'src/app/services/login/login.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { EditComponent } from 'src/app/shared/edit/edit.component';
import { CreateQuestionComponent } from '../create-question/create-question.component';

@Component({
  selector: 'app-questions-modal',
  templateUrl: './questions-modal.component.html',
  styleUrls: ['./questions-modal.component.scss'],
})
export class QuestionsModalComponent {
  @ViewChild('modalQuestion') modal!: ElementRef<HTMLDialogElement>;
  @ViewChild(DeleteComponent) deleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
  @ViewChild(AlertModalComponent) alertModalComponent!: AlertModalComponent;
  @ViewChild(CreateQuestionComponent)  createQuestionComponent!: CreateQuestionComponent;
  @Input() formId!: number;
  @Input() formName!: string;
  
  userRole: string | null = null;
  questions: QuestionModel[] = [];
  activeMenuIndex: number | null = null;
  modalType: 'edit' | 'delete' | null = null;
  grades: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  answers: AnswerModal[] = [];

  constructor(private questionService: QuestionService, private loginService: LoginService, private answerService: AnswerService) {}

  loadQuestion(): void {
    this.userRole = this.loginService.getUserRole();
    this.questionService.getQuestionByFormId(this.formId).subscribe((data) => (this.questions = data));
  }

  canShow(): boolean{
    if(this.userRole != 'Administrador'){
      return false
    }
    return true
  }

  showModal(): void {
    this.modal.nativeElement.showModal();
  }

  closeModal(): void {
    this.modal.nativeElement.close();
    this.answers = [];
  }

  openModalDelete(questionId: number): void {
      this.deleteComponent.itemId = questionId;
      this.deleteComponent.serviceType = 'question';
      this.deleteComponent.showModal();
  }

  openModalEdit(questionId: number, questionName: string): void {
      this.editComponent.itemId = questionId;
      this.editComponent.oldName = questionName
      this.editComponent.serviceType = 'question';
      this.editComponent.currentFormId = this.formId;
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
    this.createQuestionComponent.currentFormId = this.formId;
    this.createQuestionComponent.showModal();
  }
  
  onInputChange(questionId: number, field: keyof AnswerModal, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    if (target === null) return;
  
    const answer: AnswerModal = this.answers.find(a => a.idQuestion === questionId) || {id: 0,grade: null, description: '',idQuestion: questionId,idUser: 0,};

    if (field === 'grade') {
      answer.grade = target.value !== '' ? Number(target.value) : null; 
    } else if (field === 'description'){
      answer.description = target.value;
    }
  
    this.answers = [...this.answers.filter(a => a.idQuestion !== questionId), answer]; 
    //atualiza o array removendo a resposta antiga (se houver) e adicionando a nova resposta modificada.
  }

  submitAnswers(): void {
    for(const question of this.questions){
      const answer: AnswerModal | undefined = this.answers.find(a => a.idQuestion === question.id);

      if(answer?.description && answer.description.length > 150){
        this.alertModalComponent.open("Limite de caracteres na descrição excedido!");
        return;
      }

      if(!answer || answer.grade == null){
        this.alertModalComponent.open('Por favor, selecione uma nota para todas as perguntas antes de enviar as respostas!');
        return;
      }
    };

    this.answerService.sendAnswer(this.answers).subscribe(() => {
      this.closeModal();
      this.alertModalComponent.open('Respostas enviadas com sucesso!');
      this.answers = [];
    });
  }

}
