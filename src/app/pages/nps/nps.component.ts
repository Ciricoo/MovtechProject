import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nps',
  templateUrl: './nps.component.html',
  styleUrls: ['./nps.component.scss'],
})
export class NpsComponent implements OnInit {
  role!: string | null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role != 'Administrador') {
      this.router.navigate(['/home']);
    }
  }
}
