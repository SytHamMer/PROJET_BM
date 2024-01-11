import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PieChartComponent } from '../piechart-budget/piechart-budget.component';
import { Router, RouterLink} from "@angular/router";
import { ConnexionService } from '../services/connexion.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,PieChartComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  isMenuPhoneHidden: boolean = true;
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
      // console.log(this.userConnected);
      this.username=this.userConnected.username
    })
  }

  toggleMobileMenu() {
    this.isMenuPhoneHidden = !this.isMenuPhoneHidden;
  }
}

