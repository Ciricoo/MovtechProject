import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroupModel } from 'src/app/interfaces/FormGroup';
import { FormgroupService } from 'src/app/services/formGroup/formgroup.service';
import { LoginService } from 'src/app/services/login/login.service';
import { NpsService } from 'src/app/services/nps/nps.service';


@Component({
  selector: 'app-nps-graph',
  templateUrl: './nps-graph.component.html',
  styleUrls: ['./nps-graph.component.scss']
})
export class NpsGraphComponent implements OnInit {
  @ViewChild('pointer') pointer!: ElementRef<HTMLImageElement>;
  @ViewChild('nps') nps!: ElementRef<HTMLElement>;
  formGroups: FormGroupModel[] = [];
  npsScore!: number;
  detractors!: string;
  passives!: string;
  promoters!: string;
  role!: string | null;

  constructor(private npsService: NpsService, private loginService: LoginService, private formGroupService: FormgroupService) {}

  ngOnInit(): void {
    this.role = this.loginService.getUserRole();
    if (this.role === 'Administrador') {
    this.npsService.getNpsScore().subscribe(score => {
      this.npsScore = score;
      this.updateNeedlePosition(score);
      this.updateScoreStyle(score);
      this.calculateNps();
    });
  }
}

  updateNeedlePosition(score: number): void {
    const minScore: number = -100;
    const maxScore: number = 100;
   const angle: number = ((score - minScore) / (maxScore - minScore)) * 180 - 90;
    //ajusta o valor do score para   // a divisão serve para transformar a pontuação em uma fração                         
    //trabalhar em relação com a escala // ex: score = 100 resultado = 1, score = -100 resultado = 0
    //ex: score = 100 resultado = 200
    const needleImg: HTMLImageElement = this.pointer.nativeElement;
    needleImg.style.transform = `rotate(${angle}deg)`; 
  }

  updateScoreStyle(score: number): void {
    const npsScoreElement: HTMLElement = this.nps.nativeElement;
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
    this.npsService.npsList().subscribe({
      next: ( npslist: number[] ) => {
      const [promoters, passives, detractors] = npslist;
      const totalResponses: number = promoters + passives + detractors;
      this.promoters = ((promoters / totalResponses) * 100).toFixed(2);
      this.passives = ((passives / totalResponses) * 100).toFixed(2);
      this.detractors = ((detractors / totalResponses) * 100).toFixed(2);
      }
    });
  }
}
