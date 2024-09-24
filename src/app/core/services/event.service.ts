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

  getAllEvents(param?:Event):Observable<Event[]>{
    console.log(this.url + `?title=${param?.title}&description=${param?.description}&location=${param?.location}`)
    return this.htttp.get<Event[]>(this.url + `?title=${param?.title}&description=${param?.description}&location=${param?.location}`)
  }

  getEventById(id:string):Observable<Event>{
    return this.htttp.get<Event>(this.url+'/'+id)
  }
}
