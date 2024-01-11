import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BudgetService } from '../services/budget.service';
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

export class PieChartComponent implements AfterViewInit {
  userId: string | undefined;
  userConnected!: User;
  @ViewChild('startDateInput') startDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateInput') endDateInput!: ElementRef<HTMLInputElement>;
  chart: ApexCharts | undefined;

  constructor(
    private budgetService: BudgetService,
    private connexionService: ConnexionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const lastMonth = this.getMonth();    
    this.connexionService.getUserLoggedIn()
    .subscribe(user => {      
      this.userConnected = user as User;
      this.userId = this.userConnected.id;
      this.createDonutChart(lastMonth);
    })
  }

  ngAfterViewInit(): void {
    const month = this.getMonth();
    if (this.startDateInput && this.endDateInput) {
      this.startDateInput.nativeElement.value = month;
      this.endDateInput.nativeElement.value = month;
      this.updateChart(); // Mettre à jour le graphique avec les valeurs par défaut du mois dernier
    }
  }

  getMonth(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }
  

  createDonutChart(lastMonth: string): void {
    const id = this.userId;

    if (id && lastMonth) {
    this.budgetService.getSpendingBetweenDates(id, lastMonth, lastMonth).subscribe(
      (totalSpendingData) => {
        // Première requête pour récupérer le montant total dépensé
        const totalSpending = totalSpendingData;
        
        // Deuxième requête pour récupérer le budget déjà dépensé par rapport à l'autre valeur
        this.budgetService.calculateBudget(id,lastMonth, lastMonth).subscribe(
          (budgetSpentData: any) => {
            const budget = budgetSpentData;
            // Mettre à jour les données du graphique avec les données reçues des services
            const chartOptions = this.getChartOptions(totalSpending, budget);

            const chart = new ApexCharts(document.querySelector('#donut-chart'), chartOptions);
            this.chart = chart;
            chart.render();
          },
          (error: any) => {
            console.error('Erreur lors de la récupération du budget dépensé : ', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération du montant total dépensé : ', error);
      }
    );
    }
  }

  updateChart(): void {
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
    const id = this.userId;
    if (id && startDate && endDate) {
      this.budgetService.getSpendingBetweenDates(id, startDate, endDate).subscribe(
        (totalSpendingData) => {
          
          // Première requête pour récupérer le montant total dépensé
          const totalSpending = totalSpendingData;
          
          // Deuxième requête pour récupérer le budget déjà dépensé par rapport à l'autre valeur
          this.budgetService.calculateBudget(id,startDate, endDate).subscribe(
            (budgetSpentData) => {
              const budget = budgetSpentData;
              // Mettre à jour les données du graphique avec les données reçues des services
              const chartOptions = this.getChartOptions(totalSpending, budget);
  
              if (this.chart) {
                this.chart.updateOptions(chartOptions);
              } else {
                this.chart = new ApexCharts(document.querySelector('#donut-chart'), chartOptions);
                this.chart.render();
              }
            },
            (error: any) => {
              console.error('Erreur lors de la récupération du budget dépensé : ', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération du montant total dépensé : ', error);
        }
      );
    } else {
      console.warn('Veuillez sélectionner les dates et vérifier l\'ID utilisateur.');
    }
  }
  
  getChartOptions(totalSpending: number, budgetSpent: number): any {

    // console.log('budgetSpent',budgetSpent,'totalSpending',totalSpending);
    
    const colors = ['#5680E9', '#8860D0'];
  
      return {
        series: [totalSpending, budgetSpent],
        colors: colors,
        labels: ['Dépenses', 'Budget'],
        chart: {
          height: 320,
          type: 'donut',
        },
      };
  }
  
  
}  