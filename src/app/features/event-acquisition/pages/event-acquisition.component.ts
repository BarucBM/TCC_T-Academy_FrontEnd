import { Component, OnInit } from '@angular/core';
import { Event } from '../../../core/models/event.model';
import { DomSanitizer } from '@angular/platform-browser';
import { TicketSelectionComponent } from '../components/ticket-selection/ticket-selection.component';
import { SidebarModule } from 'primeng/sidebar';
import { SideBarComponent } from "../components/side-bar/side-bar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherCardComponent } from "../../../shared/components/weather-card/weather-card.component";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/modules/shared.module';
import { CardModule } from 'primeng/card';
import { EventService } from '../../events/services/event.service';
import { ImageResponse } from '../../../core/models/image.model';
import { WeatherCardEventComponent } from "../../events/components/weather-card-event/weather-card-event.component";



@Component({
  selector: 'app-event-acquisition',
  standalone: true,
  imports: [TicketSelectionComponent, SidebarModule, SideBarComponent, WeatherCardComponent, CommonModule, SharedModule, CardModule, WeatherCardEventComponent],
  templateUrl: './event-acquisition.component.html',
  styleUrl: './event-acquisition.component.scss'
})
export class EventAcquisitionComponent implements OnInit {
  event!:Event;
  sideBarVisible :boolean = false
  ticketQt:number = 0
  private id:string | null = null;
  url:any = "";

  urlImage:string = "";
  image!:ImageResponse;
  

  constructor(private eventService:EventService, private sanitizer:DomSanitizer, private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id != null){
      this.getEventById(this.id)
    } 
  }

  getEventById(id:string){
    this.eventService.getEventById(id).subscribe({
      next:(res) => {
         this.event = res;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyC_umb2xQn6m9e1OD_xI5XWZTPhgGqfwe4&q=" + this.event.address.fullAddress)
        this.event.images != undefined && this.event.images.length > 0?
        this.image = this.event.images[0] as ImageResponse:null
    
        this.event.images != undefined && this.event.images.length > 0?
        this.urlImage = 'data:' + this.image.type + ';base64,' + this.image.picByte:null
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
