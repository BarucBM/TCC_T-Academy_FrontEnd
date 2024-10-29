import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url: string = "http://localhost:8080/customer";

  constructor(private httpClient: HttpClient) { }

  updateCustomer(id: string, customerData: Customer): Observable<Customer> {    
    return this.httpClient.put<Customer>(`${this.url}/${id}`, customerData);
  }
}
