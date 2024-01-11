import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Spendings } from '../models/spendings.model';

@Injectable({
  providedIn: 'root'
})
export class PiechartBudgetService {

  constructor(private http: HttpClient) {}

  getTotalSpendingsForUser(id_user: string, startDate: string, endDate: string): Observable<any> {
    let url = `http://localhost:3000/api/category_spendings/${id_user}/totalSpendings`;
    const body = {"startDate":startDate, "endDate":endDate };
  
    return this.http.post<any>(url,  body )
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('recherche du budget par dates échouée :', error);
        } else {
          console.log(url,body);
          // Gérer d'autres erreurs HTTP
          console.error('Erreur lors de la connexion :', error);
        }

        // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
        return throwError(error);
      })
    );
  }

  getSpendingBetweenDates(id_user: string, startDate: string, endDate: string): Observable<any> {
    let url = `http://localhost:3000/api/spending/TwoDates/${id_user}`;
    const body = {"startDate":startDate, "endDate":endDate };
    
    return this.http.post<any>(url,body)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('recherche du budget par dates échouée :', error);
        } else {
          console.log(url,body);
          // Gérer d'autres erreurs HTTP
          console.error('Erreur lors de la connexion :', error);
        }

        // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
        return throwError(error);
      })
    );
  }
  
  getBudget(userId: string, startDate: string, endDate: string): Observable<any> {
    const url = `http://localhost:3000/api/category_spendings/${userId}/budget`;
    const body = {"startDate":startDate, "endDate":endDate };

    return this.http.post<any>(url,body);
  }

  calculateBudget(userId: string, startDate: string, endDate: string): Observable<any> {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    const diffInMilliseconds = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const diffInMonths = Math.ceil(diffInMilliseconds / (1000 * 3600 * 24 * 30.44))+1; // Estimation de la durée en mois
    
    return this.getBudget(userId, startDate, endDate).pipe(
      map(response => {
        const budget = response; // Remplacez 'budget' par la clé contenant la valeur du budget dans la réponse
        const totalBudget = budget * diffInMonths;
        return totalBudget;
      })
    );
    
  }
 
    getSpendingForLastSixMonths(userId: string): Observable<any> {
      let url = `http://localhost:3000/api/spending/SixMonths/${userId}`;
      
      return this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('recherche du budget par dates échouée :', error);
          } else {
            console.log(url);
            // Gérer d'autres erreurs HTTP
            console.error('Erreur lors de la connexion :', error);
          }
  
          // Propager l'erreur pour permettre à d'autres parties de l'application de la gérer si nécessaire
          return throwError(error);
        })
      );
    }


}
