import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: any;
  product: Product = new Product();

  // GET 6 products from the database
  productList: Product[]

  constructor(private _httpClient:HttpClient, private _router:Router, private _route:ActivatedRoute, private _cartService:CartService) { 
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');

    this._httpClient.get<Product>('http://localhost:8080/products/products/'+this.id).subscribe(result => {
      this.product=result;
    }, error => {
      console.log(error);
    })

    this._httpClient.get<Product[]>('http://localhost:8080/products/products').subscribe(result => {
      this.productList = result;
      this.productList.sort(value => { return value.department == this.product.department ? -1 : 1 });
      for(let product of this.productList){
        if(product.productName == this.product.productName){
          this.productList = this.productList.filter(value => value != product);
        }
      }
    }, error => {
      console.log(error);
    })
  }

  addToCart(product : Product){
    this._cartService.addToCart(product);
    console.log(product)
    alert('Product added!');
  }

  buyNow(product : Product){
    this._cartService.clearCart();
    this._cartService.addToCart(product);
    this._router.navigate(['/checkout']);
  }
}
