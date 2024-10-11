import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() currentPage: string = 'home';

  constructor(private loginService: LoginService, private router: Router){}

  ngOnInit(): void{
    this.userRole = this.loginService.getUserRole();
    this.username = localStorage.getItem('name');
  }

  canShow(): boolean{
    return this.userRole === 'Administrador';
  }

  logout(): void {
    this.loginService.logout();
  }

  navigate(page: string): void{
    this.currentPage = page
    this.router.navigate([`/${page}`]);
  }
}

