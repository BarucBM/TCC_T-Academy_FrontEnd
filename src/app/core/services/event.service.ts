import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url:string = 'http://localhost:8080/event';

  constructor(private htttp:HttpClient) { }

  getAllEvents():Observable<Event[]>{
    return this.htttp.get<Event[]>(this.url )
  }

  getEventById(id:string):Observable<Event>{
    return this.htttp.get<Event>(this.url+'/'+id)
  }
}
