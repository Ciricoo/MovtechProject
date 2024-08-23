import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/Form';
import { QuestionModel } from 'src/app/interfaces/Question';
import { FormService } from 'src/app/services/form/form.service';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent {
  @ViewChild('createQuestion') modal!: ElementRef<HTMLDialogElement>;
  selectedFormId: number = 0;
  forms: FormModel[] = [];
  questions: QuestionModel[] = [];
  questionName: string = '';

  constructor(private formService: FormService, private questionService: QuestionService) {}


  ngOnInit(): void {
    this.loadForms();
  }

  loadForms() {
    this.formService.getForms().subscribe((data) => {this.forms = data;});
  }

  showModal() {
    this.modal.nativeElement.showModal();
    this.addQuestion();
  }

  closeModal() {
    this.questions = [];
    this.modal.nativeElement.close();
  }

  submit() {
    const questions = this.questions.map((question) => ({id: 0,text: question.text,IdForms: this.selectedFormId,}));

    this.questionService.createQuestion(questions).subscribe(() => {
      this.closeModal();
    })
  }
  
  addQuestion() {
    this.questions.push({
      id: this.questions.length + 1,
      text: '',
      IdForms: 0,
    });
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }
}
