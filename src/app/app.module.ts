import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormBuilderComponent } from './pages/home/components/formsGroup/form-builder.component';
import { HeaderComponent } from './pages/home/components/header/header.component';
import { FormsComponent } from './pages/home/components/forms/forms.component';
import { DeleteComponent } from './shared/delete/delete.component';
import { EditComponent } from './shared/edit/edit.component';
import { QuestionsComponent } from './pages/home/components/questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormBuilderComponent,
    HeaderComponent,
    FormsComponent,
    DeleteComponent,
    EditComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
