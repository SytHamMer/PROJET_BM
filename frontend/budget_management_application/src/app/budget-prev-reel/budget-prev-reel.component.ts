import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';
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
  chart: ApexCharts | undefined;

  constructor(
    private budgetService: BudgetService,
    private connexionService: ConnexionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.connexionService.getUserLoggedIn().subscribe(user => {
      this.userConnected = user as User;
      this.userId = this.userConnected.id;
      this.createChart();
    });
  }

  createChart(): void {
    const id = this.userId;

    if (id) {
      this.budgetService.getSpendingForLastSixMonths(id).subscribe(
        (data: any) => {
          const endDate = new Date(); // Fin du mois actuel
          const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1); // Début du mois actuel
          
          this.budgetService.getBudget(id, this.formatDate(startDate), this.formatDate(endDate)).subscribe(
            (budget: any) => {              
              const chartOptions = this.getChartOptions(data, budget);
              const chart = new ApexCharts(document.querySelector('#column-chart'), chartOptions);
              chart.render();
            },
            (error: any) => {
              console.error('Erreur lors de la récupération du budget : ', error);
            }
          );
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des données : ', error);
        }
      );
    } else {
      console.warn('Veuillez vérifier l\'ID utilisateur.');
    }
  }


  getChartOptions(data: any, budget: any): any {
    const colors = ['#5680E9', '#8860D0'];

    // Utiliser les données reçues pour construire les nouvelles options du graphique
    return {
      colors: colors,
      series: [
        {
          name: 'Budget Prévu',
          data: [budget,budget,budget,budget,budget,budget],
        },
        {
          name: 'Budget Réel Dépensé',
          data: data.map((entry: { totalSpending: any }) => entry.totalSpending),
        },
      ],

      chart: {
        height: 320,
        width: '100%',
        type: 'bar',
      },
      xaxis: {
        categories: data.map((entry: { startDate: any }) => entry.startDate),
      }
    };
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
}
