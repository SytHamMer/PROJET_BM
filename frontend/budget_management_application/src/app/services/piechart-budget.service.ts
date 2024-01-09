import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiechartBudgetService {

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les dépenses entre deux dates spécifiques
  getSpendingBetweenDates(startDate: string, endDate: string): Observable<any> {
    const url = 'http://localhost:3000/api/spendings/betweenDates';

    // Paramètres de la requête GET
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    // Appel de l'API avec les paramètres
    return this.http.get<any>(url, { params });
  }
}
