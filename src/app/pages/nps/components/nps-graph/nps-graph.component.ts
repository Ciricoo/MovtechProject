import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NpsService } from 'src/app/services/nps/nps.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nps-graph',
  templateUrl: './nps-graph.component.html',
  styleUrls: ['./nps-graph.component.scss']
})
export class NpsGraphComponent implements OnInit {
  npsScore!: number;
  detractors!: string;
  passives!: string;
  promoters!: string;

  constructor(private npsService: NpsService, private userService: UserService) {}

  ngOnInit(): void {
    this.npsService.getNpsScore().subscribe(score => {
      this.npsScore = score;
      this.updateNeedlePosition(score);
      this.updateScoreStyle(score);
      this.calculateSegments()
    });
  }

  updateNeedlePosition(score: number): void {
    const minScore = -100;
    const maxScore = 100;
    
    const angle = ((score - minScore) / (maxScore - minScore)) * 180 - 90; 

    const needleImg = document.querySelector('.pointer-img') as HTMLElement;
      needleImg.style.transform = `rotate(${angle}deg)`; 
  }

  updateScoreStyle(score: number): void {
    const npsScoreElement = document.getElementById('nps-score');
    if(npsScoreElement){
      npsScoreElement.classList.remove('positive', 'negative', 'neutral');
      if (score >= 50) {
        npsScoreElement.classList.add('positive');
      } else if (score < 0) {
        npsScoreElement.classList.add('negative');
      } else {
        npsScoreElement.classList.add('neutral');
      }
    }
  }

  calculateSegments(): void {
    forkJoin({
      promoters: this.userService.getPromoters(),
      passives: this.userService.getPassives(),
      detractors: this.userService.getDetractors()
    }).subscribe({
      next: ({ promoters, passives, detractors }) => {
      const totalResponses = promoters + passives + detractors;
      this.promoters = ((promoters / totalResponses) * 100).toFixed(2);
      this.passives = ((passives / totalResponses) * 100).toFixed(2);
      this.detractors = ((detractors / totalResponses) * 100).toFixed(2);
      }
    });
  }
}
