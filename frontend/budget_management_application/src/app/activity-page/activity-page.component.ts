import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PieChartComponent } from '../piechart-budget/piechart-budget.component';
import { Router, RouterLink} from "@angular/router";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { UserService } from '../services/user.service';
import { MenuComponent } from "../menu/menu.component";

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
  email!:String;
  total: Number | undefined;



  constructor(private router: Router,
    protected connexionService: ConnexionService,
    protected userService: UserService) {}
  
    ngOnInit(): void {
      this.connexionService.getUserLoggedIn()
      .subscribe(user => {
        this.userConnected = user as User;
        console.log("dans user component")
        console.log(this.userConnected);
        this.username=this.userConnected.username
      })
      this.total  = 999
    }

  toggleMobileMenu() {
    this.isMenuPhoneHidden = !this.isMenuPhoneHidden;
  }

}