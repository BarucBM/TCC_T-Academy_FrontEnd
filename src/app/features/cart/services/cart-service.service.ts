import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, Item } from '../../../core/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url: string = 'http://localhost:8080/cart';
  item:Item = {
    eventId:"",

    quantity:0
  };

  constructor(private http: HttpClient) { }

  getCustomerCart(customerID:number):Observable<Cart>{ 
    return this.http.get<Cart>(this.url+"/customer/"+customerID)
  }

  addCartItem(customerID:number, eventID:string, quantity:number){
    
    this.item.eventId = eventID;
    this.item.quantity = quantity;

    this.http.put<Item>(this.url+"/item/"+customerID, this.item)
  }
}
