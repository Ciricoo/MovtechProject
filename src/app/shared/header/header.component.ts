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

  logout(){
    this.loginService.logout();
  }

  Home(){
    this.router.navigate(['/home']);
  }

  Nps(){
    this.router.navigate(['/nps']);
  }

  Forms(){
    this.router.navigate(['/forms'])
  }

  Questions(){
    this.router.navigate(['/questions'])
  }

  // onSearchChange(event: Event){
  //   const input = event?.target as HTMLInputElement;
  //   if(input){
  //     const value = input.value.trim();
  //     this.searchGroup.emit(value);
  //   }
 //}
}

