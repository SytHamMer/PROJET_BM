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
  spendings: any[] = [];
  incomes: any[] = [];



  constructor(private router: Router,
    private activityPageService: ActivityPageService,
    protected connexionService: ConnexionService,
    public dialog: MatDialog,
    protected userService: UserService) {}
  
    ngOnInit(): void {
      this.connexionService.getUserLoggedIn()
      .subscribe(user => {
        this.userConnected = user as User;
        console.log(this.userConnected);
        this.userId = this.userConnected.id;
        this.username=this.userConnected.username
        this.activityPageService.getAllSpendings(this.userId).subscribe(
          (data: any) => {
            this.spendings = data.spendings;
          },
          (error: any) => {
            console.error('Error fetching spendings: ', error);
          }
        );
        this.activityPageService.getAllIncomes(this.userId).subscribe(
          (data: any) => {
            this.incomes = data.incomes;
          },
          (error: any) => {
            console.error('Error fetching incomes: ', error);
          }
        );
      })
      this.total  = 999;
      // this.createDonutChart();

    
    }

  toggleMobileMenu() {
    this.isMenuPhoneHidden = !this.isMenuPhoneHidden;
  }
  
  ngAfterViewInit(): void {
    const lastMonth = this.getLastMonth();
    if (this.startDateInput && this.endDateInput) {
      this.startDateInput.nativeElement.value = lastMonth;
      this.endDateInput.nativeElement.value = lastMonth;
      this.updateChart(); // Mettre à jour le graphique avec les valeurs par défaut du mois dernier
    }
    setTimeout(() => {
        this.createDonutChart();
      });
    }

  getLastMonth(): string {
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }

  createDonutChart(): void {
    const options1: any = {
      series: [44, 55, 41, 17, 15],
      labels: ['A', 'B', 'C', 'D', 'E'],
      chart: {
        type: 'donut',
      },
      legend: {
        show: false,
      }
    }


    const options2: any = {
      series: [44, 55, 41, 17, 15],
      labels: ['A', 'B', 'C', 'D', 'E'],
      chart: {
        type: 'donut',
      },
      legend: {
        show: false,
      }
    }
    const chart1 = new ApexCharts(document.getElementById('leftGraphDiv'), options1);
    chart1.render();
    const chart2 = new ApexCharts(document.getElementById('rightGraphDiv'), options2);
    chart2.render();
}



  updateChart(): void {
    const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
    const id = this.userId

    if (id && startDate && endDate) {
      this.activityPageService.getTotalSpendingByCategory(id, startDate, endDate).subscribe(
        (response) => {
          // Première requête pour récupérer le montant total dépensé     
          console.log(response)     
          // const totalValuesList = Object.values(totalSpendingData).map(item => item.totalValue);
          // const keysList = Object.keys(totalSpendingData);

          // Deuxième requête pour récupérer le budget déjà dépensé par rapport à l'autre valeur
          // this.pieChartService.getBudget(id, startDate, endDate).subscribe(
          //   (budgetSpentData: any) => {
          //     const budgetSpent = budgetSpentData;
          //     // Mettre à jour les données du graphique avec les données reçues des services
          //     const chartOptions = this.getChartOptions(totalSpending, budgetSpent);
  
          //     const chart = new ApexCharts(document.querySelector('#donut-chart'), chartOptions);
          //     chart.render();
          //   },
          //   (error: any) => {
          //     console.error('Erreur lors de la récupération du budget dépensé : ', error);
          //   }
          // );
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
    // Utiliser les données reçues pour construire les nouvelles options du graphique
    return {
      series: [totalSpending, budgetSpent], // Utilisation des deux valeurs pour le graphique
      colors: ['#FF5733', '#3366FF'], // Couleurs pour représenter les deux valeurs (exemple)
      chart: {
        height: 320,
        width: '100%',
        type: 'donut',
      },
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