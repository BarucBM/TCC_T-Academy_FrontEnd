import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor(private httpClient: HttpClient) { }

  getSuggestions(prompt: string): Observable<any> {
    const url = `http://localhost:8080/suggestions?prompt=${encodeURIComponent(prompt)}`;
    return this.httpClient.get<any>(url);  
  }
}
