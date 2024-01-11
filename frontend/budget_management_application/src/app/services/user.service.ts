import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { CategorieIncomes } from '../models/categorie_incomes.model';
import { CategorieSpendings } from '../models/categorie_spendings.model';



@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  updatePassword(id: string,newPassword: string): Observable<any>  {
    let url =  `http://localhost:3000/api/user/updatePassword/${id}`;
    // console.log(url);
    
    
    const data = {"newPassword": newPassword}
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



  updateEmail(id: string,newEmail: string): Observable<any> {
    let url =  `http://localhost:3000/api/user/updateEmail/${id}`;
    // console.log(url);
    
    const data = {"newEmail": newEmail}
    // console.log(data);  
    return this.http.post<any>(url,  data )
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('changement de email échoué :', error);
        } else {
          // Gérer d'autres erreurs HTTP
          console.error('Erreur lors de la connexion :', error);
        }

        // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
        return throwError(error);
      })
    );
  }
  


  updateUsername(id: string,newUsername: string): Observable<any> {
    let url =  `http://localhost:3000/api/user/updateUsername/${id}`;
    // console.log(url);
    
    
    const data = {"newUsername": newUsername}
    // console.log(data);  
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

  getTotal(id: string){
    let urlspendingcate = `http://localhost:3000/api/category_spendings/ByIdUser/${id}`;
    // console.log(urlspendingcate);
    const data = this.http.get(urlspendingcate)
    // console.log(data)


    let urlincomecate = `http://localhost:3000/api/category_incomes/ByIdUser/${id}`;

  }

  getListCategories(id : number, type : string){
    let urlcategories = `http://localhost:3000/api/category_${type}/ByIdUser/${id}`;
    return this.http.get<any[]>(urlcategories);
  }

  createCategorySpending(id_user : string, limit : number, name : string){
    let url = `http://localhost:3000/api/category_spendings/create`;

    const data = {'name':name,'monthly_limit':limit,'idUser':id_user}
    return this.http.post<any>(url, data)
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


  createCategoryIncome(id_user : string, name : string){
    let url = `http://localhost:3000/api/category_incomes/create`;

    const data = {'name':name,'idUser':id_user}
    return this.http.post<any>(url, data)
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


  getListAllCategoriesIncomes(id_user: string) : Observable<any>  {
    const url = `http://localhost:3000/api/category_incomes/byIdUser/${id_user}`;
    // console.log(id_user)
    return this.http.get<any[]>(url).pipe((
      map((data:any)=> {
        return data.categories.map((category: any) => {
          // console.log(category)
          return new CategorieIncomes(category._id, category.idUser,category.name)
        })
      })
    )); 
  }

  getListAllCategoriesSpendings(id_user: string) : Observable<any>  {
    const url = `http://localhost:3000/api/category_spendings/byIdUser/${id_user}`;
    // console.log(id_user)
    return this.http.get<any[]>(url).pipe((
      map((data:any)=> {
        // console.log("OUI")
        return data.categories.map((category: any) => {
          // console.log(category)
          return new CategorieSpendings(category._id, category.idUser,category.name,category.monthly_limit)
        })
      })
    )); 
  }

  createIncome(name: string,value : Number,date : Date ,id_category: string,id_user: string  ) : Observable<any>  {
    const url = `http://localhost:3000/api/income/create/`;
    const data = {"name":name,"value":value,"date":date,"category":id_category,"idUser": id_user}
    // console.log(data)
    return this.http.post<any>(url,data)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          // Cas où l'authentification a échoué
          console.error('Register échouée :', error);
        } else {
          // Autres erreurs HTTP
        console.error('BIZARRE :', error);
        }

        return throwError(error);
      })
    )
  }

  createSpending(name:string ,value : Number,date : Date ,id_category: string,id_user: string  ) : Observable<any> {
    const url = `http://localhost:3000/api/spending/create/`;
    const data = {"name": name,"value":value,"date":date,"category":id_category,"idUser": id_user}
    return this.http.post<any>(url,data)
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
}