import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  username: string | null = null;

  constructor(private loginService: LoginService, private router: Router){}

  ngOnInit(): void{
    this.username = this.loginService.getUsername();
  }

  logout(){
    this.loginService.logout()
    this.router.navigate(['/login'])
  }
}
