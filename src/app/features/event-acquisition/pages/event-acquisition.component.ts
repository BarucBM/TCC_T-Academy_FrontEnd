import { Component, NgModule, OnInit } from '@angular/core';
import { Event } from '../../../core/models/event.model';
import { DomSanitizer } from '@angular/platform-browser';
import { TicketSelectionComponent } from '../components/ticket-selection/ticket-selection.component';
import { EventService } from '../../../core/services/event.service';
import { SidebarModule } from 'primeng/sidebar';
import { SideBarComponent } from "../components/side-bar/side-bar.component";



@Component({
  selector: 'app-event-acquisition',
  standalone: true,
  imports: [TicketSelectionComponent, SidebarModule, SideBarComponent],
  templateUrl: './event-acquisition.component.html',
  styleUrl: './event-acquisition.component.scss'
})
export class EventAcquisitionComponent implements OnInit {
  event!:Event;
  sideBarVisible :boolean = false
  ticketQt:number = 0
  private id:string = 'ac492b36-6f48-4f68-8b82-a622736c02f7'
  url:any = "";
  

  constructor(private eventService:EventService, private sanitizer:DomSanitizer){}

  ngOnInit(): void {
    
    this.getEventById()
  }

  getEventById(){
    this.eventService.getEventById(this.id).subscribe({
      next:(res) => {
        console.log(res)
         this.event = res;
         this.event.location = "RuaHiléiaAmazônica,250"
         this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyC_umb2xQn6m9e1OD_xI5XWZTPhgGqfwe4&q=" + this.event.location)
      },
      error:(error) => console.log(error) 
    })
  }

  sideBarIsVisible(tickets:number){
    this.ticketQt = tickets
    this.sideBarVisible = !this.sideBarVisible
  }
}