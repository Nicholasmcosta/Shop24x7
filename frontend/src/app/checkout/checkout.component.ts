import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderModel } from '../models/order';
import { Product } from '../models/product';
import { User } from '../models/user';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  id:any;
  user :User = new User();
  checkoutForm: FormGroup;

  items = this._cartService.getItems();
  total = this._cartService.getTotal();

  constructor(private _cartService : CartService, private _formBuilder:FormBuilder, private _httpClient:HttpClient, private _userService: UserService, private _router : Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('isLoggedIn') === 'true'){
          this.id = localStorage.getItem('id');
          console.log(this.id);

          this._userService.getUserById(this.id).subscribe(result=>{

          this.user=result;
        },error=>{
          console.log(error);
        })
      } else {
        alert('Please log in.');
        this._router.navigate(['/login']);
      }

      this.checkoutForm = this._formBuilder.group({
        streetAddress:['', [Validators.required]],
        city:['', [Validators.required]],
        state:['', [Validators.required]],
        zipCode:['', [Validators.required, Validators.pattern('^\\d*$')]],
      });

    }

    get f(){
      return this.checkoutForm.controls;
    }

    checkout(){
      
      let address = this.checkoutForm.get('streetAddress').value +", "+
                    this.checkoutForm.get('city').value + ", "+
                    this.checkoutForm.get('state').value + ", "+
                    this.checkoutForm.get('zipCode').value

      this.user.address = address;

      this._userService.updateUser(this.id, this.user).subscribe(result=>{
        console.log(result)
      }, error=>{
        console.log(error)
      })

      let order = new OrderModel();
        order.userId = this.id;
        order.userEmail = this.user.username as string;
        let stringifiedCart = [];
        this.items.forEach((item) => {
          stringifiedCart.push(item.productName);
      });

        order.items = stringifiedCart;
        order.total = this.total;

      sessionStorage.removeItem('cart');
      this._cartService.clearCart();
      
      this._httpClient.post('http://localhost:8080/orders',order).subscribe(result=>{  
          alert(result['message']);
          this._router.navigate(['/orders']);
        },(err)=>{console.log(err) })

    }

    prettifyItem(item : Product) : string{

      let pretty = "Product Name: " + item.productName + " | " +
                    "Product Price: " + item.price
                    
      return pretty;
    }
  }
