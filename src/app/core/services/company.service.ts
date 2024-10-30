import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private url: string = "http://localhost:8080/company";

  constructor(private httpClient: HttpClient) { }

  updateCompany(id: string, companyData: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${this.url}/${id}`, companyData);
  }
}
