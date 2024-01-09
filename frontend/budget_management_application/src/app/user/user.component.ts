import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  submit = false;
  userConnected!: User;
  errorConnexion : any | undefined;
  isMenuPhoneHidden: boolean = true;
  username!:String;
  email!:String;



  constructor(private router: Router,
    protected connexionService: ConnexionService) {}




  ngOnInit(): void {
    this.connexionService.getUserLoggedIn()
    .subscribe(user => {
      this.userConnected = user as User;
      // console.log(this.userConnected);

      console.log(this.userConnected);
      this.username=this.userConnected.username
      this.email=this.userConnected.email

      
    })
  }



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
                    console.log("ICICICICICICICICICI");
                    this.router.navigateByUrl("/home");
                  })
            },
            error => {
              console.log("error")
              console.error('Erreur lors du register :', error.error.message);
              this.errorConnexion = error.error;
            })
            console.log("ICICICICICICICICICI")

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
}
