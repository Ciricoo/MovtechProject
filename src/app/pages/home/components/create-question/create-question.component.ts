import { Component, ElementRef, ViewChild } from '@angular/core';
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
  
  selectedFormId: number = 0;
  forms: FormModel[] = [];
  questions: QuestionModel[] = [];
  errorMessage: string | null = null;

  constructor(private formService: FormService, private questionService: QuestionService) {}

  loadForms() {
    this.formService.getForms().subscribe((data) => {this.forms = data;});
  }

  showModal() {
    this.modal.nativeElement.showModal();
    this.addQuestion();
    this.loadForms();
  }

  closeModal() {
    this.modal.nativeElement.close();
    this.resetForm();
    this.errorMessage = '';
  }

  verificaQuestions(): boolean{
    this.errorMessage = null;

    if(this.selectedFormId == 0){
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

  submit() {
    if(!this.verificaQuestions()){
      return;
    }
    const questions = this.questions.map((question) => ({id: 0,text: question.text,IdForms: this.selectedFormId,}));
    this.questionService.createQuestion(questions).subscribe(() => {
      this.closeModal();
      this.resetForm();
      this.alertModalComponent.open('Pergunta criada com sucesso!');
    })
  }

  resetForm() {
    this.selectedFormId = 0;
    this.questions = [];
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
