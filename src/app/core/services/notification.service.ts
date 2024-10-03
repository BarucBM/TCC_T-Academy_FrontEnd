import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(headers: HttpHeaders): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  toggleNotification(userId: string, eventId: string, type: string, enabled: boolean, headers: HttpHeaders): Observable<any> {
    return this.http.post(`${this.apiUrl}/toggle`, {
      userId,
      eventId,
      type,
      enabled
    }, { headers });
  }
}
