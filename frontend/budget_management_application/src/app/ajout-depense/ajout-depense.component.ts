import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router,
              protected connexionService: ConnexionService) {}

  ngOnInit() {
    this.isLoading = false;        
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

}