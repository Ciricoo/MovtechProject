import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() searchGroup: EventEmitter<string> = new EventEmitter<string>();
  username: string | null = null;
  userRole: string | null = null;
  @Input() IsNps: boolean = false;
  @Input() IsForms: boolean = false;
  @Input() IsQuestion: boolean = false;

  constructor(private loginService: LoginService, private router: Router){}

  ngOnInit(): void{
    this.userRole = this.loginService.getUserRole();
    this.username = localStorage.getItem('name');
  }

  canShow(): boolean{
    if(this.userRole != 'Administrador'){
      return false
    }
    return true
  }

  logout(): void {
    this.loginService.logout();
  }

  Home(): void {
    this.router.navigate(['/home']);
  }

  Nps(): void {
    this.router.navigate(['/nps']);
  }

  Forms(): void {
    this.router.navigate(['/forms'])
  }

  Questions(): void {
    this.router.navigate(['/questions'])
  }
}

