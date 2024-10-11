import { Component, Input } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

 constructor(private router:Router){}

  addToCart(){
    //To Do: enviar info do evento para o carrinho
  }

  buyNow(){
    //To Do: redirecionar para a página de checkout
  }
}
