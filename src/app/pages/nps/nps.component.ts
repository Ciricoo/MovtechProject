import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-nps',
  templateUrl: './nps.component.html',
  styleUrls: ['./nps.component.scss'],
})
export class NpsComponent implements OnInit {
  role!: string | null;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.role = this.loginService.getUserRole()
    if (this.role != 'Administrador') {
      this.router.navigate(['/home']);
    }
  }
}
