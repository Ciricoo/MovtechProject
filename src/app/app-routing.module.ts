import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { NpsComponent } from './pages/nps/nps.component';
import { FormBuilderComponent } from './pages/home/form-builder.component';
import { FormsComponent } from './pages/forms/forms.component';
import { QuestionsComponent } from './pages/questions/questions.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: FormBuilderComponent, canActivate: [AuthGuard]},
  {path: 'nps', component: NpsComponent, canActivate: [AuthGuard]},
  {path: 'forms', component: FormsComponent, canActivate: [AuthGuard]},
  {path: 'questions', component: QuestionsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
