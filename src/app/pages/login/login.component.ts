import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  if (this.loginService.isTokenExpired()) {
    localStorage.removeItem('token');
    localStorage.removeItem('username')
  } else if (localStorage.getItem('token')) {
    this.router.navigate(['/home']);
  }
}
  
  onSubmit() {
    if(this.loginForm.invalid){
      return;
    }
 const loginData = this.loginForm.value;
    this.loginService.login(loginData).subscribe(
      (response) => {
        this.router.navigate(['/home']);
        console.log('Login successful:', response);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

}

