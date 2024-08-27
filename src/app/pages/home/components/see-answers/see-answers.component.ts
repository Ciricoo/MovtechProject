import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnswerModal } from 'src/app/interfaces/Answer';
import { QuestionModel } from 'src/app/interfaces/Question';
import { AnswerService } from 'src/app/services/answer/answer.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-see-answers',
  templateUrl: './see-answers.component.html',
  styleUrls: ['./see-answers.component.scss']
})
export class SeeAnswersComponent {
  @ViewChild('alertModal') modal!: ElementRef<HTMLDialogElement>;
  questions!: QuestionModel[];
  users: { id: number, name: string }[] = [];
  answers: AnswerModal[] = [];
  selectedQuestionId!: number;
  selectedUserId!: number;
  mensageError: boolean = false;
  isQuestionMode = true;

  constructor(private questionService: QuestionService, private answerService: AnswerService, private userService: UserService){}

  ngOnInit(): void {
    this.loadQuestions();
    this.loadUsers();
  }

  loadQuestions() {
    this.questionService.getQuestion().subscribe((data) => {this.questions = data;});
  }

  loadUsers(){
    this.userService.getUsers().subscribe((data) => {this.users = data});
  }

  toggleMode():void {
    this.isQuestionMode = !this.isQuestionMode;
    this.answers = [];
    this.mensageError = false
  }
  
  onSelectionChange(): void {
    if (this.isQuestionMode && this.selectedQuestionId) {
      this.loadAnswersByQuestion(this.selectedQuestionId);
    } else if (!this.isQuestionMode && this.selectedUserId) {
      this.loadAnswersByUser(this.selectedUserId);
    }
  }
  
  loadAnswersByQuestion(questionId: number): void {
    this.mensageError = false
    this.answerService.getAnswersByQuestionId(questionId)
    .subscribe((data) => {
      this.answers = data;
      if(this.answers.length == 0)
        this.mensageError = true;
      this.loadUsernames();
    });
  }
  
  loadAnswersByUser(userId: number): void {
    this.mensageError = false
    this.answerService.getAnswersByUserId(userId)
      .subscribe((data) => {
        this.answers = data;
        if(this.answers.length == 0)
          this.mensageError = true;
        this.loadQuestionText();
      });
  }

  loadUsernames(): void {
    for (let i = 0; i < this.answers.length; i++) {
      this.userService.getUserById(this.answers[i].idUser)
        .subscribe((data) => {
          this.answers[i].username = data.name;
        });
    }
  }

  loadQuestionText(): void {
    for( let i = 0; i < this.answers.length; i++){
      this.questionService.getQuestionById(this.answers[i].idQuestion)
      .subscribe((data) => {
        this.answers[i].QuestionText = data.text;
      })
    }
  }

  open(): void {
    this.modal.nativeElement.showModal();
  }

  close(): void {
    this.modal.nativeElement.close();
    this.answers = [];
  }
}
