import { Component, OnInit } from '@angular/core';
import { Event } from '../../../core/models/event.model';
import { DomSanitizer } from '@angular/platform-browser';
import { TicketSelectionComponent } from '../components/ticket-selection/ticket-selection.component';
import { EventService } from '../../../core/services/event.service';
import { SidebarModule } from 'primeng/sidebar';
import { SideBarComponent } from "../components/side-bar/side-bar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherCardComponent } from "../../../shared/components/weather-card/weather-card.component";



@Component({
  selector: 'app-event-acquisition',
  standalone: true,
  imports: [TicketSelectionComponent, SidebarModule, SideBarComponent, WeatherCardComponent],
  templateUrl: './event-acquisition.component.html',
  styleUrl: './event-acquisition.component.scss'
})
export class EventAcquisitionComponent implements OnInit {
  event!:Event;
  sideBarVisible :boolean = false
  ticketQt:number = 0
  private id:string | null = null;
  url:any = "";
  

  constructor(private eventService:EventService, private sanitizer:DomSanitizer, private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id != null){
      this.getEventById(this.id)
    }else{
      this.router.navigateByUrl("/home")
    }
 
  }

  getEventById(id:string){
    this.eventService.getEventById(id).subscribe({
      next:(res) => {
         this.event = res;
         this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyC_umb2xQn6m9e1OD_xI5XWZTPhgGqfwe4&q=" + this.event.location)
      },
      error:(error) => {
        console.log(error) 
        this.router.navigateByUrl("/notfound")
      }
    })
  }

  sideBarIsVisible(tickets:number){
    this.ticketQt = tickets
    this.sideBarVisible = !this.sideBarVisible
  } 
}