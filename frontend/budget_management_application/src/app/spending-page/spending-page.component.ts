import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PieChartComponent } from '../piechart-budget/piechart-budget.component';
import { Router, RouterLink} from "@angular/router";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { UserService } from '../services/user.service';
import { MenuComponent } from "../menu/menu.component";
import { ActivityPageService } from '../services/activity-page.service';
import { MatDialog } from '@angular/material/dialog';
import { AjoutDepenseComponent } from '../ajout-depense/ajout-depense.component';

@Component({
    selector: 'app-spending-page',
    standalone: true,
    templateUrl: './spending-page.component.html',
    styleUrl: './spending-page.component.scss',
    imports: [CommonModule, PieChartComponent, MenuComponent]
})
export class SpendingPageComponent {
  isMenuPhoneHidden: boolean = true;  submit = false;
  submitR = false;
  userConnected!: User;
  errorConnexion : any | undefined;
  username!:String;
  spendings: any[] = [];
  userId: string | undefined;


  constructor(private router: Router,
    private activityPageService: ActivityPageService,
    public dialog: MatDialog,
    protected connexionService: ConnexionService,
    protected userService: UserService) {}
  
    ngOnInit(): void {
      this.connexionService.getUserLoggedIn()
      .subscribe(user => {
        this.userConnected = user as User;
        this.userId = this.userConnected.id;
        this.username=this.userConnected.username;
        this.activityPageService.getAllSpendings(this.userId).subscribe(
          (data: any) => {
            this.spendings = data.spendings;
          },
          (error: any) => {
            console.error('Error fetching spendings: ', error);
          }
        );
      })
    }

  toggleMobileMenu() {
    this.isMenuPhoneHidden = !this.isMenuPhoneHidden;
  }

  openNewSpending(): void {
    this.dialog.open(AjoutDepenseComponent, {
      panelClass: 'dialog-container',
      width: '400px',
      height: '600px'
    });
  }
}