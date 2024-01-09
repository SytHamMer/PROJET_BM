import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PiechartBudgetService } from '../services/piechart-budget.service';
import { ConnexionService } from '../services/connexion.service';
import { UserService } from '../services/user.service';
import ApexCharts from 'apexcharts';
import { User } from '../models/user.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-pie-chart',
  templateUrl: './piechart-budget.component.html',
  styleUrls: ['./piechart-budget.component.scss'],
})

export class PieChartComponent {
  userId: number | undefined;
  userConnected!: User;

  constructor(
    private pieChartService: PiechartBudgetService,
    private connexionService: ConnexionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.connexionService.getUserLoggedIn$()
    .subscribe(user => {
      this.userConnected = user as User;
      this.userId = this.userConnected.id;
    })
  }

  updateChart(): void {
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
    console.log(startDate, endDate,this.userId);
    
    if (this.userId && startDate && endDate) {
      this.pieChartService.getSpendingBetweenDates(this.userId, startDate, endDate).subscribe(
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
    } else {
      console.warn('Veuillez sélectionner les dates et vérifier l\'ID utilisateur.');
    }
  }
  getChartOptions(data: any): any {
    return {
      series: data.series,
      colors: data.colors,
      chart: {
        height: 320,
        width: '100%',
        type: 'donut',
      },
    };
  }
}
