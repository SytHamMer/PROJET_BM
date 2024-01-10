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


@Component({
  selector: 'app-ajout-depense',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './ajout-depense.component.html',
  styleUrl: './ajout-depense.component.scss'
})

export class AjoutDepenseComponent{
  submit = false;
  isLoading !: boolean;
  userConnected!: User;
  errorLogin !: any | undefined;
  list_categories_spendings: any[] = [];

  constructor(public dialogRef : MatDialogRef<AjoutDepenseComponent>,
              public dialog: MatDialog,
              private router: Router,
              protected connexionService: ConnexionService,
              protected userService: UserService) {}

              ngOnInit() {
                this.connexionService.getUserLoggedIn()
                .subscribe(user => {
                  this.userConnected = user as User;
                  // console.log("dans ajout revenu")
                  // console.log(this.userConnected.id);
            
                       
                // console.log("POURQUOI")
                // console.log(this.userConnected.id)
                this.userService.getListAllCategoriesSpendings(this.userConnected.id).subscribe(
                  (data) => {
                    this.list_categories_spendings = data;
                    console.log(this.list_categories_spendings);
                    console.log("prout")
                    console.log(data)
                    if (this.list_categories_spendings != undefined){
                      this.list_categories_spendings.forEach((category: any) =>{
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
    

    if (f.value.email != ""  && f.value.password != "" && !this.errorLoginExist()){
      this.connexionService.login(f.value.email, f.value.password)
        .subscribe
        (user => {
          this.userConnected = user;
          this.router.navigateByUrl("/home");
        },
        error => {
          console.error('Erreur lors de la connexion :', error.error.message);
          this.errorLogin = error.error;
        })
      
    }

  }

  openNewCategory(): void {
    this.dialog.open(AjoutCategorieComponent, {
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