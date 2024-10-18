import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service.service';
import { Cart } from '../../../../core/models/cart.model';
import { CartItemsComponent } from '../../components/cart-items/cart-items.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CardModule, SharedModule, CommonModule, CartItemsComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  cart!:Cart;
  flag:boolean = false
  load:boolean = false

  constructor(private cartService:CartService){}

  ngOnInit(): void {
    this.cartService.getCustomerCart("74dd6599-97a5-44d0-96b1-4a9eacbcdda8").subscribe({
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

}
