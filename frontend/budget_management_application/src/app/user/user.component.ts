import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import { User } from '../models/user.model';
import { ConnexionService } from '../services/connexion.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
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
  total: String | undefined;



  constructor(private router: Router,
    protected connexionService: ConnexionService,
    protected userService: UserService) {}





  ngOnInit(): void {
    this.connexionService.getUserLoggedIn()
    .subscribe(user => {
      this.userConnected = user as User;
      // console.log(this.userConnected);

      console.log(this.userConnected);
      this.firstUsername = this.userConnected.username
      this.firstEmail= this.userConnected.email

      this.username=this.userConnected.username
      this.email=this.userConnected.email

      
    })
    this.total  = "999€"
  }



    onSubmit(lf: NgForm) {

      this.submit = true;
      this.errorConnexion = undefined;   
      //modification username
      if(lf.value.username != this.firstUsername){
        console.log("username")
        console.log(lf.value.username)
        this.userService.updateUsername(this.userConnected.id,lf.value.username)
        
      }
      //modification email
      if(lf.value.email != this.firstEmail){
        console.log("email")
        console.log(lf.value.email)

        
      }      
      //modification password
      if(lf.value.password != ""){
        console.log("password")
        console.log(lf.value.password)
        // this.userService.updatePassword(this.userConnected.id, f.value.password)
        // console.log("update fait ")
        // console.log(this.userConnected.password);
        
        
      }
      // const formData = {"username":f.value.username, "email":f.value.email,"password":f.value.password}
    
      // if (f.value.username != ""  && 
      //     f.value.email != "" && 
      //     f.value.password != "" && 
      //     !this.errorConnexionExist()) {

        // this.connexionService.signup(formData)

        // this.router.navigateByUrl("/home");
            // .subscribe(
            //   data => {
            //     this.connexionService.getUserLoggedIn()
            //       .subscribe(user => {
            //         console.log("ICICICICICICICICICI");
            //         this.router.navigateByUrl("/home");
            //       })
            // },
            // error => {
            //   console.log("error")
            //   console.error('Erreur lors du register :', error.error.message);
            //   this.errorConnexion = error.error;
            // })
            // console.log("ICICICICICICICICICI")

      // }
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
