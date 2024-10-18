import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CardModule } from 'primeng/card';
import { ImageResponse } from '../../../../core/models/image.model';

@Component({
  selector: 'event-component',
  standalone: true,
  imports: [CommonModule, SharedModule, CardModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
  @Input() event!:Event;
  urlImage:string = "";
  image!:ImageResponse;

  ngOnInit(): void {
    this.event.images != undefined && this.event.images.length > 0?
    this.image = this.event.images[0] as ImageResponse:null

    this.event.images != undefined && this.event.images.length > 0?
    this.urlImage = 'data:' + this.image.type + ';base64,' + this.image.picByte:null

  }



}
