import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { AjoutCategorieComponent } from '../ajout-categorie/ajout-categorie.component';
import { CategorieIncomes } from '../models/categorie_incomes.model';


@Component({
  selector: 'app-ajout-revenu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './ajout-revenu.component.html',
  styleUrl: './ajout-revenu.component.scss'
})

export class AjoutRevenuComponent{
  submit = false;
  isLoading !: boolean;
  userConnected!: User;
  errorLogin !: any | undefined;
  list_categories_incomes: Array<CategorieIncomes> | undefined;

  constructor(public dialogRef : MatDialogRef<AjoutRevenuComponent>,
              public dialog: MatDialog,
              private router: Router,
              protected connexionService: ConnexionService,
              protected userService: UserService,) {}

  ngOnInit() {
    this.connexionService.getUserLoggedIn()
    .subscribe(user => {
      this.userConnected = user as User;
      // console.log("dans ajout revenu")
      // console.log(this.userConnected.id);

           
    // console.log("POURQUOI")
    // console.log(this.userConnected.id)
    this.userService.getListAllCategoriesIncomes(this.userConnected.id).subscribe(
      (data) => {
        this.list_categories_incomes = data;
        console.log(this.list_categories_incomes);
        console.log("prout")
        console.log(data)
        if (this.list_categories_incomes != undefined){
          this.list_categories_incomes.forEach((category: any) =>{
            console.log(category.id)
          })
        }

      },
      (error) => {
        console.error(error); 
      })
    }) 
  }


  onSubmit(f: NgForm) {

    this.errorLogin = undefined;    
    this.submit = true;
    this.isLoading = true;
    const category = (document.getElementById('categories') as HTMLInputElement).value;
    const date = (document.getElementById('date') as HTMLInputElement).value;
    console.log("dans le submit")
    console.log(category)
    if (f.value.description != "" && f.value.montant != "" && category !="undefined"){
      console.log(f.value.description)
      console.log(f.value.montant)
      console.log(date)
      const real_date = new Date(Date.now())

      if (date != ""){
        console.log("ici")
        const real_date = new Date(date)
        this.userService.createIncome(f.value.description,f.value.montant,real_date,category,this.userConnected.id).subscribe()
        
      }
      else {
        console.log(real_date)
        this.userService.createIncome(f.value.description,f.value.montant,real_date,category,this.userConnected.id).subscribe()
        
      }
      this.dialogRef.close()

    }

  }

  openNewCategory(): void {
    this.dialog.open(AjoutCategorieComponent, {
      panelClass: 'dialog-container',
      width: '400px',
      height: '600px'
    });
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