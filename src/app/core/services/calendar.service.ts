import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) {}

  getCalendarId() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('Access token is missing!');
    }
    console.log(accessToken);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    console.log(headers);

    const calendarApiUrl = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';

    return this.http.get(calendarApiUrl, { headers }).subscribe({
      next: (response) => {
        console.log('Calendar events:', response);
      },
      error: (err) => {
        console.error('Failed to fetch calendar events:', err);
      }
    });
  }
}