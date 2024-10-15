import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from "@angular/common/http";
import { Event } from '../../../core/models/event.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url: string = 'http://localhost:8080/event';

  constructor(private http: HttpClient) { }

  getAllEvents(param?: Event): Observable<Event[]> {
    let params = new HttpParams();

    params = param?.title != null ? params.set("title", param.title) : params.set("title", "");

    if (param?.startTime != null) {
      let date1 = this.dateFormat(param.startTime)
      params = params.set("startDate", `${date1[0]}-${date1[1]}-${date1[2]}`)
    } else {
      params.set("startDate", "");
    }

    if (param?.endTime != null) {
      let date2 = this.dateFormat(param.endTime)
      params = params.set("endDate", `${date2[0]}-${date2[1]}-${date2[2]}`)
    } else {
      params.set("endDate", "");
    }

    return this.http.get<Event[]>(this.url, { params })
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(this.url + '/' + id)
  }

  createEvent(event: FormData): Observable<Event> {
    return this.http.post<Event>(`${this.url}`, event);
  }

  updateEvent(id: string, event: FormData): Observable<Event> {
    return this.http.put<Event>(`${this.url}/${id}`, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  dateFormat(date: Date): string[] {
    let month = date.getMonth() + 1 >= 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`
    let day = date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`

    return [`${date.getFullYear()}`, month, day]
  }
}
