import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { MenuComponent } from "../menu/menu.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    imports: [CommonModule, FormsModule, RouterLink, MenuComponent]
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



  constructor(private router: Router,
    protected connexionService: ConnexionService,
    protected userService: UserService) {}





  ngOnInit(): void {
    this.connexionService.getUserLoggedIn()
    .subscribe(user => {
      this.userConnected = user as User;
      console.log("dans user component")
      console.log(this.userConnected);
      this.firstUsername = this.userConnected.username
      this.firstEmail= this.userConnected.email

      this.username=this.userConnected.username
      this.email=this.userConnected.email

      
    })
    this.total  = 999
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
