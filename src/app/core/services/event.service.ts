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

    if (param?.startTime != null) {
      let date1 = this.dateFormat(param.startTime)
      params = params.set("startDate", `${date1[0]}-${date1[1]}-${date1[2]}`)
    }else{
      params.set("startDate", "");
    }

    if (param?.endTime != null) {
      let date2 = this.dateFormat(param.endTime)
      params = params.set("endDate", `${date2[0]}-${date2[1]}-${date2[2]}`)
    }else{
      params.set("endDate", "");
    }

    console.log(params.toString())
    return this.htttp.get<Event[]>(this.url, {params})
  }

  getEventById(id:string):Observable<Event>{
    return this.htttp.get<Event>(this.url+'/'+id)
  }


  dateFormat(date:Date):string[]{
    let month = date.getMonth()+1  >= 10? `${date.getMonth()+1}` : `0${date.getMonth()+1}`
    let day = date.getDate()  >= 10? `${date.getDate()}` : `0${date.getDate()}`

    return [`${date.getFullYear()}` , month, day ]
  }

}
