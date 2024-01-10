import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class PiechartBudgetService {

  constructor(private http: HttpClient) {}

  getSpendingBetweenDates(id_user: string, startDate: string, endDate: string): Observable<any> {
    let url = `http://localhost:3000/api/category_spendings/${id_user}/spending-between-two-dates`;
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

  getBudgetSpent(id_user: string, startDate: string, endDate: string): Observable<any> {
    let url = `http://localhost:3000/api/category_spendings/${id_user}/spending-between-two-dates`;
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
  
  getBudgetsForLastSixMonths(userId: string): Observable<any> {
    // Suppose que vous avez une route dans votre backend pour récupérer les budgets des 6 derniers mois pour un utilisateur spécifique
    const url = `http://localhost:3000/api/category_spendings/${userId}/last-six-months`; 

    return this.http.get<any>(url);
  }

  getSpendingForLastSixMonths(userId: string): Observable<any> {
    // Suppose que vous avez une route dans votre backend pour récupérer les dépenses des 6 derniers mois pour un utilisateur spécifique
    const url = `http://localhost:3000/api/spendings/${userId}/last-six-months`; 

    return this.http.get<any>(url);
  }

}
