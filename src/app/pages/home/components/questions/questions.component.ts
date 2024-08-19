import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { QuestionModel } from 'src/app/interfaces/Question';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  @ViewChild('modalQuestion') modal!: ElementRef<HTMLDialogElement>;
  @Input() formId!: number;
  selectedQuestionId!: number;
  questions: QuestionModel[] = [];
  activeMenuIndex: number | null = null;
  modalType: 'edit' | 'delete' | null = null;

  constructor(private questionService: QuestionService) {}

  loadQuestion(): void {
    this.questionService.getQuestionByFormId(this.formId).subscribe(
      (data) => {
        this.questions = data;
        console.log('Perguntas recebidos:', this.questions);
      },
      (error) => {
        console.error('Erro ao buscar perguntas:', error);
      }
    );
  }

  openModal(type: 'delete' | 'edit', formId: number) {
    this.modalType = type;
    this.selectedQuestionId = formId;
    setTimeout(() => {
      
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
}
