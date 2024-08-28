import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.loginService.isTokenExpired()) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
    } else if (localStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Todos os campos são obrigatórios.';
      return;
    }

    const loginData = this.loginForm.value;
    this.loginService.login(loginData).subscribe(
      (response) => {
        this.router.navigate(['/home']);
        console.log('Login successful:', response);
        this.errorMessage = null; 
      },
      (error) => {
        if (error.status === 500) {
          this.errorMessage = 'Credenciais inválidas.';
        } 
        console.error('Login failed:', error);
      }
    );
  }
}
