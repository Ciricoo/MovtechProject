import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-nps-graph',
  templateUrl: './nps-graph.component.html',
  styleUrls: ['./nps-graph.component.scss']
})
export class NpsGraphComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.createMainChart();
    this.createSideCharts();
  }

  createMainChart() {
    const ctx = (document.getElementById('mainChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Promoters', 'Passives', 'Detractors'],
          datasets: [{
            data: [50, 30, 20],
            backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
            borderWidth: 0,
          }]
        },
        options: {
          rotation: -90,
          circumference: 180,
          cutout: '70%',
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }

  createSideCharts() {
    const sideChartsData = [80, 50];
    const sideChartsColors = ['#4caf50', '#f44336'];

    ['leftChart', 'rightChart'].forEach((id, index) => {
      const ctx = (document.getElementById(id) as HTMLCanvasElement).getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Data'],
            datasets: [{
              data: [sideChartsData[index], 100 - sideChartsData[index]],
              backgroundColor: [sideChartsColors[index], '#e0e0e0'],
              borderWidth: 0,
            }]
          },
          options: {
            rotation: -90,
            circumference: 180,
            cutout: '70%',
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      }
    });
  }
}