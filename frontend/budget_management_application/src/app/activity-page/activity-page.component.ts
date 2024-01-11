import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PieChartComponent } from '../piechart-budget/piechart-budget.component';
import { Router, RouterLink} from "@angular/router";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { UserService } from '../services/user.service';
import { MenuComponent } from "../menu/menu.component";
import { MatDialog } from '@angular/material/dialog';
import { ActivityPageService } from '../services/activity-page.service';
import { AjoutDepenseComponent } from '../ajout-depense/ajout-depense.component';
import { AjoutRevenuComponent } from '../ajout-revenu/ajout-revenu.component';
import ApexCharts from 'apexcharts';

@Component({
    selector: 'app-activity-page',
    standalone: true,
    templateUrl: './activity-page.component.html',
    styleUrl: './activity-page.component.scss',
    imports: [CommonModule, PieChartComponent, MenuComponent]
})
export class ActivityPageComponent {
  isMenuPhoneHidden: boolean = true;  submit = false;
  submitR = false;
  userConnected!: User;
  errorConnexion : any | undefined;
  username!:String;
  total: Number | undefined;
  userId: string | undefined;
  @ViewChild('startDateInput') startDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateInput') endDateInput!: ElementRef<HTMLInputElement>;
  leftChart: ApexCharts | undefined;
  rightChart: ApexCharts | undefined;
  spendings: any[] = [];
  incomes: any[] = [];
  all: any[] = [];

  constructor(private router: Router,
    private activityPageService: ActivityPageService,
    protected connexionService: ConnexionService,
    public dialog: MatDialog,
    protected userService: UserService) {}
  
    ngOnInit(): void {
      const lastMonth = this.getMonth(); 
      this.connexionService.getUserLoggedIn()
        .subscribe(user => {
          this.userConnected = user as User;
          this.userId = this.userConnected.id;
          this.username = this.userConnected.username;
          this.createDonutChart(lastMonth)
          this.activityPageService.getAllSpendings(this.userId).subscribe(
            (data: any) => {
              this.spendings = data.spendings;
              this.processData();
            },
            (error: any) => {
              console.error('Error fetching spendings: ', error);
            }
          );
    
          this.activityPageService.getAllIncomes(this.userId).subscribe(
            (data: any) => {
              this.incomes = data.incomes;
              this.processData();
            },
            (error: any) => {
              console.error('Error fetching incomes: ', error);
            }
          );
        });
        this.total  = 999;
    }
    
    processData(): void {
      if (this.spendings && this.incomes) {
        // Add a new property 'transactionCategory' to each spending
        this.spendings.forEach(spending => (spending.transactionCategory = 'spending'));
    
        // Add a new property 'transactionCategory' to each income
        this.incomes.forEach(income => (income.transactionCategory = 'income'));
    
        // Combine spendings and incomes
        this.all = [...this.spendings, ...this.incomes];
    
        // Sort the combined array based on the date
        this.all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    }
    
    

  toggleMobileMenu() {
    this.isMenuPhoneHidden = !this.isMenuPhoneHidden;
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
        this.activityPageService.getTotalSpendingByCategory(id, lastMonth, lastMonth).subscribe(
          (response) => {
            const totalValuesList = Object.values(response).map((item : any)=> item.totalValue);
            const keysList = Object.keys(response);
            console.log(totalValuesList);
            console.log(keysList);
            const chartOptions = this.getChartOptions(totalValuesList, keysList)
            if (this.leftChart) {
              this.leftChart.updateOptions(chartOptions);
            } else {
              this.leftChart = new ApexCharts(document.getElementById('leftGraphDiv'), chartOptions);
              this.leftChart.render();
            }
          },
          (error) => {
            console.error('Erreur lors de la récupération du montant total dépensé : ', error);
          }
        );

        this.activityPageService.getTotalIncomeByCategory(id, lastMonth, lastMonth).subscribe(
          (response) => {
            const valuesList = Object.values(response);
            const keysList = Object.keys(response);
            const chartOptions = this.getChartOptions(valuesList, keysList)
            if (this.rightChart) {
              this.rightChart.updateOptions(chartOptions);
            } else {
              this.rightChart = new ApexCharts(document.getElementById('rightGraphDiv'), chartOptions);
              this.rightChart.render();
            }
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
    const id = this.userId

    if (id && startDate && endDate) {
      this.activityPageService.getTotalSpendingByCategory(id, startDate, endDate).subscribe(
        (response) => {
          const totalValuesList = Object.values(response).map((item : any)=> item.totalValue);
          const keysList = Object.keys(response);
          console.log(totalValuesList);
          console.log(keysList);
          const chartOptions = this.getChartOptions(totalValuesList, keysList)
          if (this.leftChart) {
            this.leftChart.updateOptions(chartOptions);
          } else {
            this.leftChart = new ApexCharts(document.getElementById('leftGraphDiv'), chartOptions);
            this.leftChart.render();
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération du montant total dépensé : ', error);
        }
      );

      this.activityPageService.getTotalIncomeByCategory(id, startDate, endDate).subscribe(
        (response) => {
          const valuesList = Object.values(response);
          const keysList = Object.keys(response);
          const chartOptions = this.getChartOptions(valuesList, keysList)
          if (this.rightChart) {
            this.rightChart.updateOptions(chartOptions);
          } else {
            this.rightChart = new ApexCharts(document.getElementById('rightGraphDiv'), chartOptions);
            this.rightChart.render();
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération du montant total dépensé : ', error);
        }
      );
    } else {
      console.warn('Veuillez sélectionner les dates et vérifier l\'ID utilisateur.');
    }
  }
  
  getChartOptions(totalValuesList: any[], keysList: any[]): any {
    // Utiliser les données reçues pour construire les nouvelles options du graphique
    return {
      series: totalValuesList, // Utilisation des deux valeurs pour le graphique
      labels: keysList,
      chart: {
        height: 320,
        width: '100%',
        type: 'donut',
      },
      legend: {
        show: false,
      }
    };
  }

  openNewSpending(): void {
    this.dialog.open(AjoutDepenseComponent, {
      width: '400px',
      height: '600px'
    });
  }

  openNewIncome(): void {
    this.dialog.open(AjoutRevenuComponent, {
      width: '400px',
      height: '600px'
    });
  }

}