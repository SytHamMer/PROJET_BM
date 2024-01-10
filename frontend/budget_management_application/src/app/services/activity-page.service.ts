import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityPageService {

  constructor(private http: HttpClient) { }

  getTotalSpendingByCategory(id_user: string, startDate: string, endDate: string): Observable<any> {
    let url = `http://localhost:3000/api/spending/EachCategorySpendings/${id_user}`;
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
}
