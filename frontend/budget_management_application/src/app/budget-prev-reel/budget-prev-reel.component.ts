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
  selector: 'app-budget-prev-reel',
  templateUrl: './budget-prev-reel.component.html',
  styleUrls: ['./budget-prev-reel.component.scss'],
})

export class BudgetPrevReelComponent {
  userId: string | undefined;
  userConnected!: User;

  constructor(
    private pieChartService: PiechartBudgetService,
    private connexionService: ConnexionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.connexionService.getUserLoggedIn()
    .subscribe(user => {
      this.userConnected = user as User;
      this.userId = this.userConnected.id;
    })
  }

  // ...

updateChart(): void {
  if (this.userId) {
    this.pieChartService.getBudgetsForLastSixMonths(this.userId).subscribe(
      (data: any) => {
        const chartOptions = this.getChartOptions(data);
        const chart = new ApexCharts(document.querySelector('#column-chart'), chartOptions);
        chart.render();
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données : ', error);
      }
    );
  } else {
    console.warn('Veuillez vérifier l\'ID utilisateur.');
  }
}

getChartOptions(data: any): any {
  // Utiliser les données reçues pour construire les nouvelles options du graphique
  return {
    series: [
      {
        name: 'Budget Prévu',
        data: data.budgetsPrevus // Supposons que "budgetsPrevus" contient les budgets prévus pour les 6 derniers mois
      },
      {
        name: 'Budget Réel Dépensé',
        data: data.budgetsReels // Supposons que "budgetsReels" contient les budgets réels dépensés pour les 6 derniers mois
      }
    ],
    chart: {
      height: 320,
      width: '100%',
      type: 'bar', // Type de graphique en colonnes
    },
    xaxis: {
      categories: data.months // Supposons que "months" contient les mois correspondants aux budgets
    }
  };
}

}
