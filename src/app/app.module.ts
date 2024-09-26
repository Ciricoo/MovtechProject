import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormBuilderComponent } from './pages/home/form-builder.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModalComponent } from './pages/home/components/forms-modal/forms-modalcomponent';
import { DeleteComponent } from './shared/delete/delete.component';
import { EditComponent } from './shared/edit/edit.component';
import { QuestionsModalComponent } from './pages/home/components/questions-modal/questions-modal.component';
import { CreateGroupComponent } from './pages/home/components/create-group/create-group.component';
import { CreateFormComponent } from './pages/home/components/create-form/create-form.component';
import { CreateQuestionComponent } from './pages/home/components/create-question/create-question.component';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { SeeAnswersComponent } from './pages/home/components/see-answers/see-answers.component';
import { NpsComponent } from './pages/nps/nps.component';
import { NpsGraphComponent } from './pages/nps/components/nps-graph/nps-graph.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { FormsComponent } from './pages/forms/forms.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { SearchComponent } from './shared/search/search.component';
import { FormsLinkComponent } from './pages/forms-link/forms-link.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormBuilderComponent,
    HeaderComponent,
    FormsModalComponent,
    DeleteComponent,
    EditComponent,
    QuestionsModalComponent,
    CreateGroupComponent,
    CreateFormComponent,
    CreateQuestionComponent,
    AlertModalComponent,
    SeeAnswersComponent,
    NpsComponent,
    NpsGraphComponent,
    FormsComponent,
    QuestionsComponent,
    SearchComponent,
    FormsLinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
