import { Component } from '@angular/core';
import { Event } from '../../../../core/models/event.model';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  tickets:Event[] = []
}
