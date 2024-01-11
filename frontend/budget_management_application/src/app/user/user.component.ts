import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { PiechartBudgetService} from '../services/piechart-budget.service'
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { MenuComponent } from "../menu/menu.component";
import { PieChartComponent } from "../piechart-budget/piechart-budget.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    imports: [CommonModule, FormsModule, RouterLink, MenuComponent, PieChartComponent]
})
export class UserComponent implements OnInit {
  submit = false;
  submitR = false;
  userConnected!: User;
  errorConnexion : any | undefined;
  isMenuPhoneHidden: boolean = true;
  username!:String;
  email!:String;
  firstUsername!:String;
  firstEmail!:String;
  total: Number | undefined;
  totalSpendings: Number | undefined;
  totalIncomes: Number | undefined;


  constructor(private router: Router,
    protected connexionService: ConnexionService,
    protected userService: UserService,
    protected piechartService : PiechartBudgetService) {}





    ngOnInit(): void {
      this.connexionService.getUserLoggedIn().subscribe(user => {
        this.userConnected = user as User;
    
        this.firstUsername = this.userConnected.username;
        this.firstEmail = this.userConnected.email;
    
        this.username = this.userConnected.username;
        this.email = this.userConnected.email;
    
        this.piechartService.getSpendingBetweenDates(this.userConnected.id, "2000-01", "2030-01").subscribe(
          (totalSpendingData) => {
            this.totalSpendings = totalSpendingData;
            console.log(this.totalSpendings);
            this.checkAndCalculateTotal();
          }
        );
    
        this.piechartService.getIncomeBetweenDates(this.userConnected.id, "2000-01", "2030-01").subscribe(
          (totalIncomeData) => {
            this.totalIncomes = totalIncomeData;
            console.log(this.totalIncomes);
            this.checkAndCalculateTotal();
          }
        );
      });
    }
    
    private checkAndCalculateTotal(): void {
      if (this.totalIncomes !== undefined && this.totalSpendings !== undefined) {
        this.total = Number(this.totalIncomes) - Number(this.totalSpendings);
        console.log("ici");
        console.log(this.total);
      }
    }
    


    onSubmit(lf: NgForm) {

      this.submit = true;
      this.errorConnexion = undefined;   
      //modification username
      if(lf.value.username != this.firstUsername){
        console.log("username")
        console.log(lf.value.username)
        this.userService.updateUsername(this.userConnected.id,lf.value.username).subscribe()
        
      }
      //modification email
      if(lf.value.email != this.firstEmail){
        console.log("email")
        console.log(lf.value.email)
        this.userService.updateEmail(this.userConnected.id,lf.value.email).subscribe()

        
      }      
      //modification password
      if(lf.value.password != ""){
        console.log("password")
        this.userService.updatePassword(this.userConnected.id,lf.value.password).subscribe()

        
      }

    }

  errorConnexionExist() {
    return this.errorConnexion !== undefined;
  }

  errorIsPseudo() {
    return this.errorConnexion.type === 'username';
  }

  errorIsEmail() {
    return this.errorConnexion.type === 'email';
  }

  errorIsPassword() {
    return this.errorConnexion.type === 'password';
  }
  toggleMobileMenu() {
    this.isMenuPhoneHidden = !this.isMenuPhoneHidden;
  }




  onSubmitR(rf: NgForm) {

    this.submitR = true;
    const data = this.userService.getTotal(this.userConnected.id);
    console.log("DROITE");
    console.log(data)
    
  }
}
