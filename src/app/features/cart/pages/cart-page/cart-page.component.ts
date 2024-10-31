import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service.service';
import { Cart } from '../../../../core/models/cart.model';
import { CartItemsComponent } from '../../components/cart-items/cart-items.component';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { EventService } from '../../../events/services/event.service';
import { Router } from '@angular/router';
import { CalendarService } from '../../../../core/services/calendar.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CardModule, SharedModule, CommonModule, CartItemsComponent, ButtonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  cart!:Cart;
  flag:boolean = false;
  load:boolean = false;
  calendarId:string = '';
  events!:Event[];

  constructor(private calendarService: CalendarService, private cartService:CartService, private authService: AuthService, private eventService:EventService, private router: Router){}

  ngOnInit(): void {
    this.cartService.getCustomerCart(this.authService.getUserId()).subscribe({
      next:(response)=>{
        this.cart = response;
        if (this.cart.cartEvents.length > 0){
          this.flag = true
        }else{
          this.flag = false
        }
        this.load = true
      },
      error:(e)=>{
        console.log(e)
      }
    })
    
  }

  reloadPage(){
    this.ngOnInit();
  }

  buyAll(){
    const accessToken = localStorage.getItem('access_token');
    for (let i = 0; i < this.cart.cartEvents.length; i++) {
      this.eventService.getEventById(this.cart.cartEvents[i].eventId).subscribe({
        next:(res)=>{
          if(this.cart.cartEvents[i].id != undefined){
            this.cartService.deleteCartItem(this.cart.cartEvents[i].id, this.authService.getUserId()).subscribe({
              next:(res)=>{
                this.reloadPage();
              },
              error:(e)=> console.log(e)
            })
          }
          if (res.id != undefined) {
            this.calendarService.getCalendarId().subscribe({
              next: (calendarId) => {
                this.calendarId = calendarId;
                console.log(calendarId);
          
                // Verifica se `res.id` é uma string antes de passar para `createUserevent`
                if (typeof res.id === 'string') {
                  this.eventService.createUserevent(res.id, this.calendarId).subscribe({
                    next: () => {
                      this.router.navigateByUrl("/customer-events");
                    },
                    error: (e) => console.log(e),
                  });
                } else {
                  console.error("res.id is undefined or not a string");
                }
              },
              error: (err) => {
                console.error('Failed to fetch calendar ID:', err);
              },
            });
          }
        },
        error:(e)=>{
          console.log(e);          
        }
      })
      
    }
  }

}
