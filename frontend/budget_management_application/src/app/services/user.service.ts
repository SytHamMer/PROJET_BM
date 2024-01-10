import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { log } from 'console';

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  updatePassword(id: Number,newPassword: string) {
    let url =  `http://localhost:3000/api/user/updatePassword/${id}`;
    console.log("dans user service:");
    console.log(url);
    
    
    const data = {"newPassword": newPassword}
    console.log(data);
    return this.http.post<any>(url,  data )
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('changement de password échoué :', error);
        } else {
          // Gérer d'autres erreurs HTTP
          console.error('Erreur lors de la connexion :', error);
        }

        // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
        return throwError(error);
      })
    );
  }


  updateUsername(id: Number,newUsername: string) {
    let url =  `http://localhost:3000/api/user/updateUsername/${id}`;
    console.log("dans user service:");
    console.log(url);
    
    
    const data = {"newUsername": newUsername}
    console.log(data);
  
    return this.http.post<any>(url,  data )
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('changement de username échoué :', error);
        } else {
          // Gérer d'autres erreurs HTTP
          console.error('Erreur lors de la connexion :', error);
        }

        // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
        return throwError(error);
      })
    );
  }

  getUserById(id: string) {
    let url = `http://localhost:3000/api/user/${id}`;

    return this.http
      .get<any>(url)
      .pipe(
        map(
          (data: any) =>
            new User(
              data._id,
              data.username,
              data.email,
              data.password,
            ),
        ),
      );
  }

  signup(formData: any) {
    const url = `http://localhost:3000/api/user/signup`
    // console.log("dans user service:")
    //console.log(formData)
    //console.log(this.http.post<any>(url, formData))

    return this.http.post<any>(url, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            // Cas où l'authentification a échoué
            console.error('Register échouée :', error);
          } else {
            // Autres erreurs HTTP
            console.error('Erreur lors du register :', error);
          }

          // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
          return throwError(error);
        })
      )

  }

  login(email: string, password: string) {
    const url = `http://localhost:3000/api/user/login`

    return this.http.post<any>(url, { email, password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Gérer le cas où l'authentification a échoué
            console.error('Authentification échouée :', error);
          } else {
            // Gérer d'autres erreurs HTTP
            console.error('Erreur lors de la connexion :', error);
          }

          // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
          return throwError(error);
        })
      );

  }

  getTotal(id: number){
    let urlspendingcate = `http://localhost:3000/api/category_spendings/ByIdUser/${id}`;
    console.log(urlspendingcate);
    const data = this.http.get(urlspendingcate)
    console.log(data)


    let urlincomecate = `http://localhost:3000/api/category_incomes/ByIdUser/${id}`;

  }

  getListCategories(id : number, type : string){
    let urlcategories = `http://localhost:3000/api/category_${type}/ByIdUser/${id}`;
    return this.http.get<any[]>(urlcategories);
  }

}