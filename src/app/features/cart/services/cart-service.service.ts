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

  getCustomerCart(customerID:string):Observable<Cart>{ 
    return this.http.get<Cart>(this.url+"/customer/"+customerID)
  }

  addCartItem(customerID:string, eventID:string, quantity:number):Observable<Item>{
    
    this.item.eventId = eventID;
    this.item.quantity = quantity;
    return this.http.put<Item>(this.url+"/item/"+customerID, this.item)
  }

  deleteCartItem(itemId:number, userId:string):Observable<string>{
    console.log(this.url+"/item/"+itemId+"?customerId=ed8e3635-9889-4814-85e1-c0e4a01a60b8" )
    return this.http.delete<string>(this.url+"/item/"+itemId+"?customerId=ed8e3635-9889-4814-85e1-c0e4a01a60b8" )
  }
}
