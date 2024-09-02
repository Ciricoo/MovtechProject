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
  selectedQuestionId!: number;
  questions: QuestionModel[] = [];
  activeMenuIndex: number | null = null;
  modalType: 'edit' | 'delete' | null = null;
  grades: number[] = Array.from({ length: 11 }, (_, i) => i);
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
    this.selectedQuestionId = questionId;
    setTimeout(() => {
      this.deleteComponent.itemId = questionId;
      this.deleteComponent.serviceType = 'question';
      this.deleteComponent.showModal();
    });
  }

  openModalEdit(questionId: number) {
    this.selectedQuestionId = questionId;
    setTimeout(() => {
      this.editComponent.itemId = questionId;
      this.editComponent.serviceType = 'question';
      this.editComponent.showModal();
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

  onInputChange(questionId: number, field: keyof AnswerModal, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement
    if (target === null) return;
  
    const answer = this.answers.find(a => a.idQuestion === questionId) || {id: 0,grade: 0,description: '',idQuestion: questionId,idUser: 0,};
  
    if (field === 'grade') {
      answer.grade = Number(target.value);
    } else {
      answer.description = target.value;
    }
  
    this.answers = [...this.answers.filter(a => a.idQuestion !== questionId), answer];
  }

  submitAnswers(): void {
    if(this.answers.length){
      this.answerService.sendAnswer(this.answers).subscribe(() => this.closeModal());
      this.alertModalComponent.open('Respostas enviadas com sucesso!');
    }else {
      this.alertModalComponent.open('Nenhuma resposta para enviar!');
    }
  }

}
