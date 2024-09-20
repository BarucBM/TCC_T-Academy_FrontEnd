import { Component } from '@angular/core';
import { TicketSelectionComponent } from "../../components/event/ticket-selection/ticket-selection.component";
import { EventService } from '../../services/event.service';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-event-acquisition',
  standalone: true,
  imports: [TicketSelectionComponent],
  templateUrl: './event-acquisition.component.html',
  styleUrl: './event-acquisition.component.scss'
})
export class EventAcquisitionComponent {
  event!:Event;
  private id:string = 'ac492b36-6f48-4f68-8b82-a622736c02f7'

  constructor(private eventService:EventService){}

  getEventById(){
    this.eventService.getEventById(this.id).subscribe({
      next:(res) => {
        console.log(res)
         this.event = res;
         this.event.location = "RuaHiléiaAmazônica,250"
      },
      error:(error) => console.log(error)
    })
  }
}
