import { Component, ElementRef, ViewChild } from '@angular/core';
import { QuestionModel } from 'src/app/interfaces/Question';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-see-answers',
  templateUrl: './see-answers.component.html',
  styleUrls: ['./see-answers.component.scss']
})
export class SeeAnswersComponent {
  @ViewChild('alertModal') modal!: ElementRef<HTMLDialogElement>;
  questions!: QuestionModel[];
  selectedQuestionId!: number;

  constructor(private questionService: QuestionService){}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestion().subscribe((data) => {this.questions = data;});
  }

  open(): void {
    this.modal.nativeElement.showModal();
  }

  close(): void {
    this.modal.nativeElement.close();
  }
}
