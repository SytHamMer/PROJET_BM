import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent{
  submit = false;
  userConnected!: User;
  errorConnexion : any | undefined;

  constructor(private router: Router,
    protected connexionService: ConnexionService) {}

    onSubmit(f: NgForm) {

      this.submit = true;
      this.errorConnexion = undefined;   
  

      const formData = {"username":f.value.username, "email":f.value.email,"password":f.value.password}
    
      if (f.value.username != ""  && 
          f.value.email != "" && 
          f.value.password != "" && 
          !this.errorConnexionExist()) {

        this.connexionService.signup(formData)

        // this.router.navigateByUrl("/home");
            .subscribe(
              data => {
                this.connexionService.getUserLoggedIn()
                  .subscribe(user => {
                    this.router.navigateByUrl("/home");
                  })
            },
            error => {
              console.log("error")
              console.error('Erreur lors du register :', error.error.message);
              this.errorConnexion = error.error;
            })

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
}
