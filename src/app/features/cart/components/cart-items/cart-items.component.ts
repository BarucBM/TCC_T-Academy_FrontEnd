import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../../../core/models/cart.model';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { EventService } from '../../../events/services/event.service';
import { Event } from '../../../../core/models/event.model';
import { ImageResponse } from '../../../../core/models/image.model';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [SharedModule, ButtonModule, CommonModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss'
})
export class CartItemsComponent implements OnInit {
  @Input() item!:Item;
  @Output() flag = new EventEmitter<void>();
  event!:Event;
  urlImage:string = "";
  image!:ImageResponse;
  load:boolean = false

  constructor(private eventService:EventService, private cartService:CartService, private router:Router, private authservice: AuthService){}

  ngOnInit(): void {
    this.item == null?null:
    this.eventService.getEventById(this.item.eventId).subscribe({
      next:(res)=>{
        this.event = res;
        this.load = true

        this.event.images != undefined && this.event.images.length > 0?
        this.image = this.event.images[0] as ImageResponse:null
    
        this.event.images != undefined && this.event.images.length > 0?
        this.urlImage = 'data:' + this.image.type + ';base64,' + this.image.picByte:null
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

  deleteEvent(){
    if(this.item.id != undefined){
      this.cartService.deleteCartItem(this.item.id, this.authservice.getUserId()).subscribe({
        next:(res)=>{
          this.flag.emit();
        },
        error:(e)=> console.log(e)
      })
    }
  }


}
