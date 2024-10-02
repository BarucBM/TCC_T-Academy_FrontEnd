import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import {HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url:string = 'http://localhost:8080/event';

  constructor(private htttp:HttpClient) { }

  getAllEvents(param?:Event):Observable<Event[]>{
    let params = new HttpParams();
    params = param?.title != null ? params.set("title", param.title)  : params.set("title", "");
    params = param?.description != null ? params.set("description", param.description)  : params.set("description", "");
    params = param?.startTime != null ? params.set("startTime", param.startTime.toISOString())  : params.set("startTime", "");
    params = param?.endTime != null ? params.set("endTime", param.endTime.toString())  : params.set("endTime", "");
    params = param?.location != null ? params.set("location", param.location)  : params.set("location", "");
    console.log(params.toString())
    return this.htttp.get<Event[]>(this.url, {params})
  }

  getEventById(id:string):Observable<Event>{
    return this.htttp.get<Event>(this.url+'/'+id)
  }
}
