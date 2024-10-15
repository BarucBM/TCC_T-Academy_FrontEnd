import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CardModule, SharedModule, CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  events!:Event[];

  ngOnInit(): void {
    
  }

}
