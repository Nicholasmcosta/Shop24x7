import { HostListener, Injectable, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items : Product[] = [];

  constructor() {
    if (sessionStorage.getItem('cart') !== null){
      console.log("cart found in sessionStorage")
      this.items = <Product []> JSON.parse(sessionStorage.getItem('cart'));

    } else {
      console.log("no cart found in sessionStorage. Making a new one...")
    }
  }

  addToCart(product : Product){
    this.items.push(product)
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }

  getItems() {
    return this.items;
  }

  clearCart(){
    this.items = [];
    sessionStorage.removeItem('cart')
    return this.items;
    
  }

  getTotal() {
    return this.items.reduce((acc, curr) => acc + +curr.price, 0)
  }

  placeOrder() {

  }

}
