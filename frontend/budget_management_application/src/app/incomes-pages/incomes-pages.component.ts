import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PieChartComponent } from '../piechart-budget/piechart-budget.component';
import { Router, RouterLink} from "@angular/router";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { UserService } from '../services/user.service';
import { MenuComponent } from "../menu/menu.component";
import { ActivityPageService } from '../services/activity-page.service';

@Component({
    selector: 'app-incomes-page',
    standalone: true,
    templateUrl: './incomes-pages.component.html',
    styleUrl: './incomes-pages.component.scss',
    imports: [CommonModule, PieChartComponent, MenuComponent]
})
export class IncomesPageComponent {
  isMenuPhoneHidden: boolean = true;  submit = false;
  submitR = false;
  userConnected!: User;
  errorConnexion : any | undefined;
  username!:String;
  incomes: any[] = [];
  userId: string | undefined;


  constructor(private router: Router,
    private activityPageService: ActivityPageService,
    protected connexionService: ConnexionService,
    protected userService: UserService) {}
  
    ngOnInit(): void {
      this.connexionService.getUserLoggedIn()
      .subscribe(user => {
        this.userConnected = user as User;
        this.userId = this.userConnected.id;
        this.username=this.userConnected.username;
        this.activityPageService.getAllIncomes(this.userId).subscribe(
          (data: any) => {
            this.incomes = data.incomes;
          },
          (error: any) => {
            console.error('Error fetching incomes: ', error);
          }
        );
        console.log(this.incomes);
        
      })
    }

  toggleMobileMenu() {
    this.isMenuPhoneHidden = !this.isMenuPhoneHidden;
  }

}