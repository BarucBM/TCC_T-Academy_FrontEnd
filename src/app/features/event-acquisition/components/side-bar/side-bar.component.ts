import { Component, Input } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../cart/services/cart-service.service';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'side-bar',
  standalone: true,
  imports: [ButtonModule, DividerModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
 @Input() ticketQt = 0
 @Input() event!:Event;

 constructor(private router:Router, private cartService:CartService, private authService:AuthService){}

  addToCart(){
    if (this.event.id != null) {
      this.cartService.addCartItem(this.authService.getUserId(),this.event.id,this.ticketQt).subscribe({
        next:(res)=>{
          this.router.navigateByUrl("/cart")
        },
        error:(e)=> console.log(e)
      })
    }
  }

  buyNow(){
    //To Do: redirecionar para a página de checkout
  }
}
