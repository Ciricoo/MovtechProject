import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  username: string | null = null;
  userRole: string | null = null;
  @Input() IsNps: boolean = false;

  constructor(private loginService: LoginService, private router: Router){}

  ngOnInit(): void{
    this.userRole = this.loginService.getUserRole();
    this.username = localStorage.getItem('name');
  }

  logout(){
    this.loginService.logout();
  }

  Home(){
    this.router.navigate(['/home']);
  }

  Nps(){
    this.router.navigate(['/nps']);
  }
}
