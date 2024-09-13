import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { AnswerModal } from 'src/app/interfaces/Answer';
import { QuestionModel } from 'src/app/interfaces/Question';
import { AnswerService } from 'src/app/services/answer/answer.service';
import { LoginService } from 'src/app/services/login/login.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { EditComponent } from 'src/app/shared/edit/edit.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  @ViewChild('modalQuestion') modal!: ElementRef<HTMLDialogElement>;
  @ViewChild(DeleteComponent) deleteComponent!: DeleteComponent;
  @ViewChild(EditComponent) editComponent!: EditComponent;
  @ViewChild(AlertModalComponent) alertModalComponent!: AlertModalComponent;
  @Input() formId!: number;
  
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

  showModal(): void {
    this.modal.nativeElement.showModal();
  }

  closeModal(): void {
    this.modal.nativeElement.close();
  }

  openModalDelete(questionId: number) {
      this.deleteComponent.itemId = questionId;
      this.deleteComponent.serviceType = 'question';
      this.deleteComponent.showModal();
  }

  openModalEdit(questionId: number) {
      this.editComponent.itemId = questionId;
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

  onInputChange(questionId: number, field: keyof AnswerModal, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    if (target === null) return;
  
    const answer = this.answers.find(a => a.idQuestion === questionId) || {id: 0,grade: null, description: '',idQuestion: questionId,idUser: 0,};

    if (field === 'grade') {
      answer.grade = target.value !== '' ? Number(target.value) : null; 
    } else if (field === 'description'){
      answer.description = target.value;
    }
  
    this.answers = [...this.answers.filter(a => a.idQuestion !== questionId), answer]; 
    //atualiza o array removendo a resposta antiga (se houver) e adicionando a nova resposta modificada.
  }

  submitAnswers(): void {
    const filteredAnswers = this.answers.filter(answer => answer.grade !== null);
  
    if (filteredAnswers.length == 0 || this.answers.length == 0) {
      this.alertModalComponent.open('Por favor, selecione uma nota antes de enviar as respostas!');
      return;
    }
  
    this.answerService.sendAnswer(filteredAnswers).subscribe(() => {
      this.closeModal();
     this.alertModalComponent.open('Respostas enviadas com sucesso!');
      this.answers = [];
    });
  }
}
