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

  constructor(public dialogRef : MatDialogRef<AjoutRevenuComponent>,
              public dialog: MatDialog,
              private router: Router,
              protected connexionService: ConnexionService,
              protected userService: UserService) {}

  ngOnInit() {
    this.connexionService.getUserLoggedIn()
    .subscribe(user => {
      this.userConnected = user as User;
      console.log(user)      
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