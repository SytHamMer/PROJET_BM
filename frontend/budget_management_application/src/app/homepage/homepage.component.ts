import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PieChartComponent } from '../piechart-budget/piechart-budget.component';
import { BudgetPrevReelComponent } from '../budget-prev-reel/budget-prev-reel.component';
import { AjoutDepenseComponent } from '../ajout-depense/ajout-depense.component';
import { MatDialog } from '@angular/material/dialog';
import { AjoutRevenuComponent } from '../ajout-revenu/ajout-revenu.component';
import { Router, RouterLink} from "@angular/router";
import { ConnexionService } from '../services/connexion.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,PieChartComponent, BudgetPrevReelComponent, MenuComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  isMenuPhoneHidden: boolean = true;
  userConnected!: User;
  errorConnexion : any | undefined;
  username!:String;

  constructor(public dialog: MatDialog,
    private router: Router,
    protected connexionService: ConnexionService,
    protected userService: UserService) {}

  ngOnInit(): void {
    this.connexionService.getUserLoggedIn()
    .subscribe(user => {
      this.userConnected = user as User;
      console.log(this.userConnected);
      this.username=this.userConnected.username
    })
  }

  toggleMobileMenu() {
    this.isMenuPhoneHidden = !this.isMenuPhoneHidden;
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
