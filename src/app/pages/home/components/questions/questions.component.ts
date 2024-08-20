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

  openModal(type: 'delete' | 'edit', questionId: number) {
    this.modalType = type;
    this.selectedQuestionId = questionId;
    setTimeout(() => {
      if (type === 'delete') {
        console.log(questionId);
        this.deleteComponent.itemId = questionId;
        this.deleteComponent.serviceType = 'question';
        this.deleteComponent.showModal();
      } else if (type === 'edit') {
        this.editComponent.itemId = questionId;
        this.editComponent.serviceType = 'question';
        this.editComponent.showModal();
      }
    });
  }

  showModal(): void {
    this.modal.nativeElement.showModal();
  }

  closeModal(): void {
    this.modal.nativeElement.close();
  }

  toggleMenu(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    this.activeMenuIndex = null;
  }

  onInputChange(questionId: number, field: 'grade' | 'description', event: Event): void{
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const value = target.value;

    const answers = this.answers.find(a => a.idQuestion == questionId) || {
      id: 0, grade: 0, description: '', idQuestion: questionId, idUser: 0
    }

    if(field === 'grade'){
      answers.grade = Number(value);
    }else{
      answers.description = value.toString();
    }

    this.answers = [...this.answers.filter(a => a.idQuestion !== questionId), answers];    
  }

  submitAnswers(): void {
    this.answerService.sendAnswer(this.answers).subscribe(() => this.closeModal());
  }

}
