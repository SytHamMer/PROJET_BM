import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PiechartBudgetService } from '../services/piechart-budget.service';
declare const ApexCharts: any;

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-pie-chart',
  templateUrl: './piechart-budget.component.html',
  styleUrls: ['./piechart-budget.component.scss'],
})
export class PieChartComponent {

  constructor(private pieChartService: PiechartBudgetService) { }

  ngOnInit(): void {
    this.updateChart();
  }

  updateChart(): void {
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;

    this.pieChartService.getSpendingBetweenDates(startDate, endDate).subscribe(
      (data) => {
        // Mettre à jour les données du graphique avec les données reçues du service
        const chartOptions = this.getChartOptions(data); // Utilisez les données reçues pour construire les nouvelles options du graphique

        const chart = new ApexCharts(document.querySelector('#donut-chart'), chartOptions);
        chart.render();
      },
      (error) => {
        console.error('Erreur lors de la récupération des données : ', error);
      }
    );
  }

  getChartOptions(data: any): any {
    // Ici, data contient les données reçues du backend
    // Utilisez ces données pour définir les options du graphique
  
    const series = data.series; // Séries de données reçues du backend
    const labels = data.labels; // Libellés des sections du pie-chart
  
    const chartOptions = {
      series: series,
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"], // Couleurs du pie-chart
      chart: {
        height: 320,
        width: "100%",
        type: "donut",
      },
      // ... Autres options du graphique
  
      // Par exemple, pour les libellés des sections du pie-chart
      labels: labels,
  
      // D'autres configurations selon vos besoins avec les données reçues
      // ...
    };
  
    return chartOptions;
  }
  
}
