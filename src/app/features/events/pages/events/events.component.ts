import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../core/services/event.service';
import { Event } from '../../../../core/models/event.model';
import { EventComponent } from "../../components/event/event.component";
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FilterComponent } from "../../components/filter/filter.component";


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventComponent, CommonModule, InputTextModule, FilterComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  events!:Event[];
  params:Event ={
    id : '',
    title :'',   
    startTime:null,
    endTime:null,
    createdAt:null,
    location:'',
    description:'',
    weatherImpact:false
  };

  constructor(private eventService:EventService){}

  ngOnInit(): void {
    this.getAllEvents()
  }

  getAllEvents(){
    this.eventService.getAllEvents(this.params).subscribe({
      next:(res) =>{
        this.events = res
        console.log(this.events)
      },
      error:(e) => console.log(e)
    })
  }

  filterSubmit(event:any){
    this.params.title = event.title
    this.params.location = event.location
    this.params.description = event.description
    this.params.startTime = event.firstDate
    this.params.endTime = event.secondDate
    this.getAllEvents()
  }
}