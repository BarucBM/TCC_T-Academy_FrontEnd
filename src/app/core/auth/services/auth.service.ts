import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, NewCompany } from '../../models/company.model';
import { NewCustomer } from '../models/new-customer.model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  createUserCustomer(userCustomerData: NewCustomer): Observable<any> {
    return this.httpClient.post<NewCustomer>(`${this.url}/register/customer`, userCustomerData);
  }

  createUserCompany(userCompanyData: NewCompany): Observable<Company> {  
    return this.httpClient.post<Company>(`${this.url}/register/company`, userCompanyData);
  }

  googleLogin(token: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/google-login`, { token });
  }
}
