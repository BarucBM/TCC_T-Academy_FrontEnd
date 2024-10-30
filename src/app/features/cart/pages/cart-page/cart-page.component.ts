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

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CardModule, SharedModule, CommonModule, CartItemsComponent, ButtonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  cart!:Cart;
  flag:boolean = false
  load:boolean = false
  events!:Event[];

  constructor(private cartService:CartService, private authService: AuthService, private eventService:EventService, private router: Router){}

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
            this.eventService.createUserevent(res.id).subscribe({
              next:(res)=>{
                this.router.navigateByUrl("/customer-events")
              },
              error:(e)=>console.log(e)       
            })
          }
        },
        error:(e)=>{
          console.log(e);          
        }
      })
      
    }
  }

}
