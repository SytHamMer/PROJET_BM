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
    let url = `http://localhost:3000/api/category_spendings/EachCategorySpendings/${id_user}`;
    const body = {"startDate":startDate, "endDate":endDate };
    return this.http.post<any>(url,body)
  }

  getTotalIncomeByCategory(id_user: string, startDate: string, endDate: string): Observable<any> {
    let url = `http://localhost:3000/api/category_incomes/EachCategoryIncomes/${id_user}`;
    const body = {"startDate":startDate, "endDate":endDate };
    return this.http.post<any>(url,body)
  }
}
