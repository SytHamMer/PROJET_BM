import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ajout-categorie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './ajout-categorie.component.html',
  styleUrl: './ajout-categorie.component.scss'
})

export class AjoutCategorieComponent{
  submit = false;
  isLoading !: boolean;
  userConnected!: User;
  errorLogin !: any | undefined;
selectedOption: any;

  constructor(public dialogRef : MatDialogRef<AjoutCategorieComponent>,
              private router: Router,
              protected connexionService: ConnexionService,
              protected userService : UserService) {}

  ngOnInit() {
    this.isLoading = false;    
    this.connexionService.getUserLoggedIn()
    .subscribe(user => {
      this.userConnected = user as User;
      // console.log("dans  ajout categorie")
      // console.log(this.userConnected);

    })    
  }


  onSubmit(f: NgForm) {

    this.errorLogin = undefined;    
    this.submit = true;
    this.isLoading = true;
    const selectedValue = f.value.categoryType
    // console.log(selectedValue); 
    //a = dépense
    if (selectedValue == 'a' && f.value.nom != '' && f.value.montant != ""){
      this.userService.createCategorySpending(this.userConnected.id,f.value.montant,f.value.nom).subscribe()
      this.dialogRef.close()


    //b = revenu
    }
    if (selectedValue == 'b'&& f.value.nom != ''){
      this.userService.createCategoryIncome(this.userConnected.id,f.value.nom).subscribe()
      this.dialogRef.close()



    }
    // console.log(f.value.nom)
    // console.log(f.value.montant)

    


  }

  userConnectedIsLoaded() {
    return this.userConnected !== undefined;
  }

  errorLoginExist() {
    return this.errorLogin !== undefined;
  }

  errorIsEmail() {
    return this.errorLogin.type === 'email';
  }

  errorIsPassword() {
    return this.errorLogin.type === 'password';
  }

  close(): void {
    this.dialogRef.close();
  }
}