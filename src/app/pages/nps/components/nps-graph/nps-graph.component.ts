import { Component, OnInit } from '@angular/core';
import { NpsService } from 'src/app/services/nps/nps.service';

@Component({
  selector: 'app-nps-graph',
  templateUrl: './nps-graph.component.html',
  styleUrls: ['./nps-graph.component.scss']
})
export class NpsGraphComponent implements OnInit {
  npsScore!: number;

  constructor(private npsService: NpsService) {}

  ngOnInit(): void {
    this.npsService.getNpsScore().subscribe(score => {
      this.npsScore = score;
      this.updateNeedlePosition(score);
    });
  }

  // RESPOSTA NÃO É ENVIADA QUANDO SELECIONADA "0"!!!!!!!!!

  updateNeedlePosition(score: number): void {
    const minScore = -100;
    const maxScore = 100;
    
    const angle = ((score - minScore) / (maxScore - minScore)) * 180 - 90; 

    const needleImg = document.querySelector('.needle-img') as HTMLElement;
    if (needleImg) {
      needleImg.style.transform = `rotate(${angle + 180}deg)`; 
    }
  }
}
