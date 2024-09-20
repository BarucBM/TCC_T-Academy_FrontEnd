import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, NewCustomer } from '../../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  createUserCustomer(userCustomerData: NewCustomer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.url}/register/customer`, userCustomerData);
  }
}