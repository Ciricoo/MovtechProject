import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/interfaces/Login';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  returnUrl: string | null = null;

  constructor(private fb: FormBuilder,private loginService: LoginService,private router: Router,private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.loginService.isTokenExpired()) {
      this.loginService.logout();
      this.loginService.clearLocalStorage();
    }
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/home';
    });

    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Todos os campos são obrigatórios.';
      return;
    }
    const loginData: Login = this.loginForm.value;
    this.loginService.login(loginData).subscribe(
      () => {
        this.router.navigate([this.returnUrl]);
        this.errorMessage = null;
      },
      (error) => {
        if (error.status === 500) {
          this.errorMessage = 'Credenciais inválidas.';
        }
      }
    );
  }
}
