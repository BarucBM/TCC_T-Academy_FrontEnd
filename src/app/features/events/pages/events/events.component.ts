import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { EventComponent } from "../../components/event/event.component";
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FilterComponent } from "../../components/filter/filter.component";
import { CardModule } from 'primeng/card';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventComponent, CommonModule, InputTextModule, FilterComponent, CardModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'] 
})
export class EventsComponent implements OnInit {
  events!: Event[];
  params: Event = {
    id: '',
    title: '',
    startTime: null, // Tipo Date
    endTime: null, // Tipo Date
    createdAt: null, // Ajuste o tipo conforme necessário
    freeEntry: false,
    ticketUnitPrice: 0,
    ticketTax: 0,
    address: {
      fullAddress: '',
      postalCode: '',
      streetName: '',
      streetNumber: '',
      // Assegure-se de que essas propriedades sejam compatíveis com a interface Address
      city: '',
      state: '',
      country: '',
      latitude: '',
      longitude: '',
    },
    description: '',
    weatherImpact: false
  };

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getAllEvents(this.params).subscribe({
      next: (res) => {
        this.events = res;
        console.log(this.events);
      },
      error: (e) => console.log(e)
    });
  }

  filterSubmit(event: any) {
    this.params.title = event.title;
    this.params.description = event.description;

    this.params.startTime = event.dates == null ? null : new Date(event.dates[0]);
    this.params.endTime = event.dates == null ? null : new Date(event.dates[1]);

    console.log(event.dates);
    this.getAllEvents();
  }
}
