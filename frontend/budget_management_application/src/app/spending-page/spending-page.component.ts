import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PieChartComponent } from '../piechart-budget/piechart-budget.component';
import { Router, RouterLink} from "@angular/router";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-spending-page',
  standalone: true,
  imports: [CommonModule,PieChartComponent],
  templateUrl: './spending-page.component.html',
  styleUrl: './spending-page.component.scss'
})
export class SpendingPageComponent {
  isMenuPhoneHidden: boolean = true;  submit = false;
  submitR = false;
  userConnected!: User;
  errorConnexion : any | undefined;
  username!:String;



  constructor(private router: Router,
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

}