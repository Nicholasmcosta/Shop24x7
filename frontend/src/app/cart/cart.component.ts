import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = this._cartService.getItems();
  total = this._cartService.getTotal();

  constructor(private _router : Router, private _cartService : CartService) { }

  ngOnInit(): void {
    console.log(this.items)
  }

  confirm(){

  }

  clear(){
    this._cartService.clearCart();
    alert('Cart cleared.');
    this._router.navigate(['/cart']).then(() => {
      window.location.reload();
    });
  }
}
