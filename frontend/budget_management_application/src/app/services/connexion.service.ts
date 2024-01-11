import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private userLoggedIn = new Subject<User>(); //Un sujet (Subject) qui émet des événements lorsqu'un utilisateur est connecté
  constructor(private http: HttpClient,
    protected userService: UserService) { };

  login(email: string, password: string): Observable<User> {
    return this.userService.login(email, password)
      .pipe(
        map(user => {
          let userConnected = new User(
            user.userId,
            user.username,
            user.email,
            user.password,
          );
          // console.log(user);
          localStorage.removeItem("user_id");
          localStorage.setItem("user_id", user.userId);
          // console.log(localStorage.getItem("user_id"))
          this.userLoggedIn.next(userConnected);
          // console.log(userConnected);

          return userConnected;
        })
      );
  }

  getUserLoggedIn(): Observable<User | undefined> {
    let user_id = localStorage.getItem("user_id");
    // console.log(user_id);

    if (user_id !== null) {
      // Retourne l'observable directement du service UserService
      return this.userService.getUserById(user_id);
    } else {
      // Retourne une chaîne (ou une valeur par défaut) si l'user_id n'est pas disponible
      return new Observable((observer) => {
        observer.next(undefined);
        observer.complete();
      });
    }
  }
  
  signup(formData: any): Observable<any> {

    return this.userService.signup(formData)
      .pipe(
        map(data => {
          localStorage.removeItem("user_id");
          localStorage.setItem("user_id", data.user_id);
          
          return data;  
        })
      );
  }

  logout() {
    localStorage.removeItem("user_id");
  }

  isUserConnected() {
    return localStorage.getItem("user_id") !== null;
  }
}
