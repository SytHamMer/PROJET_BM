import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Spendings } from '../models/spendings.model';

@Injectable({
  providedIn: 'root'
})
export class PiechartBudgetService {

  constructor(private http: HttpClient) {}

  getSpendingBetweenDates(id_user: number, startDate: string, endDate: string) {
    
    let url = `http://localhost:3000/api/user/${id_user}/spending-between-two-dates`;
    const body = {startDate, endDate };
    return this.http.post(url, body);
  }
  

}
