import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormModel } from 'src/app/interfaces/Form';
import { QuestionModel } from 'src/app/interfaces/Question';
import { FormService } from 'src/app/services/form/form.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent {
  @ViewChild('createQuestion') modal!: ElementRef<HTMLDialogElement>;
  @ViewChild(AlertModalComponent) alertModalComponent!: AlertModalComponent;
  @Output() createdConfirmed = new EventEmitter<number>();
  @Input() currentFormId!: number;
  
  selectedFormId: number = 0;
  forms: FormModel[] = [];
  questions: QuestionModel[] = [];
  errorMessage: string | null = null;

  constructor(private formService: FormService, private questionService: QuestionService) {}

  loadForms(): void {
    this.formService.getForms().subscribe((data) => {this.forms = data;});
  }

  showModal(): void {
    this.modal.nativeElement.showModal();
    this.selectedFormId = this.currentFormId;
    this.addQuestion();
    this.loadForms();
  }

  closeModal(): void {
    this.modal.nativeElement.close();
    this.resetForm();
    this.errorMessage = '';
  }

  verificaQuestions(): boolean{
    this.errorMessage = null;

    if(this.selectedFormId == 0 || this.selectedFormId == undefined){
      this.errorMessage = 'O formulário precisa ser preenchido.';
      return false;
    }

    for (const question of this.questions) {
      if (!question.text.trim()) {
          this.errorMessage = `O conteúdo das perguntas não pode estar vazio.`;
          return false;
      }

      if(question.text.length > 150){
        this.errorMessage = 'O conteúdo das perguntas não pode passar de 150 caracteres.';
        return false;
      }
    }

    return true;
  }

  submit(): void {
    if(!this.verificaQuestions()){
      return;
    }
    const questions: QuestionModel[] = this.questions.map((question) => ({id: 0,text: question.text, idForms: this.selectedFormId,}));
    this.questionService.createQuestion(questions).subscribe(() => {
      this.closeModal();
      this.resetForm();
      this.createdConfirmed.emit()
      this.alertModalComponent.open('Pergunta criada com sucesso!');
    })
  }

  resetForm(): void {
    this.selectedFormId = 0;
    this.questions = [];
  }

  
  addQuestion(): void {
    this.questions.push({
      id: this.questions.length + 1,
      text: '',
      idForms: 0,
    });
  }

  deleteQuestion(index: number): void {
    this.questions.splice(index, 1);
  }
}
