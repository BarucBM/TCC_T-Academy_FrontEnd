import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) {}

  getCalendarId(): Observable<string> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        console.error('Access token is missing!');
        return new Observable();
    }

    const backendUrl = 'http://localhost:8080/calendar';
    
    const body = { token: accessToken };

    return this.http.post<{ primaryCalendarId: string }>(backendUrl, body).pipe(
      map(response => response.primaryCalendarId)
    );
  }
}