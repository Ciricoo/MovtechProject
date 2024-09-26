import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { NpsService } from 'src/app/services/nps/nps.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nps-graph',
  templateUrl: './nps-graph.component.html',
  styleUrls: ['./nps-graph.component.scss']
})
export class NpsGraphComponent implements OnInit {
  @ViewChild('pointer') pointer!: ElementRef<HTMLDialogElement>;
  @ViewChild('nps') nps!: ElementRef<HTMLDialogElement>;
  npsScore!: number;
  detractors!: string;
  passives!: string;
  promoters!: string;
  role!: string | null;

  constructor(private npsService: NpsService, private userService: UserService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.role = this.loginService.getUserRole()
    if (this.role === 'Administrador') {
    this.npsService.getNpsScore().subscribe(score => {
      this.npsScore = score;
      this.updateNeedlePosition(score);
      this.updateScoreStyle(score);
      this.calculateNps()
    });
  }
}

  updateNeedlePosition(score: number): void {
    const minScore: number = -100;
    const maxScore: number = 100;
    const angle: number = ((score - minScore) / (maxScore - minScore)) * 180 -90; // *180 converte em angulo e -90 porque se não ele ficaria deitado 90 graus, assim ele fica no meio
    //ajusta o valor do score para   // a divisão serve para transformar a pontuação em uma fração                         
    //trabalhar em relação com a escala // ex: score = 100 resultado = 1, score = -100 resultado = 0
    //ex: score = 100 resultado = 200
    const needleImg: HTMLDialogElement = this.pointer.nativeElement;
    needleImg.style.transform = `rotate(${angle}deg)`; 
  }

  updateScoreStyle(score: number): void {
    const npsScoreElement: HTMLDialogElement = this.nps.nativeElement;
      npsScoreElement.classList.remove('positive', 'negative', 'passive');
      if (score >= 50) {
        npsScoreElement.classList.add('positive');
      } else if (score < 0) {
        npsScoreElement.classList.add('negative');
      } else {
        npsScoreElement.classList.add('passive');
      }
  }

  calculateNps(): void {
    this.userService.npsList().subscribe({
      next: ( npslist: number[] ) => {
      const [promoters, passives, detractors] = npslist
      const totalResponses: number = promoters + passives + detractors;
      this.promoters = ((promoters / totalResponses) * 100).toFixed(2);
      this.passives = ((passives / totalResponses) * 100).toFixed(2);
      this.detractors = ((detractors / totalResponses) * 100).toFixed(2);
      }
    });
  }
}
